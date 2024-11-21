import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import { ItemsEnum } from "../ConfigurationData/ItemsEnum";
import GUIAlertWindow from "../GUI/GUIAlertWindow";
import GUIButton from "../GUI/GUIButton";
import SimulationTime from "../../../utils/SimulationTime";

const SIMTIME = SimulationTime.getInstance();

export class GUIElementManager {
  constructor(parent, imgAssets) {
    this.parent = parent; // Ref to Scene Parent (Game Map Scene)
    this.RenderOffset = {x:(this.parent.sizeVector.x-1000)/4,y:50};
    this.imageAssets = imgAssets || { imgKey: null };
    this.GUIButton = new GUIButton(this.parent);
    this.SimulationDateTime = { time: "", date: "" };
    this.GUIElements = []; 

    this.AlertWindow = new GUIAlertWindow(this.parent); // Pass Ref to Scene Parent (Game Map Scene)

    this.allowMoveInputKeys = true;
    this.displayMode = 0;

    this.mainPanelViewTypes = ["Inventory", "Chat"];
    this.mainPanelViewTypeID = 0;
    this.mainPanelViewType = this.mainPanelViewTypes[this.mainPanelViewTypeID];

    this.BGKey = 'BGDocks';

    this.initializeGUIElements();
  }

  getNPCKey(){
    return this.AlertWindow.getNPCKey();
  }

  toggleMainPanelViewType(){
    this.mainPanelViewTypeID = this.mainPanelViewTypeID++ % this.mainPanelViewTypes.length;
    this.mainPanelViewType = this.mainPanelViewTypes[this.mainPanelViewTypeID];
  }

  setSimulationDateTime({ time, date }) {
    if (time) this.SimulationDateTime.time = time;
    if (date) this.SimulationDateTime.date = date;
  }

  setTimeMode(val){
    if(val === 0){
      this.allowMoveInputKeys = false;
    }else if(val >= 1){
      if(!this.AlertWindow.isOpen()){
        this.allowMoveInputKeys = true;
      }
    }
    SIMTIME.rateOfTime = val;
  }

  openAlert(title, text, details = {}) {
    this.setAlertWindow(true);
    this.AlertWindow.setText(title || "alert", text || "Message");
    this.LotDetails = details;
    this.AlertWindow.setDetails(details);
    
    if (details.NPCKey) this.AlertWindow.setNPCKey(details.NPCKey);
    if (details.BGKey) this.BGKey = details.BGKey;
  }

  closeAlert() {
    this.setAlertWindow(false);
    this.AlertWindow.setText("alert","Message");
  }

  setAlertWindow(isOpen) {
    this.AlertWindow.setIsOpen(isOpen);
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

    this.GUIElements.forEach((v,i,a)=>{
      this.GUIElements[i].x += this.RenderOffset.x;
      this.GUIElements[i].y += this.RenderOffset.y;
    });
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
      this.parent.chatData.openConversation(this.parent.chatData.convertNPCKeyToID(this.AlertWindow.getNPCKey()));
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
    p5.push();
    p5.image(this.parent.GameMapSceneUI, this.RenderOffset.x, 576+this.RenderOffset.y);
    this.GUIElements.forEach((el) => {
      p5.fill(el.fill || 200);
      this.renderElement(p5, el);
    });
    p5.pop();
  }

  renderElement(p5, el) {
    switch (el.GUIType) {
      case "AlertWindow":
        if (this.AlertWindow.isOpen()) this.AlertWindow.draw(p5, el);
        break;
      case "PlayerProfileImageCirclePanel":
        this.renderPlayerProfilePanel(p5, el);
        break;
      default:
        this.renderDefaultPanel(p5, el);
    }
  }

  renderPlayerProfilePanel(p5, el) {
    const textLocation = { x: el.x, y: el.y + el.h * 0.75 };
    const textDimensions = { width: el.w, height: el.h * 0.25 };
    p5.image(this.parent.PlayerProfileImage, el.x + el.w * 0.1, el.y + el.h * 0.05 - 18, el.w * 0.8, el.h * 0.8);
    p5.image(this.parent.GameMapSceneUIBanner, el.x + 4, el.y + el.h - 40 - 10); // 40 is height of img // 10 is offset
    this.renderPanelText(p5, el, textLocation, textDimensions);
  }

