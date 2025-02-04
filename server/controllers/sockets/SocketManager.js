const Ollama = require("ollama-node");
const IslandTemplate = require("../../IslandTemplateServer");
const WorldActionLogClass = require("../worldActionLog");
const ConversationManager = require('../ConversationManager');

class SocketManager {
  constructor(io) {
    this.io = io;
    this.onlineUsers = new Map();
    this.isAIConnected = false;
    this.isAIProcessing = false;
    this.ollama = new Ollama.Ollama();
    this.lastSentToCharacter = -1;
    this.promptCount = 0;
    this.WorldActionLog = new WorldActionLogClass();
    this.overallNarrative = {
      intro: [
        "Ellie should Go to the bait shop to get some crab traps!",
        "Ellie's Dad's Death was not an accident",
        "tourists have gone missing",
        "town is dangerous get out now",
        "warning of the mysterious cult on the island without using the word cult.",
        "shady families control the island",
      ],
      action: ["As soon as you start repairs on your ship, your closest friend is kidnapped by the cult's leader.",
         "Ellie must navigate the cult's influence on the island's fishing industry in order to get her ship out to sea.",
        "Ellie needs to work as a hired fisherman on other boats to get experience for her fisherman's license as a captain.",
      "Ellie must find her kidnapped friend and save her from the cult sacrifice."],
      climax: [],
    };
    this.conversationManager = new ConversationManager();
  }

  init() {
    this.setupOllama();
    this.io.on("connection", (socket) => {
      console.log("User connected: ", socket.id);
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
    socket.on("connect-user", (userID) =>
      this.addOnlineUser(userID, socket.id)
    );
    socket.on("disconnect-user", () =>
      this.removeOnlineUser(userID, socket.id)
    );

    socket.on("load-world", (WorldData) => this.loadWorld(socket, WorldData));
    socket.on("save-game-state", (WorldData) =>
      this.saveGameState(socket, WorldData)
    );
    socket.on("load-game-state", async (saveID) => {
      var d = await this.loadGameState(socket, saveID);
      socket.emit("load-game-state-data", d);
    });

    socket.on("start-conversation", (data) =>
      this.startConversation(socket, data)
    );
    socket.on("end-conversation", (data) =>
      this.endConversation(data)
    );
    socket.on("send-msg", (data) => this.sendMessage(socket, data));
    socket.on("world-log-action", (data) =>
      this.saveWorldLogAction(socket, data)
    );
  }
  broadcastMsg(sockets, SocketEvent, msgParams, doBroadcast) {
    if (doBroadcast) {
      sockets[0].to(sockets[2]).emit(SocketEvent, msgParams);
      sockets[1].to(sockets[3]).emit(SocketEvent, msgParams);
    }
  }

  /**
   * Socket Event Handlers
   */
  addOnlineUser(userId, socketID) {
    this.onlineUsers.set(userId, socketID);
  }

  removeOnlineUser(userId, socketID) {
    this.onlineUsers.delete(userId);
  }

  async saveGameState(socket, WorldData) {
    console.log("Save Game State", WorldData);
    return this.storeGameState(WorldData["saveID"], WorldData.saveData);
  }

  async loadGameState(socket, GameStateID) {
    console.log("Load Game State", GameStateID);
    return await this.readGameState(GameStateID);
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
    data.to = data.NPC;
    data.from = data.Player;
    data.msg = "Hey there!";

    const conversationId = this.conversationManager.addConversation(
      { 
        island_id: "66dc506deaae235d2dbe4a3a",
        participants: [data.NPC, data.Player], 
        messages: [] 
      },
      [data.NPC, data.Player]
    );

    // send msg to make npc initiate conversation
    const newPrompt = await this.promptAI(data, socketList, true);
    return newPrompt;
  }

  async endConversation(data) {
    console.log(data);
    data.to = data.Player;
    data.from = data.NPC;

    // Update the conversation with the summary or any final data
    const summaryConvoTmp = await this.summarizeConversation(data);
    // todo: store summaryConvoTmp in persistent store
    console.log("Summary Conversation:", summaryConvoTmp);
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

    // Add message to the current conversation
    const currentConversation = this.conversationManager.getCurrentConversation([data.to, data.from]);
    if (currentConversation) {
      this.conversationManager.addMessageToConversation(currentConversation.id, {
        sender: data.from,
        content: data.msg,
        timestamp: new Date()
      });
    }
    // if AI requested
    if (data.llmodel !== 0) {
      const newPrompt = await this.promptAI(data, socketList, true);
      return newPrompt;
    }
  };

  saveWorldLogAction = async (socket, data) => {
    console.log("actionLog:" + JSON.stringify(data));
    // save persistent store action log item
    const gameActionLogItem = await this.storeGameActionLog(data);
    this.WorldActionLog.addAction(data);
  };

  /**
   * end Socket Event Handlers
   */

  /*
   * Read And Write Functions to DB
   */
  // save message to db by to, from, and selfSent boolean
  async storeMessage(msg, to, from, selfSent) {
    const Messages = require("../../models/messageModel");
    return await Messages.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });
  }

