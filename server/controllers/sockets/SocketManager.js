const Ollama = require("ollama-node");
const IslandTemplate = require("../../IslandTemplateServer");
const WorldActionLog = require("../WorldActionLog");

class SocketManager {
  constructor(io) {
    this.io = io;
    this.onlineUsers = new Map();
    this.isAIConnected = false;
    this.isAIProcessing = false;
    this.ollama = new Ollama.Ollama();
    this.lastSentToCharacter = -1;
    this.promptCount = 0;
    this.wActionLog = new WorldActionLog();
    this.overallNarrative = {
      intro: [
        "Ellie should Go to the bait shop to get some crab traps!",
        "Ellie's Dad's Death was not an accident",
        "tourists have gone missing",
        "town is dangerous get out now",
        "warning of the mysterious cult on the island without using the word cult.",
        "shady families control the island",
      ],
      action: [],
      climax: [],
    };
  }

  init() {
    this.setupOllama();
    this.io.on("connection", (socket) => {
      this.handleConnection(socket);
    });
  }

  setupOllama() {
    this.ollama.setModel("llama3");
    this.ollama.setSystemPrompt(
      "#Your task is to roleplay as the supplied NPC character, " +
        "character attributes will be supplied as JSON object with this structure {firstName, lastName, ageGender, descr, job, goal, CharacterPersonality}. " +
        "IT IS VERY IMPORTANT that you only speak as the character you are assigned until told to change. Limit all responses to 3 sentances.#"
    );
  }

  handleConnection(socket) {
    socket.on("connect-user", (userID) => this.addUser(userID, socket.id));
    socket.on("load-world", (WorldData) => this.loadWorld(socket, WorldData));
    socket.on("save-game-state", (WorldData) =>
      this.saveGameState(socket, WorldData)
    );
    socket.on("start-conversation", (data) =>
      this.startConversation(socket, data)
    );
    socket.on("send-msg", (data) => this.sendMessage(socket, data));
    socket.on("world-log-action", (data) =>
      this.saveWorldLogAction(socket, data)
    );
    socket.on("disconnect-user", () => this.removeUser(userID, socket.id));
  }
  broadcastMsg(sockets, SocketEvent, msgParams, doBroadcast) {
    if (doBroadcast) {
      sockets[0].to(sockets[2]).emit(SocketEvent, msgParams);
      sockets[1].to(sockets[3]).emit(SocketEvent, msgParams);
    }
  }

  addUser(userId, socketID) {
    this.onlineUsers.set(userId, socketID);
  }

  removeUser(userId, socketID) {
    this.onlineUsers.delete(userId);
  }

  async saveGameState(socket, WorldData) {
    console.log("Save Game State", WorldData);
    return this.storeGameState(WorldData["saveID"], WorldData.saveData);
  }

  async loadWorld(socket) {
    const newPrompt = this.ollama.streamingGenerate(
      "#Buildings: " + JSON.stringify(IslandTemplate.Buildings),
      null,
      null,
      (msg) => {
        console.log(msg);
      }
    );
    const newPrompt2 = this.ollama.streamingGenerate(
      "#Characters: " + JSON.stringify(IslandTemplate.Residents),
      null,
      null,
      (msg) => {
        console.log(msg);
      }
    );
    return [newPrompt, newPrompt2];
  }

  async startConversation(socket, data) {
    console.log(data);
    const sendUserSocket = this.onlineUsers.get(data.NPC);
    const fromUserSocket = this.onlineUsers.get(data.Player);
    const socketList = [socket, this.io, sendUserSocket, fromUserSocket];

    const newPrompt = await this.promptAI(data, socketList, false);
    return newPrompt;
  }

  sendMessage = async (socket, data) => {
    console.log(data);
    data = data[0];
    const sendUserSocket = this.onlineUsers.get(data.to);
    const fromUserSocket = this.onlineUsers.get(data.from);
    const socketList = [socket, this.io, sendUserSocket, fromUserSocket];

    if (sendUserSocket) {
      console.log(
        "sendUseSocket msg-recieve conditional - if send to user is online"
      );
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }

    // save persistent store msg sent by user
    const newMsg = await this.storeMessage(data.msg, data.to, data.from, true);

    // if AI requested
    if (data.llmodel !== 0) {
      const newPrompt = await this.promptAI(data, socketList, true);
      return newPrompt;
    }
  };

