import Entity from './Entity';

class CollideRectEntity extends Entity {
  constructor(id, x, y, size, onCollideEvent) {
    super('colliderect', id, { x, y }, { width: size.x || size || 32, height: size.y || size || 32 });
    this.onCollideEvent = onCollideEvent || ((p1, obj1, obj2)=>{console.log("collide");});
    this.isActive = true;
  }

  update() {
    // Implement any update logic specific to LotEntity
  }

  onCollide(p1,o1,o2) {
    if(this.isEnabled())
      this.onCollideEvent(p1,o1,o2);
  }

  setEnabled(e){
    this.isActive = e;
  }
  isEnabled(){
    return this.isActive;
  }

  contains(newPos){
    return newPos.x >= this.location.x && newPos.x <= this.location.x+this.size.width && newPos.y >= this.location.y && newPos.y <= this.location.y+this.size.height;
  }

  draw(p5, transparency, offset) {
    offset = offset || {x:0,y:0};
    const ps = p5.createVector(this.location.x, this.location.y);
    let fillColor = '#000000';
    if (this.fillColor) {
      fillColor = this.fillColor;
      p5.fill(`${fillColor}${transparency}`);
    }

    p5.rect(ps.x, ps.y, this.size.width, this.size.height);

    p5.fill(`#000000${transparency}`);
    p5.stroke(`#ffffff${transparency}`);
  }
}

export default CollideRectEntity;