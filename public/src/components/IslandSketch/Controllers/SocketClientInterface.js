import { io } from "socket.io-client";
import { host } from "../../../utils/APIRoutes";

class SocketClientInterface {
  constructor() {
    this.socket = io(host);
    this.isProcessing = false;
    this.incomingMessage = { sender: -1, text: "" };
  }

  /**
   * Connects a user to the socket server.
   *
   * This function emits a 'connect-user' event to the socket server
   * with the provided user ID, establishing a connection for the user.
   *
   * @param {string|number} userId - The unique identifier of the user to connect.
   * @returns {void} This function does not return a value.
   */
  connectUser(userId) {
    this.socket.emit("connect-user", userId);
  }

  /**
   * Logs an action in the world to the socket server.
   *
   * This function emits a 'world-log-action' event to the socket server with the provided action data,
   * allowing the client to record various world events or player actions in the game.
   *
   * @param {Object} actionData - The data of the action to be logged.
   * @param {string|number} actionData.from - The identifier of the entity performing the action (e.g., player ID).
   * @param {string} actionData.action - A description of the action being performed.
   * @param {Object} [actionData.location] - The location where the action occurred, if applicable.
   * @param {number} [actionData.location.x] - The x-coordinate of the action location.
   * @param {number} [actionData.location.y] - The y-coordinate of the action location.
   * @param {Object} [actionData.additionalInfo] - Any additional information relevant to the action.
   * @returns {void} This function does not return a value.
   */
  worldLogAction(actionData) {
    this.socket.emit("world-log-action", actionData);
  }

  /**
   * Sends Game State to the socket server to be saved using the saveID as it's identifing key.
   *
   * This function emits a 'world-log-action' event to the socket server with the provided action data,
   * allowing the client to record various world events or player actions in the game.
   *
   * @param {string} saveID - The identifying key for the save state.
   * @param {Object} saveData.player - player
   * @param {Object} saveData.player.location - player world location x,y
   * @param {Object} saveData.player.inventory - player inventory, a map of item names as keys and counts as values
   * @param {Object} saveData.world.date - date value 
   * @param {Object} saveData.world.time - date time value
   * @returns {void} This function does not return a value.
   */
  saveGameState(saveID, saveData) {
    if(saveID && saveData){
      if(saveData.player && saveData.player.location && saveData.player.inventory && saveData.world && saveData.world.date && saveData.world.time){
        this.socket.emit("save-game-state", { saveID, saveData });
      } else {
        console.error("Invalid save data, missing player, location, inventory, world, date, or time");
      }
    }
  }

  loadGameState(saveID) {
    if(saveID){
      this.socket.emit("load-game-state", saveID);
      //console.error("Invalid save data, missing player, location, inventory, world, date, or time");
    }
  }

  /**
   * Sends a message to the socket server.
   *
   * This function emits a 'send-msg' event to the socket server with the provided message data,
   * allowing the client to send messages through the socket connection.
   *
   * @param {Object} messageData - The data of the message to be sent.
   * @param {string|number} messageData.from - The identifier of the message sender.
   * @param {string} messageData.msg - The content of the message.
   * @param {string|number} [messageData.to] - The identifier of the message recipient, if applicable.
   * @returns {void} This function does not return a value.
   */
  sendMessage(messageData) {
    this.socket.emit("send-msg", messageData);
  }

  /**
   * Loads a world state from the socket server.
   *
   * This function emits a 'load-world' event to the socket server with the provided world data,
   * allowing the client to submit a specific world state for the game.
   *
   * not used
   */
  loadWorld(worldData) {
    this.socket.emit("load-world", worldData);
  }

  /**
   * Initiates a conversation by emitting a 'start-conversation' event to the socket server.
   *
   * This function sends the provided conversation data to the server, signaling the start of a new conversation.
   *
   * @param {Object} conversationData - The data required to start the conversation.
   * @param {string|number} [conversationData.userId] - The identifier of the user starting the conversation.
   * @param {string|number} [conversationData.targetId] - The identifier of the target entity (e.g., AI, another user) for the conversation.
   * @param {Object} [conversationData.context] - Any additional context or settings for the conversation.
   * @returns {void} This function does not return a value.
   */
  startConversation(conversationData) {
    this.socket.emit("start-conversation", conversationData);
  }

  /**
   * Ends a conversation by emitting an 'end-conversation' event to the socket server.
   *
   * This function sends the provided conversation data to the server, signaling the end of a conversation.
   */
  endConversation(conversationData) {
    this.socket.emit("end-conversation", conversationData);
  }

  /*
   * Handles the start of incoming messages from the AI server.
   */
  onLoadGameStateData(callback) {
    this.socket.on("load-game-state-data", (gameState) => {
      callback(JSON.parse(gameState));
    });
  }


  /*
   * Handles the start of incoming messages from the AI server.
   */
  onMessageStartAI(callback) {
    this.socket.on("msg-start-ai", (msg) => {
      this.isProcessing = true;
      callback(msg);
    });
  }


  /**
   * Sets up a listener for receiving partial AI messages from the socket server.
   * 
   * This function registers a callback to be executed when a 'msg-recieve-ai-part' event
   * is received from the server. It updates the internal state of the incoming message
   * and processing status based on the received message parts.
   *
   * @param {Function} callback - The function to be called when a partial AI message is received.
   *                              This function will be passed two arguments:
   *                              1. The received message part
   *                              2. The current state of the complete incoming message
   * @returns {void} This function does not return a value.
   */
  onMessageReceiveAIPart(callback) {
    this.socket.on("msg-recieve-ai-part", (msg) => {
      if (msg.text.done) {
        this.isProcessing = false;
        this.incomingMessage = { sender: -1, text: "" };
      } else {
        this.incomingMessage.sender = msg.sender;
        this.incomingMessage.text += msg.text.response;
      }
      callback(msg, this.incomingMessage);
    });
  }
  onMessageReceiveAI(callback) {
    this.socket.on("msg-recieve-ai", (msg) => {
      this.isProcessing = false;
      callback(msg);
    });
  }
}

export default SocketClientInterface;
