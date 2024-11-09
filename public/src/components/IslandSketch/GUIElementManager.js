import { IslandTemplate } from "../../utils/IslandTemplateTile";
import { ItemsEnum } from "./ItemsEnum";

export class GUIElementManager {
  constructor(parent, imgAssets) {
    this.parent = parent;
    this.imageAssets = imgAssets || { imgKey: null };
    this.SimulationDateTime = { time: "", date: "" };
    this.GUIElements = [];
    this.AlertWindowText = { title: "alert", text: "Message" };
    this.AlertWindowNPCKey = "AndiMcNuttly";
    this.alertWindowIsOpen = false;
    this.allowMoveInputKeys = true;
    this.displayMode = 0;

    this.mainPanelViewTypes = ["Inventory", "Chat"];
    this.mainPanelViewTypeID = 0;
    this.mainPanelViewType = this.mainPanelViewTypes[this.mainPanelViewTypeID];

    this.BGKey = 'BGDocks';

    this.initializeGUIElements();
    this.chatInput = undefined;
    this.chatSubmit = undefined;
  }

  toggleMainPanelViewType(){
    this.mainPanelViewTypeID = this.mainPanelViewTypeID++ % this.mainPanelViewTypes.length;
    this.mainPanelViewType = this.mainPanelViewTypes[this.mainPanelViewTypeID];
  }

  setSimulationDateTime({ time, date }) {
    if (time) this.SimulationDateTime.time = time;
    if (date) this.SimulationDateTime.date = date;
  }

  openAlert(title, text, details = {}) {
    this.setAlertWindow(true);
    this.AlertWindowText = { title: title || "alert", text: text || "Message" };
    this.LotDetails = details;
    if (details.NPCKey) this.AlertWindowNPCKey = details.NPCKey;
    if (details.BGKey) this.BGKey = details.BGKey;
  }

  closeAlert() {
    this.setAlertWindow(false);
    this.AlertWindowText = { title: "alert", text: "Message" };
  }

  setAlertWindow(isOpen) {
    this.alertWindowIsOpen = isOpen;
    if(isOpen){
      this.allowMoveInputKeys = false;
    }else{ 
      this.allowMoveInputKeys = true;
    }
  }

  initializeGUIElements() {
    this.GUIElements = IslandTemplate.GUIElements;
    this.GUIElements[1].img = this.parent.PlayerProfileImage;
    this.GUIElements[3].actions = [
      { text: "Continue", fill: "#63aff3", onClickHandle: this.transitionToDialogView.bind(this) },
      { text: "Cancel", fill: "#666", onClickHandle: this.closeAlert.bind(this) }
    ];
  }

  setDisplayMode(dm){
    if(dm===0 && this.chatInput){
      this.parent.chatData.closeConversation();
      this.chatInput.hide();
      this.chatSubmit.hide();
    }else if(this.chatInput){
      this.chatInput.show();
      this.chatSubmit.show();
    }

    if(dm !== 0){
      this.parent.chatData.openConversation(this.parent.chatData.convertNPCKeyToID(this.AlertWindowNPCKey));
    }

    this.displayMode = dm;
  }

  getDisplayMode(){
    return this.displayMode;
  }

  transitionToDialogView() {
    this.closeAlert();
    this.setDisplayMode(1);
  }

  renderGUI(p5) {
    p5.image(this.parent.GameMapSceneUI, 0, 576);
    this.GUIElements.forEach((el) => {
      p5.fill(el.fill || 200);
      this.renderElement(p5, el);
    });
  }

  renderElement(p5, el) {
    switch (el.GUIType) {
      case "AlertWindow":
        if (this.alertWindowIsOpen) this.renderAlertWindow(p5, el);
        break;
      case "PlayerProfileImageCirclePanel":
        this.renderPlayerProfilePanel(p5, el);
        break;
      default:
        this.renderDefaultPanel(p5, el);
    }
  }

  renderAlertWindow(p5, el) {
    p5.rect(el.x || 0, el.y || 0, el.w || 0, el.h || 0);
    p5.fill(100);
    p5.rect(el.x, el.y, el.w, 24);
    p5.fill(200);
    p5.text(this.AlertWindowText.title || "Panel", el.x, el.y, el.w, 24);
    this.renderAlertWindowBody(p5, el);
    this.renderAlertWindowButtons(p5, el);
  }

