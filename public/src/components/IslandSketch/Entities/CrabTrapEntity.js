import { ItemsEnum } from '../ConfigurationData/ItemsEnum';
import Entity from './Entity';

class CrabTrapEntity extends Entity {
  constructor(parent, id, x, y, time, frame, callback, harvestCallback) {
    super('CrabTrap', id, { x, y }, { width: 32, height: 32 });
    this.parent = parent;
    this.frameInit = frame;
    this.randomOffset = Math.floor(Math.random()*25);
    this.castDateTime = time; //now
    this.fillColor = '#ffffff';
    this.trapStates = ["recentlyCast","ready","invalid"];
    this.trapState = 0;
    this.catchCallback = callback;
    this.harvestCallback = harvestCallback;
    this.radius = 150;

    this.frameAge = -1;
  }
 update(p5, offset, scal) {
   // Implement any update logic specific
    this.progessStateChange(p5.frameCount);

   // Check if player is within 400 pixels of the crab trap
   const playerPosition = this.parent.playerControl.location;
   const distanceToPlayer = p5.dist(this.location.x, this.location.y, playerPosition.x, playerPosition.y);
   const isPlayerInRange = distanceToPlayer <= 80;
   const mousePressedAndOver = p5.mouseIsPressed && this.isMouseOver(p5, offset, scal);
   if(mousePressedAndOver) console.log("distanceToPlayer: " + distanceToPlayer);

   this.determineFillColor(isPlayerInRange);

   // mouse pressed and hovered over trap with state of 1:ready
   this.checkHarvest(mousePressedAndOver, isPlayerInRange, p5);
 }

  checkHarvest(mousePressedAndOver, isPlayerInRange, p5) {
    const shouldAllowHarvest = this.trapState === 1 && mousePressedAndOver && isPlayerInRange;
    if (shouldAllowHarvest) {
      this.doUIAction(p5.frameCount, () => this.harvest(p5));
    }
  }

  determineFillColor(isPlayerInRange) {
    if (this.trapState === 1) {
      this.fillColor = isPlayerInRange ? '#ff0000' : '#550000';
    } else {
      const colorList = ['#ffffff', '#550000', '#ff00ff'];
      this.fillColor = colorList[this.trapState];
    }
  }

 progessStateChange(frame){
  this.frameAge = frame - this.frameInit;
   if (this.trapState === 0 && this.frameAge > (15 + this.randomOffset) * 50) {
     this.trapState = 1;
   }
 }


  draw(p5, transparency, offset, scal) {
    offset = offset || {x:0,y:0};
    p5.push();
    const ps = p5.createVector(this.location.x, this.location.y);
    let fillColor = this.fillColor || '#000000';
    p5.fill(fillColor);
    p5.stroke("#fffff");
    if(this.trapState < 2){
      const yOffsetAnimation = (50-(p5.frameCount+this.randomOffset)%100)/30;
      //p5.ellipse(ps.x, ps.y+yOffsetAnimation, 10, 6);
      p5.image(this.parent.parentAssets.GameMapScene.Buoy,ps.x, ps.y+yOffsetAnimation, 12, 12);
      if (this.isMouseOver(p5,offset,scal) || super.isSelected()) {
        p5.textSize(10);
        p5.strokeWeight(0)
        p5.fill(`${fillColor}ff`);
        p5.stroke('#ffffffaa');
        const label = "CrapTrap";
        p5.text(label, ps.x, ps.y);
      }  
    }
    
    p5.fill(`#000000${transparency}`);
    p5.stroke(`#ffffff${transparency}`);
    p5.pop();
  }

  trapsInRange(p5) {
    const fltrFunc = e=> {
      return e.name === "CrabTrapEntity"
      && p5.dist(e.location.x,e.location.y,this.location.x,this.location.y) < this.radius;
    }
    return this.parent.CrabTraps.filter(fltrFunc);
  }

  /**
   * Handles the harvest action for the crab trap entity.
   *
   * @param {p5} p5 - The p5.js instance for drawing and calculations.
   *
   * @returns {void}
   */
  harvest(p5){
    // TODO: Socket Call to server to check player position in relation to trap FIXME:
    this.fillColor = "#00ff00";
    this.trapState = 2;
    const pctCatchChance = .3;

    const randDidCatch = Math.random() / (((this.trapsInRange(p5)).length) || 1);
    this.harvestCallback();

    if(randDidCatch>pctCatchChance){
      const randSelect = Math.random();
      if(randSelect<.1){
        this.catchCallback(ItemsEnum["Item7"]);
      }
      if(randSelect < .4 && randSelect >= .1){
        this.catchCallback(ItemsEnum["Item6"]);
      }
      if(randSelect<.7 && randSelect >= .4){
        this.catchCallback(ItemsEnum['Item5']);
      }
      if(randSelect>.9 && randSelect>=.7){
        this.catchCallback(ItemsEnum['Item4']);
      }
      if(randSelect>=.9){
        this.catchCallback(ItemsEnum['Item3']);
      }
    }
  }
}

export default CrabTrapEntity;