import { GameSlideScene } from "./GameSlideScene";
class GameDialogScene extends GameSlideScene {
  constructor(parent) {
    super("GameDialogueScene");
    this.parent = parent;
    this.dialogDisplayModes = ["Chat","Shop","Conversation History"];
    this.dialogDisplayMode = 0;
    this.otherPlayerPos = { x: 1000 - 175 - 200, y: 250 - 200 };
  }

  getDisplayMode(){
    return this.dialogDisplayMode;
  }

  setDisplayMode(dm){
    this.dialogDisplayMode = dm;
  }

  draw(p5) {
    let that = this;
    drawDialogBackground(); // draw bg img, player back of head, NPC, NPC Title
  
    // draw convo 
    if(this.getDisplayMode() === 0) {
      drawChatBubbles();
      this.drawShopButton(p5);
      this.drawConversationHistoryButton(p5);
      if (this.parent.chatData.isProcessing) {
        drawIsAIProcessing();
      }
    }else{
      // mode not current convo
      this.drawBackButton(p5);
      p5.push();
      p5.textSize(36);
      p5.text(this.dialogDisplayModes[this.dialogDisplayMode],250+p5.textWidth(this.dialogDisplayModes[this.dialogDisplayMode])/2,60);
      p5.pop();
    }

    if(this.getDisplayMode() === 2){
      drawConvoBubbles()
    }
    this.drawEndChatButton(p5);

    //this display action buttons
    //    this display action button sub menus
    //    this display chat sub panels

    function drawConvoBubbles() {
      p5.push();
      p5.textSize(18);
      const varData = that.parent.chatData.getConversations(that.parent.GUI.AlertWindow.getNPCKey())

      for(var i = 0; i<varData.length; i++){
        that.drawDialogBubble(p5, varData[i].name || "convo", i);
      }
      p5.pop();
    }
    function drawChatBubbles() {
      p5.push();
      p5.textSize(18);
      that.parent.chatData.forEach((v) => {
        that.drawDialogBubble(p5, v.text, v.seq, v.sender, v.sentTime);
      });
      p5.pop();
    }

    function drawNPCNameBanner() {
      p5.push();
      p5.fill("#aaaaffaa");
      p5.rect(that.otherPlayerPos.x - 5, that.otherPlayerPos.y + 350, 360, 24);
      p5.fill('#ffffff');
      p5.stroke('#000000aa');
      p5.textSize(26);
      p5.text(that.parent.GUI.AlertWindow.getNPCKey(), that.otherPlayerPos.x + 350 / 2, that.otherPlayerPos.y + 350 + 10);
      p5.pop();
    }

    function drawNPC() {
      if (that.parent.characterProfileImages[that.parent.GUI.AlertWindow.getNPCKey()]) {
        p5.image(
          that.parent.characterProfileImages[that.parent.GUI.AlertWindow.getNPCKey()],
          that.otherPlayerPos.x,
          that.otherPlayerPos.y,
          350,
          350
        );
      }
    }

    function drawPlayer() {
      p5.image(
        that.parent.parentAssets["GameMapScene"]["PlayerBackHeadImage"],
        50,
        200,
        450,
        450
      );
    }

    function drawDialogBackground() {
      p5.background(0);
      if (that.parent.parentAssets["GameMapScene"][that.parent.GUI.BGKey]) {
        p5.image(
          that.parent.parentAssets["GameMapScene"][that.parent.GUI.BGKey],
          -12,
          -250
        );
      }

      // draw backdrop
      drawPlayer();           // Draw Player Back of Head
      drawNPC();              // Draw Other Player Profile Image
      drawNPCNameBanner();
    }

    function drawIsAIProcessing() {
      p5.push();
      p5.fill("#00ffff77");
      p5.rect(p5.width * 0.3, p5.height * 0.75, p5.width * 0.4, 60);
      p5.noStroke();
      p5.fill("#ffffffdd");
      p5.text(that.parent.chatData['incomingMessage']['text'], p5.width * 0.3, p5.height * 0.75, p5.width * 0.4, 60);
      p5.pop();
    }
  }

