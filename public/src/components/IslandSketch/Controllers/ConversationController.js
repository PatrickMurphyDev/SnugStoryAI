import { io } from "socket.io-client";
import { host } from "../../../utils/APIRoutes";
import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import SimulationTime from "../../../utils/SimulationTime";

const SIMTIME = SimulationTime.getInstance();
class ConversationController {
  constructor(parent, data) {
    this.parent = parent;
    this.options = {};
    this.options["hideNarrative"] = false;
    this.options["syntaxKey"] = '"';
    this.users = [];
    this.isProcessing = false;
    this.maxDialogSeq = 0;
    this.currentNPC = "";
    this.incomingMessage = { sender: -1, text: "" };
    this.currentNarrativeLevel = "intro";
    this.overallNarrative = {intro:["NPC Should hint at Ellie's Dad's Death not being an accident", "NPC should warn Ellie of the mysterious cult on the island without using the word cult.","Hint at shady families that control the island"],action:[],climax:[]}

    this.socket = {};
    this.socket.current = io(host);

    // add user ellie
    this.socket.current.emit("add-user", "000000000000000000000001");

    let getDataEl = (data) => {
      return data || [];
    };
    this.conversationMap = {};
    this.chatData = getDataEl(data);

    const handleMsgReceiveAI = (msg) => {
      console.log("msg-recieve-ai: ", msg);

      this.isProcessing = false;
      let msg2 = { ...msg };
      if (!msg.to) msg2.to = "0000000000000000000000001";
      if (!msg.sender)
        msg2.sender = this.convertNPCKeyToID(this.parent.GUI.getNPCKey());
      if (msg2.sender === this.currentNPC) {
        if (this.users.indexOf(msg2.sender) === -1) {
          this.addUser(msg2.sender);
        }
        this.addChat(msg2); // recieve full msg
      }
    };
    const handleMsgReceiveAIPart = (msg) => {
      console.log("msg-recieve-ai-part: ", msg);
      if (msg.text.done) {
        //resp done
        this.isProcessing = false;
        this.addChat({ sender: msg.sender, text: this.incomingMessage.text });
        this.incomingMessage = { sender: -1, text: "" };
      } else {
        this.incomingMessage["sender"] = msg.sender;
        this.appendChat(msg.text.response);
      }
    };

    const handleMsgStartAI = (msg) => {
      console.log("msg-start-ai: ", msg);
      this.isProcessing = true;
    };

    this.socket.current.on("msg-recieve-ai", handleMsgReceiveAI);
    this.socket.current.on("msg-recieve-ai-part", handleMsgReceiveAIPart);
    this.socket.current.on("msg-start-ai", handleMsgStartAI);
  }

  setSeq(seq) {
    this.maxDialogSeq = Math.max(this.maxDialogSeq, seq);
  }

  getSeq() {
    return this.maxDialogSeq;
  }

  addUser(user) {
    this.socket.current.emit("add-user", user);
    this.users.push(user);
  }

  convertNPCKeyToID(npcKey) {
    return (
      "000000000000000000000000" + IslandTemplate.NPCKEYS.indexOf(npcKey)
    ).substring((IslandTemplate.NPCKEYS.indexOf(npcKey) + "").length);
  }

  loadWorld(){
    this.socket.current.emit("load-world", "{WorldData:{time:"+SIMTIME.getTime12Hr()+"}}");
  }

  openConversation(NPC) {
    SIMTIME.pause();
    console.log("open convo ", NPC);
    this.isProcessing = false;
    NPC = this.convertNPCKeyToID(this.parent.GUI.AlertWindow.getNPCKey());
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
      NPC || this.convertNPCKeyToID(this.parent.GUI.AlertWindow.getNPCKey());
    if (Object.keys(this.conversationMap).indexOf(NPC) > -1)
      return this.conversationMap[NPC];
    else{ 
      return {};
    }
  }

  getConversation(NPC, conversationHistoryOffset = 0) {
    NPC =
      NPC || this.convertNPCKeyToID(this.parent.GUI.AlertWindow.getNPCKey());
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

    if (this.options.hideNarrative && !isGUI) {
      this._filterNarrativeText(cdata);
    }

    if (isGUI) {
      // if sent from gui not AI send msg socket
      this._sendMsgSocket(cdata);
    }
    this.chatData.push(cdata);
  }

  _sendMsgSocket(cm) {
    this.socket.current.emit("send-msg", [
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
    this.socket.current.emit("start-conversation", {
      NPC: cm.NPC, // npc ***00000x
      Player: cm.Player, // me ***0001
      timeOfDay: SIMTIME.getTime12Hr(),
    });
  }
  _sendEndConvoSocket(cm) {
    this.socket.current.emit("end-conversation", {
      NPC: cm.NPC, // npc ***00000x
      Player: cm.Player, // me ***0001
      timeOfDay: SIMTIME.getTime12Hr(),
    });
  }

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

  validateChatMessage(cm) {
    cm = cm || {};
    if (!cm.to) cm.to = this.parent.GUI.AlertWindow.getNPCKey();
    if (!cm.toID)
      cm.toID = this.convertNPCKeyToID(this.parent.GUI.AlertWindow.getNPCKey());
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
        ? this.convertNPCKeyToID(this.parent.GUI.AlertWindow.getNPCKey())
        : NPC;
    //this.conversationMap[NPC].forEach(fn);
  }

  forEachConversationHistory(NPC, histOffset, fn) {
    this.getConversation(NPC, histOffset).forEach(fn);
  }
}

export default ConversationController;
