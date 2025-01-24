import CharacterInventory from "../CharacterFeatures/CharacterInventory";
import { ItemsEnum } from "../ConfigurationData/ItemsEnum";
import GUIButton from "../GUI/GUIButton";
import { GameSlideScene } from "./GameSlideScene";
import absorb from 'absorb';

class GameDialogScene extends GameSlideScene {
  constructor(parent) {
    super("GameDialogScene");
    this.parent = parent;
    this.npcInventory = new CharacterInventory(300);
    this.npcInventory.addItem(ItemsEnum.Item8,50);

    this.dialogDisplayModes = {
      Chat: 0,
      Shop: 1,
      ConversationHistory: 2,
      Sell: 3,
    };
    this.dialogDisplayModesList = [
      "Chat",
      "Trade",
      "Conversation History",
      "Sell",
    ];
    this.dialogDisplayMode = 0;
    this.otherPlayerPos = { x: 1000 - 175 - 200, y: 250 - 200 };
    this.RenderOffset = { x: 0, y: 0 };
    this.tradeItemSelected = 1;
    this.GUIButton = new GUIButton(this);
  }

  getItemSelected() {
    return this.tradeItemSelected;
  }

  setItemSelected(s) {
    this.tradeItemSelected = s;
  }

  getDisplayMode() {
    return this.dialogDisplayMode;
  }

  setDisplayMode(dm) {
    this.dialogDisplayMode = dm;
    this.npcInventory = this.parent.findCharByNPCKey(this.parent.getNPCKey()).getInventory();
  }

  draw(p5) {
    let that = this;
    drawDialogBackground(); // draw bg img, player back of head, NPC, NPC Title
    this.RenderOffset.x = (p5.width - 1000) / 2;
    // draw convo
    if (this.getDisplayMode() === this.dialogDisplayModes.Chat) {
      drawChatBubbles();
      this.drawShopButton(p5);
      this.drawConversationHistoryButton(p5);
      if (this.parent.chatData.isProcessing) {
        drawIsAIProcessing();
      }
    } else if (this.getDisplayMode() === this.dialogDisplayModes.Shop) {
      this.drawBackButton(p5);
      this.renderViewTitle(p5);
      this.renderTradeGUI(p5);
    } else {
      // mode not current convo or shop
      this.drawBackButton(p5);
      this.renderViewTitle(p5);
    }

    if (this.getDisplayMode() === this.dialogDisplayModes.ConversationHistory) {
      drawConvoBubbles();
    }
    this.drawEndChatButton(p5);

    //this display action buttons
    //    this display action button sub menus
    //    this display chat sub panels

    function drawConvoBubbles() {
      p5.push();
      p5.textSize(18);
      const varData = that.parent.chatData.getConversations();
      console.log(varData);

      for (var i = 0; i < varData.length; i++) {
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
      p5.rect(
        that.RenderOffset.x + that.otherPlayerPos.x - 5,
        that.otherPlayerPos.y + 350,
        360,
        24
      );
      p5.fill("#ffffff");
      p5.stroke("#000000aa");
      p5.textSize(26);
      p5.text(
        that.parent.getNPCKey(),
        that.RenderOffset.x + that.otherPlayerPos.x + 350 / 2,
        that.otherPlayerPos.y + 350 + 10
      );
      p5.pop();
    }

    function drawNPC() {
      if (
        that.parent.characterProfileImages[
          that.parent.getNPCKey()
        ]
      ) {
        p5.image(
          that.parent.characterProfileImages[
            that.parent.getNPCKey()
          ],
          that.otherPlayerPos.x + that.RenderOffset.x,
          that.otherPlayerPos.y,
          350,
          350
        );
      }
    }

    function drawPlayer() {
      p5.image(
        that.parent.parentAssets["GameMapScene"]["PlayerBackHeadImage"],
        that.RenderOffset.x + 50,
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
          that.RenderOffset.x - 12,
          -250
        );
      }

      // draw backdrop
      drawPlayer(); // Draw Player Back of Head
      drawNPC(); // Draw Other Player Profile Image
      drawNPCNameBanner();
    }

    function drawIsAIProcessing() {
      p5.push();
      p5.fill("#00ffff77");
      p5.rect(p5.width * 0.3, p5.height * 0.75, p5.width * 0.4, 60);
      p5.noStroke();
      p5.fill("#ffffffdd");
      p5.text(
        that.parent.chatData["incomingMessage"]["text"],
        p5.width * 0.3,
        p5.height * 0.75,
        p5.width * 0.4,
        60
      );
      p5.pop();
    }
  }

