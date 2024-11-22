import { ItemsEnum } from '../ConfigurationData/ItemsEnum';
import Entity from './Entity';

class CrabTrapEntity extends Entity {
  constructor(parent, id, x, y, time, frame, callback) {
    super('CrabTrap', id, { x, y }, { width: 32, height: 32 });
    this.parent = parent;
    this.frameInit = frame;
    this.randomOffset = Math.floor(Math.random()*25);
    this.castDateTime = time;//now
    this.fillColor = '#ffffff';
    this.trapStates = ["recentlyCast","ready","invalid"];
    this.trapState = 0;
    this.harvestCallback = callback;

    this.frameAge = -1;
  }

  update(p5, offset, scal) {
    // Implement any update logic specific
    this.frameAge = p5.frameCount-this.frameInit;
    if(this.trapState === 0 && this.frameAge > (15+this.randomOffset)*50){
      this.trapState = 1;
      this.fillColor = '#ff0000';
    }
    if(this.trapState === 1 && p5.mouseIsPressed && this.isMouseOver(p5,offset,scal)){
      this.doUIAction(p5.frameCount, ()=>(this.harvest()));
    }
  }

  draw(p5, transparency, offset, scal) {
    offset = offset || {x:0,y:0};
    const ps = p5.createVector(this.location.x, this.location.y);
    let fillColor = this.fillColor || '#000000';
    p5.fill(fillColor);
    if(this.trapState < 2){
      const yOffsetAnimation = (50-(p5.frameCount+this.randomOffset)%100)/30;
      p5.ellipse(ps.x, ps.y+yOffsetAnimation, 10, 6);

      if (this.isMouseOver(p5,offset,scal) || super.isSelected()) {
        p5.fill(`${fillColor}ff`);
        p5.stroke('#ffffffaa');
        const label = "CrapTrap";
        p5.text(label, ps.x, ps.y);
      }  
    }
    
    p5.fill(`#000000${transparency}`);
    p5.stroke(`#ffffff${transparency}`);
  }

  harvest(){
    this.fillColor = "#00ff00";
    this.trapState = 2;
    //this.frameAge;
    const randSelect = Math.random();
    if(randSelect<.1){
      this.harvestCallback(ItemsEnum['kingcrab']);
    }
    if(randSelect < .4 && randSelect >= .1){
      this.harvestCallback(ItemsEnum['dungenesscrab']);
    }
    if(randSelect<.7 && randSelect >= .4){
      this.harvestCallback(ItemsEnum['snowcrab']);
    }
    if(randSelect>.9 && randSelect>=.7){
      this.harvestCallback(ItemsEnum['redrockcrab']);
    }
    if(randSelect>=.9){
      this.harvestCallback(ItemsEnum['hermitcrab']);
    }
  }
}

export default CrabTrapEntity;