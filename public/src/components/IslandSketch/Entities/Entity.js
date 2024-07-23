class Entity {
  constructor(entityType, id, location, size) {
    this.entityType = entityType;
    this.id = id;
    this.location = location; // { x: 0, y: 0 }
    this.size = size; // { width: 0, height: 0 }
    this.isHovered = false;
    this.isClicked = false;
    this.isSelected = false;
    this.timeHasUpdated = false;
  }

  select() {
    this.isSelected = true;
  }

  deselect() {
    this.isSelected = false;
  }

  isSelected() {
    return this.isSelected;
  }

  isMouseOver(p5, offset, scal, loc, rad) {
    loc = loc || this.location;
    rad = rad || 15.0;

    if (!(loc.x && loc.y)) {
      throw new Error("no location x,y");
    }
    const ps = p5.createVector(loc.x, loc.y);
    return (
      p5.dist(
        ps.x,
        ps.y,
        (p5.mouseX - offset.x) / scal,
        (p5.mouseY - offset.y) / scal
      ) <= rad
    );
  }

  setHover(h) {
    this.isHovered = h;
  }

  setClick(c) {
    this.isClicked = c;
  }

  // Base update method, can be overridden by subclasses
  update() {
    // Handle hover and click states
    this.isHovered = false;
    this.isClicked = false;
  }

  // Base draw method, can be overridden by subclasses
  draw(p5, transparency, offset, scale) {
    // Draw the entity
    p5.fill(`rgba(0, 0, 0, ${transparency})`);
    p5.rect(
      this.location.x,
      this.location.y,
      this.size.width,
      this.size.height
    );

    // Draw hover state
    if (this.isHovered) {
      p5.stroke("yellow");
      p5.strokeWeight(2);
      p5.noFill();
      p5.rect(
        this.location.x,
        this.location.y,
        this.size.width,
        this.size.height
      );
    }

    // Draw click state
    if (this.isClicked) {
      p5.stroke("red");
      p5.strokeWeight(2);
      p5.noFill();
      p5.rect(
        this.location.x,
        this.location.y,
        this.size.width,
        this.size.height
      );
    }
  }
}

export default Entity;