  // save game state to db by saveGameID, gameState is JSON string
  async storeGameActionLog(gameAction) {
    const gameActionLog = require("../../models/WorldActionLogModel");
    let saveRow = await gameActionLog.create(gameAction);
  }

  // save game state to db by saveGameID, gameState is JSON string
  async storeGameState(saveGameID, gameState) {
    const gameSave = require("../../models/gameSaveStateModel");
    let save = await gameSave.findOne({ saveGameID });
    if (!save) {
      //gameState["player"]['inventory'] = JSON.stringify(gameState["player"]['inventory']);
      // if saveGameID does not exist, create new one
      await gameSave.create(gameState);
    } else {
      // else, update existing saveGame
      await gameSave.updateOne(gameState);
    }
  }

  // load game state from db by saveGameID, return JSON string
  async readGameState(saveGameID) {
    saveGameID = saveGameID || "save1";
    const gameSave = require("../../models/gameSaveStateModel");
    let read = await gameSave.findOne({ saveGameID });
    console.log("Read Game State: ", JSON.stringify(read));
    if (read) {
      return JSON.stringify(read);
    } else {
      return null;
    }
  }
  /*
   * END of Read And Write Functions to DB
   *
   */

  /*
   * AI Prompt Builder
   */

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
  async promptAI(data, socketList, doBroadcast = true) {
    const dataPrefix = this.getDataPrefix(data);
    this.updatePromptCount(data.to);
    this.broadcastStartAI(socketList, data.msg, doBroadcast);
 
    const sendMsg = this.buildAIPromptTXT(data, dataPrefix);
    console.log("Send AI Prompt: " + sendMsg);
 
    return this.streamAIResponse(sendMsg, socketList, data.to, doBroadcast);
  }

 getDataPrefix(data) {
  if (this.lastSentToCharacter !== data.to) {
    this.lastSentToCharacter = data.to;
    this.promptCount = 0;
  }
  return this.promptCount <= 0 ? this.getPresentCharactersData([data.to, data.from]) : [];
}

updatePromptCount(to) {
  if (this.lastSentToCharacter !== to) {
    this.promptCount = 0;
  }
  this.promptCount++;
}

broadcastStartAI(socketList, msg, doBroadcast) {
  this.broadcastMsg(socketList, "msg-start-ai", msg, doBroadcast);
  this.isAIProcessing = true;
}

  streamAIResponse(sendMsg, socketList, to, doBroadcast) {
    const streamResponseFull = (response) => {
      const resp = JSON.parse(response);
      this.broadcastMsg(
        socketList,
        "msg-recieve-ai-part",
        { sender: to, text: resp },
        doBroadcast
      );
      this.isAIProcessing = false;

      // Add AI response to the current conversation
      this.addAIResponseToConversation(to, resp.content);
    };

    return this.ollama.streamingGenerate(sendMsg, null, null, streamResponseFull);
  }


  async summarizeConversation(conversationData) {

    /*
  Consider the following when determining the relationshipEffect:
  - The sentiment of the NPC's responses
  - The mood the NPC is in
  - The relationship with the player at the start of the conversation
  - Any potentially offensive or upsetting comments from the player
  - Any actions or words from the player that might make the NPC happy or feel special
   */

    const prompt = `
  #Analyze the following conversation and provide a summary in JSON format:
  
  ${JSON.stringify(conversationData)}
  
  Please provide a JSON object with the following structure:
  
      {
        "overallTopic": "Brief description of the main topic",
        "keywords": ["List of important keywords from the conversation"],
        "charactersMentioned": ["List of characters mentioned in the conversation"],
        "conversationSummary": "A concise summary of the conversation",
        "playerDetailsList": ["list of details mentioned about Ellie, the player"],
        "npcDetailsList": ["list of details revealed by the NPC"],
        "relationshipEffect": "number between -100 and 100 representing the effect on the NPC's relationship or friendship with the player",
      }

  Provide your response as a valid JSON object, do not include your reasoning or anything ther than the json object.
  `;

  let fullResponse = "";
  
    await this.ollama.streamingGenerate(
      prompt,
      null,
      null,
      (msg) => {
        msg = JSON.parse(msg);
        //console.log("Streaming response: ", msg, " ", fullResponse);
        fullResponse += msg.response;
        if(msg.done){
          //fullResponse += "}";
          console.log("Final Response: " + fullResponse);
          try {
            const parsedResponse = JSON.parse(fullResponse);
            console.log("Parsed JSON response:", parsedResponse);
            return parsedResponse;
          } catch (error) {
            console.log(fullResponse);
            console.error("Error parsing JSON response:", error);
            return null;
          }
        }
      }
    );
  }

  // New helper function to add AI response to the conversation
  addAIResponseToConversation(to, content) {
    const currentConversation = this.conversationManager.getCurrentConversation([to]);
    if (currentConversation) {
      this.conversationManager.addMessageToConversation(currentConversation.id, {
        sender: to,
        content: content,
        timestamp: new Date()
      });
    }
  }

  /* Prompt string building functions
   *   START of buildPromptTXT functions
   */
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
  /* END Prompt string building functions */
}

module.exports = SocketManager;
