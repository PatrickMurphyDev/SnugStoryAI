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
    this._isHidden = false;
    this.lastUIActionFrame = -1;
    this.UIActionCooldownFrames = 15;
    this.orientation = 0;
  }

  doUIAction(currFrame, action){
    if (this.lastUIActionFrame + this.UIActionCooldownFrames <= currFrame) {
      this.lastUIActionFrame = currFrame;
      action();
    }
  }

  remove(){
    // delete me
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

  isHidden(){
    return this._isHidden;
  }
  setHidden(h){
    this._isHidden = h;
  }

  isMouseOver(p5, offset, scal, loc, rad) {
    loc = loc || this.location;
    rad = rad || 15.0;

    if (!(loc.x && loc.y)) {
      //throw new Error("no location x,y");
      //console.log("no location x,y");
      return false; 
    }
    const ps = p5.createVector(loc.x, loc.y);
    return (
      p5.dist(
        ps.x,
        ps.y,
        offset.x * -1 + (p5.mouseX) / scal, // if offset.x is negative then adding
        offset.y * -1 + (p5.mouseY) / scal
      ) <= rad
    );
  }

  setHover(h) {
    this.isHovered = h;
  }

  setClick(c) {
    this.isClicked = c;
  }

  setLocation(l){
    this.location.x = l.x || this.location.x;
    this.location.y = l.y || this.location.y;
  }

  getLocation() {
    return this.location;
  }
  
  setOrientation(angle) { 
    // Implement logic to set the orientation based on the angle 
    this.orientation = angle;  // Implement logic to set the orientation based on the angle 
  }

  getOrientation() {
    return this.orientation;
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
