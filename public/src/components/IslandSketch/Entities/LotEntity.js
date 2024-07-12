import Entity from './Entity';

class LotEntity extends Entity {
  constructor(id, name, x, y, size, zone, price, fillColor = '#000000', characters = []) {
    super('lot', id, { x, y }, { width: size, height: size });
    this.name = name;
    this.zone = zone;
    this.price = price;
    this.fillColor = fillColor;
    this.characters = characters;
  }

  update() {
    // Implement any update logic specific to LotEntity
  }

  draw(p5, transparency, offset, scal) {
    const ps = p5.createVector(this.location.x / 2, this.location.y / 2);
    let fillColor = '#000000';
    if (this.characters.length) {
      p5.fill(`${fillColor}${transparency}`);
    }
    if (this.fillColor) {
      fillColor = this.fillColor;
      p5.fill(`${fillColor}${transparency}`);
    }

    p5.ellipse(ps.x, ps.y, 10, 10);

    if (p5.dist(ps.x, ps.y, (p5.mouseX - offset.x) / scal, (p5.mouseY - offset.y) / scal) <= 15.0) {
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