
import { io } from "socket.io-client";
import { host } from "../../../utils/APIRoutes";
import { IslandTemplate } from "../../../utils/IslandTemplateTile";

class ConversationController {
    constructor(parent,data) {
        this.parent = parent;
        this.options = {};
        this.options['hideNarrative'] = false;
        this.options['syntaxKey'] = '"';
        this.isProcessing = false;
        this.maxDialogSeq = 0;

        this.socket = {};
        this.socket.current = io(host)
        
        // add user ellie
        this.socket.current.emit("add-user", "000000000000000000000001"); 

        let getDataEl = (data)=>{return data || [{text:"Hey you must be Ellie! Nice to meet you I'm " + this.parent.GUI.AlertWindowNPCKey + "!", seq: 0, sender: this.GUI.AlertWindowNPCKey, sentTime: '10s ago'},
            {text:"Hey "+this.parent.GUI.AlertWindowNPCKey+"!", seq: 1, sender: "PLAYER", sentTime:'6s ago'},
            {text:"I'm so happy to meet you!",seq: 2, sender: "PLAYER", sentTime:'4s ago'},
            {text:"You are stunning!", seq:3, sender:this.parent.GUI.AlertWindowNPCKey, sentTime:'2s ago'}
          ];}
        this.converstionMap = {};
        this.chatData = getDataEl(data);

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

    setSeq(seq){
        this.maxDialogSeq = Math.max(this.maxDialogSeq, seq);
    }
    
    getSeq(){
        return this.maxDialogSeq;
    }

    convertNPCKeyToID(npcKey){
        return ("000000000000000000000000" + IslandTemplate.NPCKEYS.indexOf(npcKey)).substring((IslandTemplate.NPCKEYS.indexOf(npcKey)+"").length);
    }

    openConversation(NPC){
        NPC = NPC || this.convertNPCKeyToID(this.parent.GUI.AlertWindowNPCKey);
        if(!this.converstionMap[NPC]){
            this.converstionMap[NPC] = [{text:"Hey you must be Ellie! Nice to meet you I'm " + this.parent.GUI.AlertWindowNPCKey + "!", seq: 0, sender: this.parent.GUI.AlertWindowNPCKey, sentTime: '10s ago'},
                {text:"Hey "+this.parent.GUI.AlertWindowNPCKey+"!", seq: 1, sender: "PLAYER", sentTime:'6s ago'},
                {text:"I'm so happy to meet you!",seq: 2, sender: "PLAYER", sentTime:'4s ago'},
                {text:"You are stunning!", seq:3, sender:this.parent.GUI.AlertWindowNPCKey, sentTime:'2s ago'}
              ];
        }
        this.chatData = this.converstionMap[NPC];
        return this.converstionMap[NPC];
    }
    closeConversation(){
        this.chatData = [];
        this.maxDialogSeq = 0;
    }
    getConversation(NPC,historyOffset){
        NPC = NPC || this.convertNPCKeyToID(this.parent.GUI.AlertWindowNPCKey);
        historyOffset = 0;
        return this.converstionMap[NPC];
    }
    setConversation(NPC,dataArr){
        this.converstionMap[NPC] = dataArr;
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
            cm.seq = this.getSeq() + 1;

        if(this.options.hideNarrative && !isGUI){
            if(cm.text.indexOf(this.optioins.syntaxKey) >= 0){
                cm.text = cm.text.substring(cm.text.indexOf(this.optioins.syntaxKey), cm.text.length-1);
                if(cm.text.indexOf(this.optioins.syntaxKey) >= 0){
                    cm.text = cm.text.substring(0,cm.text.indexOf(this.optioins.syntaxKey));
                }
            }
        }

        if(isGUI){
            // if sent from gui not AI send msg socket
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