  saveWorldLogAction = async (socket, data) => {
    console.log(data);
    data = data[0];
    const sendUserSocket = this.onlineUsers.get(data.to);
    const fromUserSocket = this.onlineUsers.get(data.from);
    const socketList = [socket, this.io, sendUserSocket, fromUserSocket];

    if (sendUserSocket) {
      console.log(
        "sendUseSocket msg-recieve conditional - if send to user is online"
      );
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }

    // save persistent store msg sent by user
    const newMsg = await this.storeMessage(data.msg, data.to, data.from, true);

    // if AI requested
    if (data.llmodel !== 0) {
      return await this.promptAI(data, socketList, true);
    }
  };

  async promptAI(data, socketList, doBroadcast = true) {
    let dataPrefix = [];
    if (this.lastSentToCharacter !== data.to) {
      this.lastSentToCharacter = data.to;
      this.promptCount = 0;
    }
    if (this.promptCount <= 0) {
      dataPrefix = this.getPresentCharactersData([data.to, data.from]);
    }

    this.promptCount++;
    this.broadcastMsg(socketList, "msg-start-ai", data.msg, doBroadcast);
    this.isAIProcessing = true;

    let sendMsg = this.buildAIPromptTXT(data, dataPrefix);

    console.log("Send AI Prompt: " + sendMsg);

    const streamResponseFull = (response) => {
      const resp = JSON.parse(response);
      this.broadcastMsg(
        socketList,
        "msg-recieve-ai-part",
        { sender: data.to, text: resp },
        doBroadcast
      );
      this.isAIProcessing = false;
    };

    return this.ollama.streamingGenerate(
      sendMsg,
      null,
      null,
      streamResponseFull
    );
  }

  GetCharacterData(id) {
    return IslandTemplate.Residents[parseInt(id)];
  }

  GetCharacterDataSummary(id) {
    return IslandTemplate.summarizeResident(this.GetCharacterData(id));
  }

  getPresentCharactersData(NPCIDs) {
    return [
      this.GetCharacterDataSummary(NPCIDs[0]),
      this.GetCharacterDataSummary(parseInt(NPCIDs[1] - 1)),
    ];
  }

  async storeMessage(msg, to, from, selfSent) {
    const Messages = require("../../models/messageModel");
    return await Messages.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });
  }

  async storeGameState(saveGameID, gameState) {
    const gameSave = require("../../models/gameSaveStateModel");
    let save = await gameSave.findOne({ saveGameID });
    if (!save) {
      gameState["player"]['inventory'] = JSON.stringify(gameState["player"]['inventory']);
      // if saveGameID does not exist, create new one
      await gameSave.create(gameState);
    } else {
      // else, update existing saveGame
      await gameSave.updateOne(gameState);
    }
  }

  buildCharacterPromptTXT(data) {
    let sendMsg = " Use the following character data: ";
    sendMsg += JSON.stringify(data);
    return sendMsg;
  }

  buildPlotPromptTXT(data) {
    let sendMsg =
      " Subtly include: " +
      this.overallNarrative.intro[
        Math.floor(this.overallNarrative.intro.length * Math.random())
      ] +
      ". ";
    return sendMsg;
  }

  buildSettingPromptTXT(data) {
    return " Setting for the conversation is " + data.timeOfDay + ".";
  }

  // search (fuzzy) msg for location mention, return location object details
  determineMsgMentionLocation(msg) {
    const i = IslandTemplate.Buildings.find((b) => msg.includes(b.name));
    if (msg.includes("bait shop")) {
    }
    return sendMsg;
  }

  buildAIPromptTXT(data, dataPrefix, userData) {
    userData = userData || this.GetCharacterData(data.from);
    let sendMsg =
      "# Respond as the character " + this.GetCharacterData(data.to).name;
    +".";
    let that = this;
    const firstMsgInConvoPrompt = (d1, d2) => {
      sendMsg += that.buildCharacterPromptTXT(d2);
      sendMsg += that.buildSettingPromptTXT(d1);
      sendMsg += that.buildPlotPromptTXT(d1);
    };

    // data prefix not set unless first message in conversation
    if (dataPrefix.length > 0) {
      firstMsgInConvoPrompt(data, dataPrefix);
    }
    //sendMsg += "Limit response around 2-3 sentences.# ";
    sendMsg +=
      " In 3 sentences or less respond to the following from " + data.msg;

    return sendMsg;
  }
}

module.exports = SocketManager;
