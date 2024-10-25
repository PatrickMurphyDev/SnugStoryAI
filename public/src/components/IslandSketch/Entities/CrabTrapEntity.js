import Entity from './Entity';

class CrabTrapEntity extends Entity {
  constructor(id, x, y, time) {
    super('CrabTrap', id, { x, y }, { width: 32, height: 32 });
    this.castDateTime = time;//now
  }

  update() {
    // Implement any update logic specific to LotEntity
  }

  draw(p5, transparency, offset, scal) {
    offset = offset || {x:0,y:0};
    const ps = p5.createVector(this.location.x, this.location.y);
    let fillColor = '#000000';
    if (this.fillColor) {
      fillColor = this.fillColor;
      p5.fill(`${fillColor}${transparency}`);
    }
    p5.ellipse(ps.x, ps.y, 10, 10);

    if (this.isMouseOver(p5,offset,scal) || super.isSelected()) {
      p5.fill(`${fillColor}ff`);
      p5.stroke('#ffffffaa');
      const label = "CrapTrap";
      p5.text(label, ps.x, ps.y);
    }

    p5.fill(`#000000${transparency}`);
    p5.stroke(`#ffffff${transparency}`);
  }
}

export default CrabTrapEntity;