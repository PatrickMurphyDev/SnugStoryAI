import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import SimulationTime from "../../../utils/SimulationTime";

const SIMTIME = SimulationTime.getInstance();
class ConversationController {
  constructor(parent, data, socketController) {
    this.parent = parent;
    this.isProcessing = false;
    this.options = {
      hideNarrative: false,
      syntaxKey: '"',
    };
    this.users = [];
    this.maxDialogSeq = 0;
    this.currentNPC = "";
    this.incomingMessage = { sender: -1, text: "" };
    this.currentNarrativeLevel = "intro";
    this.overallNarrative = {
        intro: [
          "NPC Should hint at Ellie's Dad's Death not being an accident",
          "NPC should warn Ellie of the mysterious cult on the island without using the word cult.",
          "Hint at shady families that control the island"
        ],
        action: [],
        climax: []
      };
      
      this.socketController = socketController;
      this.setupSocketListeners();

    // add user ellie
    this.socketController.connectUser("000000000000000000000001");

    this.conversationMap = {};
    this.chatData = data || [];
  }

  setupSocketListeners() {
    // Add Listener for entire message recieved from AI Model
    this.socketController.onMessageReceiveAI((msg) => {
      // NOT USED CURRENTLY ====================
      console.log("msg-recieve-ai: ", msg);
      let msg2 = { ...msg };
      if (!msg.to) msg2.to = "0000000000000000000000001";
      if (!msg.sender) {
        msg2.sender = this.convertNPCKeyToID(this.parent.GUI.getNPCKey());
      }

      if (msg2.sender === this.currentNPC) {
        if (this.users.indexOf(msg2.sender) === -1) {
          this.addUser(msg2.sender);
        }
        this.addChat(msg2);
        this.isProcessing = false;
      }
    });

    // Add listener for part (around the length of one word) of the message recieved from AI Model
    this.socketController.onMessageReceiveAIPart((msg, incomingMessage) => {
      console.log("msg-recieve-ai-part: ", msg);
      if (msg.text.done) {
        this.appendChat(msg.text.response);
        this.addChat({ sender: msg.sender, text: this.incomingMessage.text });
        this.incomingMessage.text = "";
        this.incomingMessage.sender = -1;
        this.isProcessing = false;
      }else{
        this.incomingMessage["sender"] = msg.sender;
        this.appendChat(msg.text.response);
      }
    });

    // Add listener for when the AI Model starts generating a response
    this.socketController.onMessageStartAI((msg) => {
      console.log("msg-start-ai: ", msg);
      this.isProcessing = true;
    });
  }

  setSeq(seq) {
    this.maxDialogSeq = Math.max(this.maxDialogSeq, seq);
  }

  getSeq() {
    return this.maxDialogSeq;
  }

  addUser(user) {
    this.socketController.addUser(user);
    this.users.push(user);
  }

  convertNPCKeyToID(npcKey) {
    return (
      "000000000000000000000000" + IslandTemplate.NPCKEYS.indexOf(npcKey)
    ).substring((IslandTemplate.NPCKEYS.indexOf(npcKey) + "").length);
  }

  loadWorld(){
    this.socketController.loadWorld("{WorldData:{time:"+SIMTIME.getTime12Hr()+"}}");
  }

  openConversation(NPC) {
    SIMTIME.pause();
    console.log("open convo ", NPC);
    this.isProcessing = false;
    NPC = this.convertNPCKeyToID(this.parent.getNPCKey());
    this.currentNPC = NPC;
    if (!this.ConversationMapContainsNPC(NPC)) {
      this.conversationMap[NPC] = [];
    }
    this.chatData = [];
    this.pastConversations = this.getConversations(NPC);
    //this._sendStartConvoSocket({NPC: NPC, Player: "000000000000000000000001"});
    return {
      ChatData: this.chatData,
      PastConversations: this.pastConversations,
    };
  }

  ConversationMapContainsNPC(NPC) {
    return Object.keys(this.conversationMap).indexOf(NPC) !== -1;
  }

