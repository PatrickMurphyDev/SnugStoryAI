import Entity from './Entity';

class TileChunkEntity extends Entity {
  constructor(id, name, x, y, ldetails, characters = []) {
    super('TileChunk', id, { x, y }, { width: 32, height: 32 });
    this.name = name;
    this.lotDetails = ldetails;
    this.price = ldetails.price;
    this.zone = ldetails.zoneType || 'Residential';
    this.fillColor = ldetails['fillColor'] || "#000000";
    this.characters = characters;
    this.building = {name:this.name, description: this.lotDetails.description || "no desc", type:"Store", owner:"Maureen", value:100000};
    this.occupied = false;
  }

  update() {
    // Implement any update logic specific to LotEntity
  }

  draw(p5, transparency, offset, scal) {
    offset = offset || {x:0,y:0};
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

export default TileChunkEntity;