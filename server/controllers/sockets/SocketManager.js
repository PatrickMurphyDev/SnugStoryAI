// ============================================================================
// Module Imports
// ============================================================================
const Ollama = require("ollama-node");
const IslandTemplate = require("../../IslandTemplateServer");
const WorldActionLogClass = require("../worldActionLog");
const ConversationManager = require('../ConversationManager');

// ============================================================================
// SocketManager Class
// ============================================================================

class SocketManager {
  /**
   * Constructor to initialize the SocketManager instance.
   * @param {object} io - The socket.io server instance.
   */
  constructor(io) {
    // Socket.io instance
    this.io = io;
    // Map to keep track of online users (userID => socketID)
    this.onlineUsers = new Map();
    this.isAIConnected = false;
    this.isAIProcessing = false;
    // Initialize the Ollama AI client
    this.ollama = new Ollama.Ollama();
    // Keep track of which character last received a prompt and how many prompts have been sent
    this.lastSentToCharacter = -1;
    this.promptCount = 0;
    // Action logger for world events
    this.WorldActionLog = new WorldActionLogClass();

    // Overall narrative details for dynamic storytelling
    this.overallNarrative = {
      intro: [
        "Ellie should Go to the bait shop to get some crab traps!",
        "Ellie's Dad's Death was not an accident",
        "tourists have gone missing",
        "town is dangerous get out now",
        "warning of the mysterious cult on the island without using the word cult.",
        "shady families control the island",
      ],
      action: [
        "As soon as you start repairs on your ship, your closest friend is kidnapped by the cult's leader.",
        "Ellie must navigate the cult's influence on the island's fishing industry in order to get her ship out to sea.",
        "Ellie needs to work as a hired fisherman on other boats to get experience for her fisherman's license as a captain.",
        "Ellie must find her kidnapped friend and save her from the cult sacrifice."
      ],
      climax: [],
    };

    // Manager for tracking conversation state and history
    this.conversationManager = new ConversationManager();
  }

  // ========================================================================
  // Initialization & Connection Handling
  // ========================================================================

  /**
   * Initialize the SocketManager by setting up the AI model and socket events.
   */
  init() {
    this.setupOllama();
    this.io.on("connection", (socket) => {
      console.log("User connected: ", socket.id);
      this.handleConnection(socket);
    });
  }

  /**
   * Set up the Ollama AI model and system prompt for NPC roleplay.
   */
  setupOllama() {
    this.ollama.setModel("llama3");
    this.ollama.setSystemPrompt(
      "#Your task is to roleplay as the supplied NPC character, " +
      "character attributes will be supplied as JSON object with this structure {firstName, lastName, ageGender, descr, job, goal, CharacterPersonality}. " +
      "IT IS VERY IMPORTANT that you only speak as the character you are assigned until told to change. Limit all responses to 3 sentances.#"
    );
  }

  /**
   * Setup all socket event handlers for a new connection.
   * @param {object} socket - The connected socket.
   */
  handleConnection(socket) {
    // User connection and disconnection events
    socket.on("connect-user", (userID) =>
      this.addOnlineUser(userID, socket.id)
    );
    socket.on("disconnect", () => {
      this.removeOnlineUser(socket.id);
    });
    socket.on("disconnect-user", () =>
      this.removeOnlineUser(socket.id)
    );

    // World state events (loading world, saving/loading game state)
    socket.on("load-world", (WorldData) => this.loadWorld(socket, WorldData));
    socket.on("save-game-state", (WorldData) =>
      this.saveGameState(socket, WorldData)
    );
    socket.on("load-game-state", async (saveID) => {
      const data = await this.loadGameState(socket, saveID);
      socket.emit("load-game-state-data", data);
    });

    // Conversation events (starting, ending, messaging)
    socket.on("start-conversation", (data) =>
      this.startConversation(socket, data)
    );
    socket.on("end-conversation", (data) =>
      this.endConversation(socket, data)
    );
    socket.on("send-msg", (data) => this.sendMessage(socket, data));

    // World log action events
    socket.on("world-log-action", (data) =>
      this.saveWorldLogAction(socket, data)
    );
  }