  closeConversation() {
    //this.socketController.endConversation(this.chatData, this.currentNPC);
    //this._sendEndConvoSocket({NPC: this.currentNPC, Player:"000000000000000000000001"});
    //this._sendMsgSocket(this.validateChatMessage({text:"#### End Chat Conversation with NPC ###"}))
    // SAVE
    this.addConversation(this.currentNPC, this.chatData);
    // RESET
    this.chatData = [];
    this.currentNPC = "";
    this.maxDialogSeq = 0;
    SIMTIME.start();
  }

  getConversations(NPC, limit) {
    NPC =
      NPC || this.convertNPCKeyToID(this.parent.getNPCKey());
    if (Object.keys(this.conversationMap).indexOf(NPC) > -1)
      return this.conversationMap[NPC];
    else{ 
      return {};
    }
  }

  getConversation(NPC, conversationHistoryOffset = 0) {
    NPC =
      NPC || this.convertNPCKeyToID(this.parent.getNPCKey());
    if (this.conversationMap[NPC])
      return this.conversationMap[NPC]; //[this.conversationMap[NPC].length - 1 - conversationHistoryOffset]
  }

  addConversation(NPC, dataArr) {
    this.conversationMap[NPC]["Convo"+0] = (dataArr);
  }

  setConversation(NPC, dataArr) {
    this.addConversation(NPC, dataArr);
  }

  appendChat(txt) {
    this.incomingMessage["text"] += txt;
  }

  addChat(cm, isGUI) {
    const cdata = this.validateChatMessage(cm);

    //if (this.options.hideNarrative && !isGUI) {
    //  this._filterNarrativeText(cdata);
    //}

    if (isGUI) {
      // if sent from gui not AI send msg socket
      this._sendMsgSocket(cdata);
    }
    this.chatData.push(cdata);
  }

  _sendMsgSocket(cm) {
    this.socketController.sendMessage([
      {
        to: cm.toID,
        from: cm.from,
        llmodel: 1,
        senderIsAI: 0,
        msg: cm.text,
        timeOfDay: SIMTIME.getTime12Hr(),
      },
      [this.chatData],
    ]);
  }

  _sendStartConvoSocket(cm) {
    this.socketController.startConversation({
      NPC: cm.NPC,
      Player: cm.Player,
      timeOfDay: SIMTIME.getTime12Hr(),
    });
  }

  _sendEndConvoSocket(cm) {
    this.socketController.endConversation({
      NPC: cm.NPC,
      Player: cm.Player,
      timeOfDay: SIMTIME.getTime12Hr(),
    });
  }
/* 
  _filterNarrativeText(cm) {
    if (cm.text.indexOf(this.optioins.syntaxKey) >= 0) {
      cm.text = cm.text.substring(
        cm.text.indexOf(this.optioins.syntaxKey),
        cm.text.length - 1
      );
      if (cm.text.indexOf(this.optioins.syntaxKey) >= 0) {
        cm.text = cm.text.substring(
          0,
          cm.text.indexOf(this.optioins.syntaxKey)
        );
      }
    }
  }
 */
  validateChatMessage(cm) {
    cm = cm || {};
    if (!cm.to) cm.to = this.parent.getNPCKey();
    if (!cm.toID)
      cm.toID = this.convertNPCKeyToID(this.parent.getNPCKey());
    if (!cm.text) cm.text = "Chat.......";
    if (!cm.sender) cm.sender = "EllieTupee";
    if (!cm.from) {
      cm.from = "000000000000000000000001";
    }
    if (!cm.sentTime) cm.sentTime = SIMTIME.getTime12Hr();
    if (!cm.seq) cm.seq = this.getSeq() + 1;

    return cm;
  }

  getChatData() {
    return this.chatData;
  }

  forEach(fn) {
    this.chatData.forEach(fn);
  }

  forEachNPC(NPC, fn) {
    NPC =
      NPC.length < 23
        ? this.convertNPCKeyToID(this.parent.getNPCKey())
        : NPC;
    //this.conversationMap[NPC].forEach(fn);
  }

  forEachConversationHistory(NPC, histOffset, fn) {
    this.getConversation(NPC, histOffset).forEach(fn);
  }
}

export default ConversationController;
