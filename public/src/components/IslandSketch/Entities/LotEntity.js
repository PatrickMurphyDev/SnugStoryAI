import Entity from './Entity';

class LotEntity extends Entity {
  constructor(id, name, x, y, ldetails, characters = []) {
    super('lot', id, { x, y }, { width: 32, height: 32 });
    this.name = name;
    this.lotDetails = ldetails;
    this.price = ldetails.price;
    this.zone = ldetails.zoneType || 'Residential';
    this.fillColor = ldetails['fillColor'] || "#000000";
    this.characters = characters;
    this.building = {name:this.name, description: this.lotDetails.description || "no desc", type:"Store", owner:"Maureen", value:100000};
    this.occupied = false;
    this.isPlayerBehind = false;
    this.imgObj = undefined;
    if(ldetails.imgObj)
      this.imgObj = ldetails.imgObj;
      this.imgSize = ldetails.imgSize || {x:160,y:171};
      this.imgOffset = ldetails.imgOffset || {x:10,y:20};
      this.bounds = {x1:this.location.x-(this.imgSize.x/2 + 10)};
      this.bounds['x2'] = this.bounds.x1 + this.imgSize.x;
      this.bounds['y1'] = this.location.y - this.imgSize.y;
      this.bounds['y2'] = this.bounds.y1 + this.imgSize.y * 0.7;
  }

  isMouseOver(p5, offset, scal){
    const loc2 = {x:this.location.x/2, y:this.location.y/2};// code smell wip todo / 2 lot issue
    return super.isMouseOver(p5, offset, scal, loc2);
  }

  handleLotInteraction(p5, callback) {
    this.setHover(true);
    if (p5.mouseIsPressed) {
      this.doUIAction(p5.frameCount,()=>{
        this.setClick(true);
        callback(this);
      });
    }
  }

  update(p5, parent) {
    // Implement any update logic specific to LotEntity
      this.isPlayerBehind = false;
      if (parent.playerx >= this.bounds.x1 && parent.playerx <= this.bounds.x2 && parent.playery >= this.bounds.y1 && parent.playery <= this.bounds.y2){
        this.isPlayerBehind = true;
      }
      if (this.isMouseOver(p5, parent.getCameraOffset(), parent.getCameraZoom())) {
        this.handleLotInteraction(p5, (lot)=>{parent.onPropertySelect(lot)});
      }
  }

  draw(p5, transparency, offset, scal) {
    offset = offset || {x:0,y:0};
    const ps = p5.createVector(this.location.x, this.location.y);
    let fillColor = '#000000';
    if (this.fillColor || this.characters.length) {
      fillColor = this.fillColor;
      p5.fill(`${fillColor}${transparency}`);
    }

    if(this.imgObj){
      p5.push();
      if(this.isPlayerBehind){
        p5.tint(255,100);
      }
      p5.image(this.imgObj, ps.x-(this.imgSize.x/2 + 10), ps.y-this.imgSize.y, this.imgSize.x,this.imgSize.y);
      p5.pop();
      p5.fill('#ffffff66')
      p5.ellipse(ps.x-16, ps.y-25, 10, 10);
    }else{
      p5.ellipse(ps.x, ps.y, 10, 10);
    }

    if (this.isMouseOver(p5,offset,scal) || super.isSelected()) {
      p5.fill(`${fillColor}ff`);
      p5.stroke('#ffffffaa');
      const label = this.name || `Lot ${this.id}`;
      p5.text(label, ps.x, ps.y);
    }

    p5.fill(`#000000${transparency}`);
    p5.stroke(`#ffffff${transparency}`);
  }
}

export default LotEntity;