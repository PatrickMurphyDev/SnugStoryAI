class Entity {
    constructor(entityType, id, location, size) {
      this.entityType = entityType;
      this.id = id;
      this.location = location; // { x: 0, y: 0 }
      this.size = size; // { width: 0, height: 0 }
      this.isHovered = false;
      this.isClicked = false;
      this.timeHasUpdated = false;
    }
  
    // Event handlers
    handleHover(hoverState) {
      this.isHovered = hoverState;
    }
  
    handleClick(clickState) {
      this.isClicked = clickState;
    }

    // Check 
    checkHover(p5, offset, scal, dist){
        return (p5.dist(this.location.x / 2, this.location.y / 2, (p5.mouseX - offset.x) / scal, (p5.mouseY - offset.y) / scal) <= (dist || 15.0));    
    }

    checkClick(p5, offset, scal, dist){
        dist = dist || 15.0;
        return p5.mouseIsPressed && this.checkHover(p5, offset,scal,dist);    
    }
  
    // Base update method, can be overridden by subclasses
    update() {
      // Handle hover and click states
      if (this.checkHover()) {
        this.isHovered = true;
        this.handleHover();
      }
      if (this.checkClick()) {
        this.isClicked = true;
        this.handleClick();
      }
    }
  
    // Base draw method, can be overridden by subclasses
    draw(p5, transparency, offset, scale) {
      // Draw the entity
      p5.fill(`rgba(0, 0, 0, ${transparency})`);
      p5.rect(this.location.x, this.location.y, this.size.width, this.size.height);
      
      // Draw hover state
      if (this.isHovered) {
        p5.stroke('yellow');
        p5.strokeWeight(2);
        p5.noFill();
        p5.rect(this.location.x, this.location.y, this.size.width, this.size.height);
      }
  
      // Draw click state
      if (this.isClicked) {
        p5.stroke('red');
        p5.strokeWeight(2);
        p5.noFill();
        p5.rect(this.location.x, this.location.y, this.size.width, this.size.height);
      }                 
    }
  }
  
  export default Entity;
  