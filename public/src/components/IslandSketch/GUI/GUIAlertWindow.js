import GUIButton from "./GUIButton";

class GUIAlertWindow {
  constructor(parentScene, guiManager) {
    this.parentSceneRef = parentScene;
    this.GUIManager = guiManager;
    this.details = {};
    this.AlertWindowText = { title: "alert", text: "Message" };
    this.AlertWindowNPCKey = "Andi McNuttly";
    this.alertWindowIsOpen = false;
    this.buttonElement = new GUIButton(this.parentSceneRef,this.GUIManager); // pass scene ref to button
  }
  
  setDetails(d){
    this.details = d;
  }

  getDetails(){
    return this.details;
  }

  getAlertWindowText(){
    return this.AlertWindowText;
  }

  setAlertWindowText(title,text){
    this.AlertWindowText = { title: title, text: text };
  }

  setText(title,text){
    this.AlertWindowText = { title: title, text: text };
  }

  getNPCKey(){
    return this.AlertWindowNPCKey;
  }

  setNPCKey(key){
    this.AlertWindowNPCKey = key;
  }

  isOpen(){
    return this.alertWindowIsOpen;
  }

  setIsOpen(openStatus){
    this.alertWindowIsOpen = openStatus;
  }

  draw(p5,el){
    this.renderAlertWindow(p5,el);
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
    p5.text(
      this.AlertWindowText.text || "Msg",
      x + p5.textWidth(this.AlertWindowText.text) / 2 + 10,
      y + 39,
      w,
      h
    );
    p5.pop();

    const npcImage = this.parentSceneRef.characterProfileImages[this.AlertWindowNPCKey];
    if (npcImage) {
      p5.image(npcImage, x + w - 125 - 15, y + 25, 125, 125);
    } else {
      this.parentSceneRef.characterProfileImages[this.AlertWindowNPCKey] = p5.loadImage(
        `images/CharacterProfileImages/${this.AlertWindowNPCKey}.png`
      );
    }
  }

  renderAlertWindowButtons(p5, el) {
    if(this.getDetails().hasOwnProperty("actions")){
      for(var jID = 0; jID < this.getDetails()["actions"].length; jID ++){
        const buttonX = el.x + el.w - 175 * (jID + 1);
        const buttonY = el.y + el.h - 12;
        let detailObj = this.getDetails()["actions"][jID];
        if(detailObj.hasOwnProperty('text') && detailObj.text === "Sleep"){
          detailObj.onClickHandle = ()=>{
            this.parentSceneRef.playerControl.setAsleep(true); 
            this.parentSceneRef.GUI.setAlertWindow(false);
          }
        }else{
          //detailObj.text = el.text;
          detailObj.onClickHandle = ()=>{this.setIsOpen(false);}
        }
        this.buttonElement.draw(p5, detailObj, buttonX, buttonY, 150, 24);
      }
    }else{
      el.actions.forEach((action, i) => {
        const buttonX = el.x + el.w - 175 * (i + 1);
        const buttonY = el.y + el.h - 12;
        this.buttonElement.draw(p5, action, buttonX, buttonY, 150, 24);
      });
    }
  }
}

export default GUIAlertWindow;