  /**
   * Utility method to broadcast messages to clients.
   * @param {Array} sockets - Array containing [socket, io, recipientSocketId, senderSocketId].
   * @param {string} SocketEvent - The event name.
   * @param {any} msgParams - The data to send.
   * @param {boolean} doBroadcast - Whether to perform the broadcast.
   */
  broadcastMsg(sockets, SocketEvent, msgParams, doBroadcast) {
    if (doBroadcast) {
      sockets[0].to(sockets[2]).emit(SocketEvent, msgParams);
      sockets[1].to(sockets[3]).emit(SocketEvent, msgParams);
    }
  }

  // ========================================================================
  // Socket Event Handlers
  // ========================================================================

  /**
   * Add a user to the online users map.
   * @param {string} userId - The user's ID.
   * @param {string} socketID - The socket ID associated with the user.
   */
  addOnlineUser(userId, socketID) {
    this.onlineUsers.set(userId, socketID);
  }

  /**
   * Remove a user from the online users map.
   * @param {string} userId - The user's ID.
   */
  removeOnlineUser(userId) {
    this.onlineUsers.delete(userId);
  }

  /**
   * Save the current game state to the database.
   * @param {object} socket - The socket instance.
   * @param {object} WorldData - The game state data.
   */
  async saveGameState(socket, WorldData) {
    console.log("Save Game State", WorldData);
    return this.storeGameState(WorldData["saveID"], WorldData.saveData);
  }

  /**
   * Load a saved game state from the database.
   * @param {object} socket - The socket instance.
   * @param {string} GameStateID - The identifier for the game state.
   */
  async loadGameState(socket, GameStateID) {
    console.log("Load Game State", GameStateID);
    return await this.readGameState(GameStateID);
  }

  /**
   * Load world data by generating AI prompts for buildings and characters.
   * @param {object} socket - The socket instance.
   */
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

  /**
   * Start a conversation between a player and an NPC.
   * @param {object} socket - The socket instance.
   * @param {object} data - Contains participant IDs and initial message details.
   */
  async startConversation(socket, data) {
    console.log("SocketManager:: End conversation");
    console.log(data);
    // Retrieve socket IDs for both NPC and Player
    const sendUserSocket = this.onlineUsers.get(data.NPC);
    const fromUserSocket = this.onlineUsers.get(data.Player);
    const socketList = [socket, this.io, sendUserSocket, fromUserSocket];

    // Set conversation message metadata
    data.to = data.NPC;
    data.from = data.Player;
    data.msg = "Hey there!";

    // Create a new conversation in the conversation manager
    const conversationId = this.conversationManager.addConversation(
      { 
        island_id: "66dc506deaae235d2dbe4a3a",
        participants: [data.NPC, data.Player], 
        messages: [] 
      },
      [data.NPC, data.Player]
    );

    // Invoke the AI to start the NPC's conversation response
    const newPrompt = await this.promptAI(data, socketList, true);
    return newPrompt;
  }

  /**
   * End the current conversation by generating a summary using AI.
   * @param {object} socket - The socket instance.
   * @param {object} data - Contains conversation details.
   */
  async endConversation(socket, data) {
    console.log("SocketManager:: End conversation");
    const currentConversation = await this.conversationManager.getCurrentConversation();
    if (currentConversation._id) {
      console.log("End Conversation w/ ID " + currentConversation._id);
      currentConversation.end_time = Date.now();
      currentConversation.save();
      console.log(data);
      
      const handleConvoSummarized = (summary)=>{
        console.log("Conversation Summary:");
        console.log(summary);
        currentConversation.topic = summary.overallTopic;
        currentConversation.keywords = summary.keywords;
        currentConversation.characterMentioned = summary.characterMentioned;
        currentConversation.summary = summary.conversationSummary;
        currentConversation.relationshipEffect = summary.relationshipEffect;
        currentConversation.playerDetailsList = summary.playerDetailsList;
        currentConversation.npcDetailsList = summary.npcDetailsList;
        currentConversation.save();

        // TODO: Persist the summary to the conversation record if required
      };

      // Generate conversation summary via AI
      const summaryConvoTmp = await this.summarizeConversation(data, handleConvoSummarized);
    }
  }

