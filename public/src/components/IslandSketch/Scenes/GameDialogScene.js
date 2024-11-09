import { GameSlideScene } from "./GameSlideScene";
class GameDialogScene extends GameSlideScene {
  constructor(parent) {
    super("GameDialogueScene");
    this.parent = parent;
    this.otherPlayerPos = { x: 1000 - 175 - 200, y: 250 - 200 };
  }

  draw(p5) {
    drawDialogBackground();
    drawPlayer();           // Draw Player Back of Head
    drawNPC();              // Draw Other Player Profile Image
    drawNPCNameBanner();
    drawChatBubbles();
    this.drawEndChatButton(p5);
    this.drawShopButton(p5);
    if (this.parent.chatData.isProcessing) {
      drawIsAIProcessing();
    }

    //this display action buttons
    //    this display action button sub menus
    //    this display chat sub panels

    function drawChatBubbles() {
      p5.push();
      p5.textSize(18);
      this.parent.chatData.forEach((v) => {
        this.drawDialogBubble(p5, v.text, v.seq, v.sender, v.sentTime);
      });
      p5.pop();
    }

    function drawNPCNameBanner() {
      p5.push();
      p5.fill("#aaaaffaa");
      p5.rect(this.otherPlayerPos.x - 5, this.otherPlayerPos.y + 350, 360, 24);
      p5.fill('#ffffff');
      p5.stroke('#000000aa');
      p5.textSize(26);
      p5.text(this.parent.GUI.AlertWindowNPCKey, this.otherPlayerPos.x + 350 / 2, this.otherPlayerPos.y + 350 + 10);
      p5.pop();
    }

    function drawNPC() {
      if (this.parent.characterProfileImages[this.parent.GUI.AlertWindowNPCKey]) {
        p5.image(
          this.parent.characterProfileImages[this.parent.GUI.AlertWindowNPCKey],
          this.otherPlayerPos.x,
          this.otherPlayerPos.y,
          350,
          350
        );
      }
    }

    function drawPlayer() {
      p5.image(
        this.parent.parentAssets["GameMapScene"]["PlayerBackHeadImage"],
        50,
        200,
        450,
        450
      );
    }

    function drawDialogBackground() {
      p5.background(0);
      if (this.parent.parentAssets["GameMapScene"][this.parent.GUI.BGKey]) {
        p5.image(
          this.parent.parentAssets["GameMapScene"][this.parent.GUI.BGKey],
          -12,
          -250
        );
      }
    }

    function drawIsAIProcessing() {
      p5.push();
      p5.fill("#00ffff77");
      p5.rect(p5.width * 0.4, p5.height * 0.7, p5.width * 0.2, 22);
      p5.noStroke();
      p5.fill("#ffffffdd");
      p5.text("Typing...", p5.width * 0.4, p5.height * 0.7, p5.width * 0.2, 22);
      p5.pop();
    }
  }

  drawDialogBubble(p5, text, seq, senderName, sentTime) {
    this.parent.chatData.setSeq(seq);
    seq = seq - this.parent.chatData.getSeq();
    const offset = senderName === "PLAYER" ? -250 : 0;
    const rectDimensions = {
      x: p5.width * 0.35 + offset,
      y: p5.height * 0.6 + 100 * seq,
      w: p5.width * 0.55,
      getWidth: (pct) => p5.width * (pct || 0.45),
      h: Math.max(65, (text.length / 150) * 50 + 30),
    };
    // 0123456789abcdef
    const opacityMap = ["dd", "bb", "99", "77", "55", "33"];
    const trans =
      opacityMap[Math.min(opacityMap.length - 1, Math.abs(seq))] || "cc";

    p5.push();
    drawBubbleBG();
    drawBubbleText();
    //p5.text(sentTime, rectDimensions.x + rectDimensions.getWidth(.40), rectDimensions.y + textSentTimeVertOffset);
    p5.pop();

    function drawBubbleText() {
      p5.noStroke();
      p5.fill("#333333");
      //p5.text(senderName === "PLAYER" ? "You" : this.convertNPCIDToNPCKey(senderName), rectDimensions.x + rectDimensions.getWidth(.0355), rectDimensions.y + textNameVertOffset);
      p5.text(
        text,
        rectDimensions.x,
        rectDimensions.y,
        rectDimensions.getWidth(0.50),
        rectDimensions.h
      );
    }

    function drawBubbleBG() {
      p5.fill(senderName === "PLAYER" ? "#aaffFF" + trans : "#aaaaff" + trans);
      p5.stroke(senderName === "PLAYER" ? "#44aaaaee" : "#4444aaee");
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
      this.parent.GUI.setDisplayMode(0);
    });
  }
}

export default GameDialogScene;