  drawDialogBubble(p5, text, seq, senderName, sentTime) {
    this.parent.chatData.setSeq(seq);
    seq = seq - this.parent.chatData.getSeq();
    const offset = senderName === "EllieTupee" ? -250 : 0;
    const rectDimensions = {
      x: p5.width * 0.35 + offset,
      y: p5.height * 0.6 + 100 * seq,
      w: p5.width * 0.55,
      getWidth: (pct) => p5.width * (pct || 0.45),
      h: Math.max(65, (text.length / 150) * 50 + 30),
    };
    const isMouseOver = p5.mouseX > rectDimensions.x && p5.mouseX <rectDimensions.x+rectDimensions.w && p5.mouseY > rectDimensions.y && p5.mouseY < rectDimensions.y+rectDimensions.h;
    // 0123456789abcdef
    const opacityMap = ["dd", "bb", "99", "77", "55", "33"];
    const trans =
      isMouseOver ? 'ff' : opacityMap[Math.min(opacityMap.length - 1, Math.abs(seq))] || "cc";

    p5.push();
    drawBubbleBG();
    drawBubbleText();
    //p5.text(sentTime, rectDimensions.x + rectDimensions.getWidth(.40), rectDimensions.y + textSentTimeVertOffset);
    p5.pop();

    function drawBubbleText() {
      p5.noStroke();
      p5.fill("#333333");
      //p5.text(senderName === "EllieTupeeupee" ? "You" : this.convertNPCIDToNPCKey(senderName), rectDimensions.x + rectDimensions.getWidth(.0355), rectDimensions.y + textNameVertOffset);
      p5.text(
        text,
        rectDimensions.x,
        rectDimensions.y,
        rectDimensions.getWidth(0.50),
        rectDimensions.h
      );
    }

    function drawBubbleBG() {
      p5.fill(senderName === "EllieTupee" ? "#aaffFF" + trans : "#aaaaff" + trans);
      p5.stroke(senderName === "EllieTupee" ? "#44aaaaee" : "#4444aaee");
      p5.rect(
        rectDimensions.x,
        rectDimensions.y,
        rectDimensions.w,
        rectDimensions.h
      );
    }
  }

  drawEndChatButton(p5) {
    const pos = p5.createVector(35, this.otherPlayerPos.y - 30);
    const dim = p5.createVector(150, 70);
    p5.fill("blue");
    p5.stroke("lightblue");
    p5.rect(pos.x, pos.y, dim.x, dim.y);
    p5.noStroke();
    p5.fill("#ffffff");
    p5.text("End Chat", pos.x, pos.y, dim.x, dim.y);
    this.parent.handleTargetClick(p5, pos.x, pos.y, dim.x, dim.y, () => {
      this.parent.GUI.setDisplayMode(0);
      this.setDisplayMode(0);
    });
  }

  drawShopButton(p5) {
    const pos = p5.createVector(35, this.otherPlayerPos.y + 80 - 30);
    const dim = p5.createVector(150, 70);
    p5.fill("#222222ee");
    p5.stroke("#666666ee");
    p5.rect(pos.x, pos.y, dim.x, dim.y);
    p5.noStroke();
    p5.fill("#ffffff");
    p5.text("Shop", pos.x, pos.y, dim.x, dim.y);
    this.parent.handleTargetClick(p5, pos.x, pos.y, dim.x, dim.y, () => {
      this.setDisplayMode(1);
    });
  }

  drawBackButton(p5) {
    const pos = p5.createVector(35, this.otherPlayerPos.y + 80 - 30);
    const dim = p5.createVector(150, 70);
    p5.fill("#222222ee");
    p5.stroke("#666666ee");
    p5.rect(pos.x, pos.y, dim.x, dim.y);
    p5.noStroke();
    p5.fill("#ffffff");
    p5.text("< Back", pos.x, pos.y, dim.x, dim.y);
    this.parent.handleTargetClick(p5, pos.x, pos.y, dim.x, dim.y, () => {
      this.setDisplayMode(0);
    });
  }
  
  drawConversationHistoryButton(p5) {
    const pos = p5.createVector(35, this.otherPlayerPos.y + 80*2 - 30);
    const dim = p5.createVector(150, 70);
    p5.fill("#222222ee");
    p5.stroke("#666666ee");
    p5.rect(pos.x, pos.y, dim.x, dim.y);
    p5.noStroke();
    p5.fill("#ffffff");
    p5.text("Chat History", pos.x, pos.y, dim.x, dim.y);
    this.parent.handleTargetClick(p5, pos.x, pos.y, dim.x, dim.y, () => {
      this.setDisplayMode(2);
    });
  }
}

export default GameDialogScene;