  /**
   * Handle sending a message from one user to another.
   * @param {object} socket - The socket instance.
   * @param {Array|object} data - Message data (if wrapped in an array, take the first element).
   */
  sendMessage = async (socket, data) => {
    console.log(data);
    // If data is an array, extract the first element
    data = data[0];
    const sendUserSocket = this.onlineUsers.get(data.to);
    const fromUserSocket = this.onlineUsers.get(data.from);
    const socketList = [socket, this.io, sendUserSocket, fromUserSocket];

    // If the recipient is online, deliver the message via socket.io
    if (sendUserSocket) {
      console.log("Recipient is online, sending message");
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }

    // Save the message to persistent storage (database)
    const newMsg = await this.storeMessage(data.msg, data.to, data.from, true);

    // Add the message to the current conversation history
    const currentConversation = this.conversationManager.getCurrentConversation([data.to, data.from]);
    if (currentConversation) {
      this.conversationManager.addMessageToConversation(currentConversation.id, {
        sender: data.from,
        content: data.msg,
        timestamp: new Date()
      });
    }

    // If an AI response is requested, invoke the promptAI method
    if (data.llmodel !== 0) {
      const newPrompt = await this.promptAI(data, socketList, true);
      return newPrompt;
    }
  };

  /**
   * Handle logging a world action by saving it to the database and updating the in-memory log.
   * @param {object} socket - The socket instance.
   * @param {object} data - The action log data.
   */
  saveWorldLogAction = async (socket, data) => {
    console.log("actionLog:" + JSON.stringify(data));
    // Save the action log to the database
    const gameActionLogItem = await this.storeGameActionLog(data);
    // Update the in-memory action log
    this.WorldActionLog.addAction(data);
  };

  // ========================================================================
  // Database Helper Methods
  // ========================================================================