  renderAlertWindowBody(p5, el) {
    const { x, y, w, h } = el;
    p5.push();
    p5.fill(0);
    p5.textAlign("LEFT", "TOP");
    p5.text(this.AlertWindowText.text || "Msg", x + p5.textWidth(this.AlertWindowText.text) / 2 + 10, y + 39, w, h);
    p5.pop();

    const npcImage = this.parent.characterProfileImages[this.AlertWindowNPCKey];
    if (npcImage) {
      p5.image(npcImage, 570, 350, 125, 125);
    } else {
      this.parent.characterProfileImages[this.AlertWindowNPCKey] = p5.loadImage(
        `images/CharacterProfileImages/${this.AlertWindowNPCKey}.png`
      );
    }
  }

  renderAlertWindowButtons(p5, el) {
    el.actions.forEach((action, i) => {
      const buttonX = el.x + el.w - 175 * (i + 1);
      const buttonY = el.y + el.h - 12;
      this.renderButton(p5, action, buttonX, buttonY, 150, 24);
    });
  }

  renderButton(p5, action, x, y, w, h) {
    p5.push();
    p5.fill(action.fill || 65);
    p5.rect(x, y, w, h);
    p5.fill(225);
    p5.text(action.text, x, y, w, h);
    this.parent.handleTargetClick(p5, x, y, w, h, action.onClickHandle);
    p5.pop();
  }

  renderPlayerProfilePanel(p5, el) {
    const textLocation = { x: el.x, y: el.y + el.h * 0.75 };
    const textDimensions = { width: el.w, height: el.h * 0.25 };
    p5.image(this.parent.PlayerProfileImage, el.x + el.w * 0.1, el.y + el.h * 0.05, el.w * 0.8, el.h * 0.8);
    p5.image(this.parent.GameMapSceneUIBanner, 4, 753);
    this.renderPanelText(p5, el, textLocation, textDimensions);
  }

  renderDefaultPanel(p5, el) {
    const padding = 25, spacing = 13, size = 32, cols = 12;
    if (el.PanelType === "Detail") {
      this.renderSimulationDate(p5, el);
    } else {
      if(this.getDisplayMode()===0){
        this.renderInventoryView(p5, el, cols, padding, spacing, size);
      }else{
        this.renderChatInputView(p5);
      }
    }
    this.renderPanelText(p5, el);
  }

  renderInventoryView(p5, el, cols, padding, spacing, size){
    for (let i = 0; i < cols; i++) {
      this.renderInventorySlot(p5, el, i, padding, spacing, size);
    }
  }

  renderChatInputView(p5){
    if(!this.chatInput || !this.chatSubmit){
      this.chatInput = p5.createInput();
      this.chatSubmit = p5.createButton("Send");
      this.chatInput.attribute('placeholder', 'Chat here.....');
      this.chatSubmit.size(p5.width/6);
      this.chatInput.size(p5.width/2);
      this.chatSubmit.position(p5.width, p5.height*.95);
      this.chatInput.position(p5.width/2+p5.width/6, p5.height*.92);
      this.chatSubmit.mousePressed(()=>{
        this.parent.chatData.addChat({text:this.chatInput.value()},1);
        this.chatInput.value("");
      });
    }
  }

  renderSimulationDate(p5, el) {
    const { time, date } = this.SimulationDateTime;
    const textY = el.y + el.h - 65;
    p5.text(time, el.x, textY, el.w, 55);
    p5.text(date, el.x, textY - 25, el.w, 55);
  }

  renderInventorySlot(p5, el, index, padding, spacing, size) {
    const x = el.x + padding + (size + spacing) * index;
    const y = el.y + padding;
    p5.rect(x, y, size, size);
    p5.push();
    p5.fill(index === 0 ? "#999999" : "white");
    if (index === 0) {
      this.renderInventoryIcon(p5, "🥅", x, y, "crabtrap");
    } else if (index === 1) {
      this.renderInventoryIcon(p5, "🥪", x, y, "hermitcrab");
    }
    p5.pop();
  }

  renderInventoryIcon(p5, icon, x, y, itemKey) {
    p5.text(icon, x + 16, y + 16);
    p5.text(this.parent.playerInventory.getItemCount(ItemsEnum[itemKey]), x + 32, y + 32);
  }

  renderPanelText(p5, el, location = { x: el.x, y: el.y }, dimensions = { width: el.w, height: el.h }) {
    p5.fill(255);
    p5.textStyle("Bold");
    p5.text(el.text || "Panel", location.x, location.y, dimensions.width, dimensions.height);
  }

  renderDialogActions(){
    // display dialog options
    if(this.LotDetails.actionOptions.length>0){
      // render act options
    }
  }
}
