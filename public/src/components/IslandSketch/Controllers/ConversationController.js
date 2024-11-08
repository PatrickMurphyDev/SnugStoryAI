
import { io } from "socket.io-client";
import { host } from "../../../utils/APIRoutes";
import { IslandTemplate } from "../../../utils/IslandTemplateTile";

class ConversationController {
    constructor(parent,data) {
        this.parent = parent;
        this.isProcessing = false;

        this.socket = {};
        this.socket.current = io(host)
        
        this.socket.current.emit("add-user", "000000000000000000000001");

        this.chatData = data || [{text:"Hey you must be Ellie! Nice to meet you I'm " + this.parent.GUI.AlertWindowNPCKey + "!", seq: 0, sender: this.GUI.AlertWindowNPCKey, sentTime: '10s ago'},
            {text:"Hey "+this.parent.GUI.AlertWindowNPCKey+"!", seq: 1, sender: "PLAYER", sentTime:'6s ago'},
            {text:"I'm so happy to meet you!",seq: 2, sender: "PLAYER", sentTime:'4s ago'},
            {text:"You are stunning!", seq:3, sender:this.parent.GUI.AlertWindowNPCKey, sentTime:'2s ago'}
          ];

          const handleMsgReceiveAI = (msg) => {
            console.log("msg-recieve-ai: ", msg);
            
            this.isProcessing = false;
            let msg2 = {text:msg}; 
            msg2.to = "000000000000000000000001";
            msg2.sender = this.convertNPCKeyToID(this.parent.GUI.AlertWindowNPCKey);
            this.socket.current.emit("add-user", msg2.sender);
            this.addChat(msg2);
          };
      
          const handleMsgStartAI = (msg) => {
            console.log("msg-start-ai: ", msg);
            this.isProcessing = true;
          };
      
          this.socket.current.on("msg-recieve-ai", handleMsgReceiveAI);
          this.socket.current.on("msg-start-ai", handleMsgStartAI);
    }

    convertNPCKeyToID(npcKey){
        return ("000000000000000000000000" + IslandTemplate.NPCKEYS.indexOf(npcKey)).substring((IslandTemplate.NPCKEYS.indexOf(npcKey)+"").length);
    }

    addChat(cm,isGUI){
        cm = cm || {};
        if(!cm.to)
            cm.to = this.parent.GUI.AlertWindowNPCKey;
        if(!cm.toID)
            cm.toID = this.convertNPCKeyToID(this.parent.GUI.AlertWindowNPCKey);
        if(!cm.text)
            cm.text = "Chat.......";
        if(!cm.sender)
            cm.sender = "PLAYER";
        if(!cm.from){
            cm.from = "000000000000000000000001";
        }
        if(!cm.sentTime)
            cm.sentTime = "10s";
        if(!cm.seq)
            cm.seq = this.parent.maxDialogSeq + 1;

        if(isGUI){
            this.socket.current.emit("send-msg", {
                to: cm.toID,
                from: cm.from,
                llmodel: 1,
                senderIsAI: 0,
                msg: cm.text
            });
        }
        this.chatData.push(cm);
    }

    getChatData(){
        return this.chatData;
    }

    forEach(fn){
        this.chatData.forEach(fn);
    }
  }

  export default ConversationController;