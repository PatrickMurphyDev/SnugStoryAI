import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import { ItemsEnum } from "../ConfigurationData/ItemsEnum";
import GUIAlertWindow from "../GUI/GUIAlertWindow";
import GUIButton from "../GUI/GUIButton";
import GUIPanel from "../GUI/GUIPanel";
import SimulationTime from "../../../utils/SimulationTime";

const SIMTIME = SimulationTime.getInstance();

export class GUIElementManager {
  constructor(parent, imgAssets) {
    this.parent = parent; // Ref to Scene Parent (Game Map Scene)
    this.OPTIONS = {"InputFontSize":20};
    this.RenderOffset = {x:(this.parent.sizeVector.x-1000)/4,y:0};
    this.imageAssets = imgAssets || { imgKey: null };
    this.GUIButton = new GUIButton(this.parent);
    this.GUIPanel = new GUIPanel(this);
    this.ItemsEnum = ItemsEnum;
    this.SimulationDateTime = { time: "", date: "" };
    this.GUIElements = []; 

    this.AlertWindow = new GUIAlertWindow(this.parent); // Pass Ref to Scene Parent (Game Map Scene)
    this.menuVisable = false;

    this.allowMoveInputKeys = true;
    this.displayMode = 0;

    this.mainPanelViewTypes = ["Inventory", "Chat"];
    this.mainPanelViewTypeID = 0;
    this.mainPanelViewType = this.mainPanelViewTypes[this.mainPanelViewTypeID];

    this.BGKey = 'BGDocks';

    this.initializeGUIElements();
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
    });
  }
  
  /* =================== ACTION METHODS & INPUT HANDLERS ===================*/
  openAlert(title, text, details = {}) {
    this.setAlertWindow(true);
    this.AlertWindow.setText(title || "alert", text || "Message");
    this.LotDetails = details;
    this.AlertWindow.setDetails(details);
    this.parent.chatData.addChat({"text": (details.msg || "")}, false);
    if (details.NPCKey) this.parent.setNPCKey(details.NPCKey);
    if (details.BGKey) this.BGKey = details.BGKey;
  }

  closeAlert() {
    this.setAlertWindow(false);
    this.AlertWindow.setText("alert","Message");
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

  toggleMenuVisibility() {
    this.menuVisable = !this.menuVisable;
  }

  toggleMainPanelViewType(){
    this.mainPanelViewTypeID = this.mainPanelViewTypeID++ % this.mainPanelViewTypes.length;
    this.mainPanelViewType = this.mainPanelViewTypes[this.mainPanelViewTypeID];
  }
  
  transitionToDialogView() {
    this.closeAlert();
    this.setDisplayMode(1);
  }
  /* =---------------= END ACTION METHODS & INPUT HANDLERS =---------------=*/

  getNPCKey(){
    return this.parent.getNPCKey();
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

  setAlertWindow(isOpen) {
    this.AlertWindow.setIsOpen(isOpen);
    if(isOpen){
      this.allowMoveInputKeys = false;
    }else{ 
      this.allowMoveInputKeys = true;
    }
  }

  setDisplayMode(dm){
    if(dm===0 && this.chatInput){ // REASON FOR PANEL TITLE NOT RIGHT FIRST SWITCH
      this.parent.chatData.closeConversation();
      this.chatInput.hide();
      this.chatSubmit.hide();
      this.GUIPanel.setPanelTitle(false);
    }else if(this.chatInput){
      this.chatInput.show();
      this.chatSubmit.show();
      this.GUIPanel.setPanelTitle("Chat");
    }

    if(dm !== 0){
      this.parent.chatData.openConversation(this.parent.chatData.convertNPCKeyToID(this.parent.getNPCKey()));
    }
    this.displayMode = dm;
  }

  getDisplayMode(){
    return this.displayMode;
  }

  getInventory(){
    return this.parent.playerInventory;
  }


  /* =================== RENDER & DRAW ===================*/
  renderGUI(p5, socketController) {
    p5.push();
    if(this.menuVisable){
      p5.fill('#ff0000');
      p5.rect(0,0,p5.width,p5.height);
      //    p5.image(this.parent.)
    }
    p5.image(this.parent.GameMapSceneUI, this.RenderOffset.x, p5.height-224);
    this.GUIElements.forEach((el) => {
      p5.fill(el.fill || 200);
      const tempEl = el;
      if(tempEl.y < 0)
        tempEl.y += p5.height;
      this.renderElement(p5, tempEl, socketController);
    });
    p5.pop();
  }

  renderElement(p5, el, socketController) {
    switch (el.GUIType) {
      case "AlertWindow":
        if (this.AlertWindow.isOpen()) this.AlertWindow.draw(p5, el);
        break;
      case "PlayerProfileImageCirclePanel":
        this.GUIPanel.draw(p5, { ...el, PanelType: "PlayerProfile" }, socketController);
        break;
      default:
        this.GUIPanel.draw(p5, el, socketController);
    }
  }
  renderChatInputView(p5){
    if(!this.chatInput && !this.chatSubmit){
      this.chatInput = p5.createInput();
      this.chatInput.attribute('placeholder', 'Chat here.....');
      this.chatInput.size(p5.width/3);
      this.chatInput.style("font-size", this.OPTIONS["InputFontSize"] + "px");
      this.chatInput.position(p5.width/3, p5.height*.89);
      window.addEventListener("keyup", (e)=>this.keyReleased(e,()=>this.chatInput.value(),()=>this.submitMsg(this)));

      this.chatSubmit = p5.createButton("Send");
      this.chatSubmit.size(p5.width/6);
      this.chatSubmit.position(p5.width/2, p5.height*.92);
      this.chatSubmit.mousePressed(()=>{this.submitMsg(this);});
    }
  }

  renderDialogActions(){
    // display dialog options
    if(this.LotDetails.actionOptions.length>0){
      // render act options
    }
  }
  /* =-------------------= End Render / Draw =-------------------= */
}