  renderTradeGUI(p5) {
    const textSize = 34;
    const rowBottomPadding = 13;
    const rowHeight = textSize+rowBottomPadding;
    const colWidth = 30;
    const pos = {
      x: 300,
      y: 100,
      w: p5.width - 300 * 2,
      h: p5.height - 150 * 2,
    };
    // bg
    p5.fill("#aaaaaaaa");
    p5.rect(pos.x, pos.y, pos.w, pos.h);

    p5.fill("#ffffff");
    p5.textSize(textSize);
    //p5.text("Items",pos.x+30*2,pos.y+rowHeight-10);
    p5.text(
      "Item Detail",
      pos.x + colWidth * 3 + pos.w / 2 + 15,
      pos.y + rowHeight - 10
    );

    p5.textSize(24);
    //let combinedInventoryList = [...this.parent.playerInventory.getItemsList(), ...this.npcInventory.getItemsList()];
    let combinedInventoryList = Object.keys(absorb(this.parent.playerInventory.getItems(), this.npcInventory.getItems()));
    this.renderTradeItemRow(p5, ["Item", "You", "Them"], 0, pos, rowHeight, -1);
    this.drawEachTradeItemRow(combinedInventoryList, p5, pos, rowHeight);

    // right side details
    p5.fill("#aaaaaaaa");
    p5.rect(pos.x + pos.w / 2, pos.y, pos.w / 2, pos.h);

    p5.fill("#ffffff");
    let padding = 125;
    p5.image(
      this.parent.parentAssets["GameMapScene"][ItemsEnum[combinedInventoryList[this.tradeItemSelected - 1]].details.img],
      pos.x + pos.w / 2 + padding / 2,
      pos.y + padding / 2,
      pos.w / 2 - padding,
      pos.w / 2 - padding
    );
    p5.text(
      ItemsEnum[combinedInventoryList[this.tradeItemSelected - 1]].icon.join() +
        ItemsEnum[combinedInventoryList[this.tradeItemSelected - 1]].name,
      pos.x + pos.w / 2 + padding / 2 + 50,
      pos.y + padding / 2 + pos.w / 2 - padding + 15
    );
    //description
    p5.text(
      ItemsEnum[combinedInventoryList[this.tradeItemSelected - 1]].description,
      pos.x + pos.w / 2 + padding / 2 + 30,
      pos.y + padding / 2 + pos.w / 2 - padding + 30,

      pos.w / 2 - padding,
      pos.h *.25,
    );
    
    this.renderTradeGUIRightPanelActionRow(p5, combinedInventoryList, pos);
  }

  getSelectedItem(combinedInventoryList) {
    return ItemsEnum[combinedInventoryList[this.tradeItemSelected - 1]];
  }


  renderTradeGUIRightPanelActionRow(p5, combinedInventoryList, pos) {
    const selectedItem = this.getSelectedItem(combinedInventoryList);

    const tryBuyFN = () => {
      if (this.npcInventory.getItemCount(selectedItem) > 0) {
        this.performTransaction(
          this.parent.playerInventory,
          this.npcInventory,
          selectedItem,
          selectedItem.details.props.buyPrice
        );
      }
    };

    const trySellFN = () => {
      if (this.parent.playerInventory.getItemCount(selectedItem) > 0) {
        this.performTransaction(
          this.npcInventory,
          this.parent.playerInventory,
          selectedItem,
          selectedItem.details.props.salePrice
        );
      }
    };

    this.drawTradeButton(p5, pos, "Buy", selectedItem.details.props.buyPrice, tryBuyFN, 0);
    this.drawTradeButton(p5, pos, "Sell", selectedItem.details.props.salePrice, trySellFN, 1);
  }

  performTransaction(buyer, seller, item, price) {
    buyer.setCash(buyer.getCash() - price);
    seller.setCash(seller.getCash() + price);
    buyer.addItem(item);
    seller.removeItem(item);
  }

  drawTradeButton(p5, pos, action, price, onClickHandle, offset) {
    const buttonWidth = pos.w / 4 - 10;
    const buttonX = pos.x + pos.w / 2 + (offset * (buttonWidth + 20));
    const buttonY = pos.y + pos.h - 30;

    this.GUIButton.draw(
      p5,
      {
        text: `${action} ($${price})`,
        onClickHandle: onClickHandle,
      },
      buttonX,
      buttonY,
      buttonWidth,
      30
    );
  }

