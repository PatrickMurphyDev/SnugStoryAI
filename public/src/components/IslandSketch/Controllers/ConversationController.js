class ConversationController {
    constructor(parent,data) {
        this.parent = parent;
        this.chatData = data || [{text:"Hey you must be Ellie! Nice to meet you I'm "+this.GUI.AlertWindowNPCKey+"!", seq: 0, sender: this.GUI.AlertWindowNPCKey, sentTime: '10s ago'},
            {text:"Hey "+this.GUI.AlertWindowNPCKey+"!", seq: 1, sender: "PLAYER", sentTime:'6s ago'},
            {text:"I'm so happy to meet you!",seq: 2, sender: "PLAYER", sentTime:'4s ago'},
            {text:"You are stunning!", seq:3, sender:this.GUI.AlertWindowNPCKey, sentTime:'2s ago'}
          ];
    }

    addChat(cm){
        cm = cm || {};
        if(!cm.text)
            cm.text = "Chat.......";
        if(!cm.sender)
            cm.sender = "PLAYER";
        if(!cm.sentTime)
            cm.sentTime = "10s";
        if(!cm.seq)
            cm.seq = this.parent.maxDialogSeq + 1;

        this.chatData.push(cm);
    }

    getChatData(){
        return this.chatData;
    }

    forEach(fn){
        this.chatData.forEach(fn);
    }

    update(p5) {
        
    }

    render(p5) {
    }
  }
  
  export default ConversationController;