  /**
   * Store a message in the database.
   * @param {string} msg - The message text.
   * @param {string} to - Recipient ID.
   * @param {string} from - Sender ID.
   * @param {boolean} selfSent - Indicates if the sender is sending to self.
   */
  async storeMessage(msg, to, from, selfSent) {
    const Messages = require("../../models/messageModel");
    return await Messages.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });
  }

  /**
   * Store a world action log entry in the database.
   * @param {object} gameAction - The action log data.
   */
  async storeGameActionLog(gameAction) {
    const gameActionLog = require("../../models/WorldActionLogModel");
    await gameActionLog.create(gameAction);
  }

  /**
   * Save the game state to the database. Creates a new record if none exists.
   * @param {string} saveGameID - Identifier for the save.
   * @param {object} gameState - The game state data.
   */
  async storeGameState(saveGameID, gameState) {
    const gameSave = require("../../models/gameSaveStateModel");
    let save = await gameSave.findOne({ saveGameID });
    if (!save) {
      // Create new game state record
      await gameSave.create(gameState);
    } else {
      // Update existing game state record
      await gameSave.updateOne(gameState);
    }
  }

  /**
   * Read a game state from the database.
   * @param {string} saveGameID - Identifier for the save.
   * @returns {string|null} The game state as a JSON string or null if not found.
   */
  async readGameState(saveGameID) {
    saveGameID = saveGameID || "save1";
    const gameSave = require("../../models/gameSaveStateModel");
    let read = await gameSave.findOne({ saveGameID });
    console.log("Read Game State: ", JSON.stringify(read));
    return read ? JSON.stringify(read) : null;
  }

  // ========================================================================
  // AI Prompt and Response Methods
  // ========================================================================

  /**
   * Retrieve detailed character data from the island template.
   * @param {number|string} id - The character's identifier.
   */
  GetCharacterData(id) {
    return IslandTemplate.Residents[parseInt(id)];
  }

  /**
   * Retrieve a summarized version of a character's data.
   * @param {number|string} id - The character's identifier.
   */
  async GetCharacterDataSummary(id) {
    let res = this.GetCharacterData(id);
    if (!res) {
      console.error("Character data not found for ID: " + id);
      return null;
    }
    return {
      firstName: res.nameObj.first,
      lastName: res.nameObj.last,
      ageGender: res.age + "/"+ res.gender,
      descr: res.details.description,
      job: res.details.occupation,
      goal: res.details.goals !== "" ? res.details.goals[0].goalDescription : "",
      CharacterPersonality: res.details.personalityTraits || ["calm"],
    };
  }

  /**
   * Get summarized data for two characters involved in a conversation.
   * @param {Array} NPCIDs - Array containing the NPC and player IDs.
   */
  getPresentCharactersData(NPCIDs) {
    return [
      this.GetCharacterDataSummary(NPCIDs[0]),
      this.GetCharacterDataSummary(NPCIDs[1]),
    ];
  }

  /**
   * Build an AI prompt and stream its response back to clients.
   * @param {object} data - Contains message and participant details.
   * @param {Array} socketList - List of socket instances and IDs.
   * @param {boolean} doBroadcast - Whether to broadcast the response.
   */
  async promptAI(data, socketList, doBroadcast = true) {
    // Get any prefix data if this is the first message in the conversation
    const dataPrefix = this.getDataPrefix(data);
    this.updatePromptCount(data.to);
    // Notify clients that AI processing has started
    this.broadcastStartAI(socketList, data.msg, doBroadcast);
 
    // Build the full prompt string to send to the AI
    const sendMsg = await this.buildAIPromptTXT(data, dataPrefix);
    console.log("Send AI Prompt: " + sendMsg);
 
    // Stream and return the AI response
    return this.streamAIResponse(sendMsg, socketList, data.to, doBroadcast);
  }

  /**
   * Determine any prefix data (e.g., summarized character data) for an AI prompt.
   * @param {object} data - Message and participant data.
   */
  getDataPrefix(data) {
    if (this.lastSentToCharacter !== data.to) {
      this.lastSentToCharacter = data.to;
      this.promptCount = 0;
    }
    return this.promptCount <= 0 ? this.getPresentCharactersData([data.to, data.from]) : [];
  }

  /**
   * Update the prompt count when sending messages to a character.
   * @param {string} to - The recipient character's identifier.
   */
  updatePromptCount(to) {
    if (this.lastSentToCharacter !== to) {
      this.promptCount = 0;
    }
    this.promptCount++;
  }

  /**
   * Broadcast a message indicating that the AI is starting its response.
   * @param {Array} socketList - List of socket instances and IDs.
   * @param {string} msg - The initiating message.
   * @param {boolean} doBroadcast - Whether to perform the broadcast.
   */
  broadcastStartAI(socketList, msg, doBroadcast) {
    this.broadcastMsg(socketList, "msg-start-ai", msg, doBroadcast);
    this.isAIProcessing = true;
  }

  /**
   * Stream the AI's response using Ollama and broadcast parts of the response as they arrive.
   * @param {string} sendMsg - The prompt sent to the AI.
   * @param {Array} socketList - List of socket instances and IDs.
   * @param {string} to - The recipient character's identifier.
   * @param {boolean} doBroadcast - Whether to broadcast the response.
   */
  streamAIResponse(sendMsg, socketList, to, doBroadcast) {
    let responseContent = '';
    this.isAIProcessing = true;
    const streamResponseFull = (response) => {
      const resp = JSON.parse(response);
      // Broadcast each chunk of the AI response
      this.broadcastMsg(
        socketList,
        "msg-recieve-ai-part",
        { sender: to, text: resp },
        doBroadcast
      );
      responseContent += resp.response;  

      // When the AI indicates completion, add the full response to the conversation
      if (resp.done) {
        this.isAIProcessing = false;
        console.log(responseContent);
        this.addAIResponseToConversation(to, responseContent);
      }
    };

    return this.ollama.streamingGenerate(sendMsg, null, null, streamResponseFull);
  }

  /**
   * Summarize the conversation using an AI prompt.
   * @param {object} conversationData - The conversation data to summarize.
   */
  async summarizeConversation(conversationData, callback) {
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

IMPORTANT! Provide your response as a valid JSON object, do not include your reasoning or anything other than the JSON object and make sure to include both its surrounding braces "{}".
Provide the return JSON object with the following structure: 
  {"overallTopic": "Brief description of the main topic",
      "keywords": ["List of important keywords from the conversation"],
      "charactersMentioned": ["List of characters mentioned in the conversation"],
      "conversationSummary": "A concise summary of the conversation",
      "playerDetailsList": ["list of details mentioned about Ellie, the player"],
      "npcDetailsList": ["list of details revealed by the NPC"],
      "relationshipEffect": "number between -100 and 100 representing the effect on the NPC's relationship or friendship with the player"}`;

    let fullResponse = "";
    const streamResponseFull = (msg) => {
      msg = JSON.parse(msg);
      fullResponse += msg.response;
      if (msg.done) {
        if(fullResponse.charAt(fullResponse.length-1) !== "}")
          fullResponse += "}";
        try {
          const parsedResponse = JSON.parse(fullResponse);
          callback(parsedResponse);
        } catch (error) {
          console.log(fullResponse);
          console.error("Error parsing JSON response:", error);
          callback({"ERROR" : error});
        }
      }
    };
  
    await this.ollama.streamingGenerate(
      prompt,
      null,
      null,
      streamResponseFull
    );
  }

  /**
   * Add the AI's response to the current conversation history.
   * @param {string} to - The recipient character's identifier.
   * @param {string} content - The full AI response text.
   */
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

  // ========================================================================
  // AI Prompt Builder Helper Functions
  // ========================================================================

  /**
   * Build a prompt segment with character data.
   * @param {object} data - Character data.
   * @returns {string} The prompt segment.
   */
  buildCharacterPromptTXT(data) {
    let sendMsg = " Use the following character data: ";
    sendMsg += JSON.stringify(this.GetCharacterDataSummary(data));
    return sendMsg;
  }

  /**
   * Build a prompt segment that subtly includes plot details.
   * @param {object} data - Data that might include narrative elements.
   * @returns {string} The prompt segment.
   */
  buildPlotPromptTXT(data) {
    let sendMsg =
      " Subtly include: " +
      this.overallNarrative.intro[
        Math.floor(this.overallNarrative.intro.length * Math.random())
      ] +
      ". ";
    return sendMsg;
  }

  /**
   * Build a prompt segment with setting information.
   * @param {object} data - Data containing setting details (e.g., timeOfDay).
   * @returns {string} The prompt segment.
   */
  buildSettingPromptTXT(data) {
    return " Setting for the conversation is " + data.timeOfDay + ".";
  }

  /**
   * Build the full AI prompt text by combining character, setting, and plot segments.
   * @param {object} data - Contains message and participant details.
   * @param {Array} dataPrefix - Prefix data for the first message in a conversation.
   * @param {object} [userData] - Optional user data; defaults to the sender's character data.
   * @returns {string} The complete AI prompt.
   */
  async buildAIPromptTXT(data, dataPrefix, userData) {
    dataPrefix = dataPrefix || "";
    userData = userData || await this.GetCharacterData(data.from);
    let sendMsg =
      "# Respond as the character " + await this.GetCharacterData(data.to).name + ".";
    
    // Function to add details for the first message in the conversation
    const firstMsgInConvoPrompt = (d1, d2) => {
      sendMsg += this.buildCharacterPromptTXT(d2);
      sendMsg += this.buildSettingPromptTXT(d1);
      sendMsg += this.buildPlotPromptTXT(d1);
    };

    // If this is the first message, include character and setting details
    if (dataPrefix.length > 0) {
      firstMsgInConvoPrompt(data, await this.GetCharacterData(data.to));
    }
    // Append the user message and response length constraint
    sendMsg += " In 3 sentences or less respond to the following sent by " + await this.GetCharacterData(data.from).name + ": " + data.msg;

    return sendMsg;
  }
}

// Export the SocketManager class for use in other modules
module.exports = SocketManager;