  drawEachTradeItemRow(combinedInventoryList, p5, pos, rowHeight) {
    for (let index = 1; index <= combinedInventoryList.length; index++) {
      const itemName = ItemsEnum[combinedInventoryList[index - 1]].icon.join() +
        " " +
        ItemsEnum[combinedInventoryList[index - 1]].name;
      // todo load real items
      this.renderTradeItemRow(
        p5,
        [
          itemName,
          this.parent.playerInventory.getItemCount(ItemsEnum[combinedInventoryList[index - 1]]) || 0,
          this.npcInventory.getItemCount(ItemsEnum[combinedInventoryList[index - 1]]) || 0,
        ],
        index,
        {x:pos.x+30,y:pos.y,w:pos.w, h:pos.h},
        rowHeight,
        1
      );
    }
  }

  renderTradeItemRow(p5, values, row, pos, rowHeight, isBtn) {
    isBtn = isBtn > 0;
    p5.push();

    // set fill
    p5.fill(row === 0 ? "#ffffff00" : "#44444455");
    if (this.getItemSelected() === row) {
      p5.fill("#444444ff");
    }

    // row background
    p5.rect(pos.x + 10, pos.y + rowHeight * row + 10, pos.w / 2 - 70, 34);
 
    p5.fill("#ffffff");
    p5.textSize(row === 0 ? 20 : 16);
    // row cells
    p5.textAlign("LEFT","BOTTOM");
    p5.text(values[0], pos.x + 30 * 4, pos.y + 34 + rowHeight * row);
    p5.textSize(row === 0 ? 16 : 13);
    
    p5.textAlign("CENTER","BOTTOM");
    p5.text(values[1], pos.x + 30 * 10, pos.y + 34 + rowHeight * row);
    p5.text(values[2], pos.x + 30 * 12, pos.y + 34 + rowHeight * row);
    
    // if not header row, create button
    // button is invis via fill/textColor opacity to handle clicks but not display
    if (row > 0)
      this.GUIButton.draw(
        p5,
        {
          text: values[0],
          fill: "#00000000",
          textfill: "#00000000",
          onClickHandle: () => {
            this.setItemSelected(row);
          },
        },
        pos.x,
        pos.y + 15 + rowHeight * row,
        pos.w / 1.9,
        30
      );
    p5.pop();
  }

  renderViewTitle(p5) {
    const titleTxt = this.dialogDisplayModesList[this.dialogDisplayMode];
    const txtX = 250 + p5.textWidth(titleTxt) / 2;
    p5.push();
    p5.fill("#aaaaff88");
    p5.rect(txtX, 60 - 18 - 3, (txtX - 250) * 6, 45);
    p5.textSize(36);
    p5.fill("#ffffff");
    p5.text(titleTxt, txtX + (txtX - 250) * 3, 60);
    p5.pop();
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
    const isMouseOver =
      p5.mouseX > rectDimensions.x &&
      p5.mouseX < rectDimensions.x + rectDimensions.w &&
      p5.mouseY > rectDimensions.y &&
      p5.mouseY < rectDimensions.y + rectDimensions.h;
    // 0123456789abcdef
    const opacityMap = ["dd", "bb", "99", "77", "55", "33"];
    const trans = isMouseOver
      ? "ff"
      : opacityMap[Math.min(opacityMap.length - 1, Math.abs(seq))] || "cc";

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
        rectDimensions.getWidth(0.5),
        rectDimensions.h
      );
    }

    function drawBubbleBG() {
      p5.fill(
        senderName === "EllieTupee" ? "#aaffFF" + trans : "#aaaaff" + trans
      );
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
    p5.text("Trade", pos.x, pos.y, dim.x, dim.y);
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

  drawRelationshipGraph(p5, pct, pos, dim) {
    p5.push();
    p5.fill("#cccccc");
    p5.rect(pos.x + dim.x*.1, pos.y+dim.y*.65, dim.x*.8, dim.y*.1);
    p5.fill(pct<=.5 ? "#ff0000" : "#00ff00");
    p5.rect(pos.x + dim.x*.1 + (dim.x*.8)/2, pos.y+dim.y*.65, dim.x*(pct/2), dim.y*.1);
    p5.pop();
  }

  drawConversationHistoryButton(p5) {
    const pos = p5.createVector(35, this.otherPlayerPos.y + 80 * 2 - 30);
    const dim = p5.createVector(150, 70);
    p5.fill("#222222ee");
    p5.stroke("#666666ee");
    p5.rect(pos.x, pos.y, dim.x, dim.y);
    p5.noStroke();
    p5.fill("#ffffff");
    p5.text("Chat History", pos.x, pos.y, dim.x, dim.y);
    this.drawRelationshipGraph(p5,.3, pos, dim);
    this.parent.handleTargetClick(p5, pos.x, pos.y, dim.x, dim.y, () => {
      this.setDisplayMode(2);
    });
  }
}

export default GameDialogScene;
