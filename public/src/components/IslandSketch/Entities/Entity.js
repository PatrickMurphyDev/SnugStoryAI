class Entity {
    constructor(entityType, id, location, size) {
      this.entityType = entityType;
      this.id = id;
      this.location = location; // { x: 0, y: 0 }
      this.size = size; // { width: 0, height: 0 }
    }
  
    update() {
      // Base update method, can be overridden by subclasses
    }
  
    draw(p5, transparency, offset, scal) {
      // Base draw method, can be overridden by subclasses
      p5.fill(`rgba(0, 0, 0, ${transparency})`);
      p5.rect(this.location.x, this.location.y, this.size.width, this.size.height);
    }
  }
  
  export default Entity;
  