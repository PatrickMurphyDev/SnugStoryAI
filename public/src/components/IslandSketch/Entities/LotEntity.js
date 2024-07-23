import Entity from './Entity';
import { useEffect } from 'react';

class LotEntity extends Entity {
  constructor(id, name, x, y, size, zone, price, fillColor = '#000000', characters = []) {
    super('lot', id, { x, y }, { width: size, height: size });
    this.name = name;
    this.zone = zone;
    this.price = price;
    this.fillColor = fillColor;
    this.characters = characters;
    this.building = {name:"Mo's Candy",description:"Candy Store for the People!",type:"Store",owner:"Maureen",value:"100,000"};
  }

  isMouseOver(p5, offset, scal){
    const loc2 = {x:this.location.x/2, y:this.location.y/2};
    return super.isMouseOver(p5, offset, scal, loc2);
  }

  update() {
    // Implement any update logic specific to LotEntity
    
  }

  draw(p5, transparency, offset, scal) {
    const ps = p5.createVector(this.location.x / 2, this.location.y / 2);
    let fillColor = '#000000';
    if (this.fillColor || this.characters.length) {
      fillColor = this.fillColor;
      p5.fill(`${fillColor}${transparency}`);
    }

    p5.ellipse(ps.x, ps.y, 10, 10);

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