  renderDefaultPanel(p5, el) {
    const padding = 25, spacing = 13, size = 32, cols = 12;
    if (el.PanelType === "Detail") {
      this.renderSimulationDate(p5, el);
      p5.text("$"+this.getInventory().getCash(),el.x+ 60,el.y+75);
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
      this.chatInput.size(p5.width/3);
      this.chatSubmit.position(p5.width/2, p5.height*.92);
      this.chatInput.position(p5.width/3, p5.height*.89);

      window.addEventListener("keyup", (e)=>this.keyReleased(e,()=>this.chatInput.value(),()=>this.submitMsg(this)));
      this.chatSubmit.mousePressed(()=>{this.submitMsg(this);});
    }
  }

  renderSimulationDate(p5, el) {
    const { time, date } = this.SimulationDateTime;
    const textY = el.y + el.h - 65;
    p5.text(time, el.x, textY - 13, el.w, 55);
    p5.text(date, el.x, textY - 30, el.w, 55);
    this.GUIButton.draw(p5, { text: "||", fill: SIMTIME.rateOfTime === 0 ? "red" : "#63aff3", onClickHandle: ()=>{return this.setTimeMode(0)}}, el.x + 5 + 60, el.y +160, 15, 15);
    this.GUIButton.draw(p5, { text: "1x", fill: SIMTIME.rateOfTime === 1 ? "red" : "#63aff3", onClickHandle: ()=>{return this.setTimeMode(1)}}, el.x + 60 + 5*2 + 15*1, el.y+160, 15, 15);
    this.GUIButton.draw(p5, { text: "2x", fill: SIMTIME.rateOfTime === 2 ? "red" : "#63aff3", onClickHandle: ()=>{return this.setTimeMode(2)}}, el.x + 60 + 5*3 + 15*2, el.y+160, 15, 15);
    this.GUIButton.draw(p5, { text: "3x", fill: SIMTIME.rateOfTime === 3 ? "red" : "#63aff3", onClickHandle: ()=>{return this.setTimeMode(3)}}, el.x + 60 + 5*4 + 15*3, el.y+160, 15, 15);
  
  }

  renderInventorySlot(p5, el, index, padding, spacing, size) {
    const x = el.x + padding + (size + spacing) * index;
    const y = el.y + padding + 15;
    p5.rect(x, y, size, size);
    p5.push();
    p5.fill(index === 0 ? "#999999" : "white");
    if(index < this.getInventory().getItemsArray().length){
      let dataTmp = this.getInventory().getItemsArray()[index];
      console.log(dataTmp);
      this.renderInventoryIcon(p5, dataTmp, x, y, dataTmp.data.name);
    }
    p5.pop();
  }

  getInventory(){
    return this.parent.playerInventory;
  }

  renderInventoryIcon(p5, data, x, y, itemKey) {
    let icon = data.data.icon || [];
    p5.text((icon[0] || icon), x + 16, y + 16);
    p5.text((icon[1] || ""), x + 20, y + 20);
    p5.text(this.getInventory().getItemCount(ItemsEnum[itemKey]), x + 32, y + 32);
  }

  renderPanelText(p5, el, location = { x: el.x, y: el.y }, dimensions = { width: el.w, height: el.h }) {
    p5.push();
    p5.fill(255);
    p5.textStyle("Bold");
    p5.textAlign("CENTER", "TOP");
    p5.textStyle("BOLD");
    p5.textSize(21);
    p5.text(el.text || "Panel", location.x + dimensions.width/2, location.y + 18, dimensions.width, dimensions.height);
    p5.pop();
  }

  renderDialogActions(){
    // display dialog options
    if(this.LotDetails.actionOptions.length>0){
      // render act options
    }
  }
  
  // on submit chat data
  submitMsg(that) {
    that.parent.chatData.addChat({ text: that.chatInput.value() }, 1);
    that.chatInput.value("");
  }

  keyReleased(e,val,callback) {
    e.preventDefault(); // Cancel the native event
    if (val().length > 0 && e.code === "Enter") {
      callback();
    }
    e.stopPropagation(); // Don't bubble/capture the event any further
  }
}
