import Entity from './Entity';

class LotEntity extends Entity {
  constructor(id, name, x, y, ldetails, characters = []) {
    super('lot', id, { x, y }, { width: 32, height: 32 });
    this.initializeProperties(name, ldetails, characters);
    this.initializeBounds(ldetails);
  }

  initializeProperties(name, ldetails, characters) {
    this.name = name;
    this.lotDetails = ldetails;
    this.price = ldetails.price;
    this.zone = ldetails.zoneType || 'Residential';
    this.fillColor = ldetails.fillColor || "#000000";
    this.characters = characters;
    this.building = {
      name: this.name,
      description: this.lotDetails.description || "no desc",
      type: "Store",
      owner: "Maureen",
      value: 100000
    };
    this.occupied = false;
    this.isPlayerBehind = false;
    this.imgObj = ldetails.imgObj;
    this.imgSize = ldetails.imgSize || { x: 160, y: 171 };
    this.imgOffset = ldetails.imgOffset || { x: 10, y: 20 };
  }

  initializeBounds(ldetails) {
    const halfImgWidth = this.imgSize.x / 2;
    this.bounds = {
      x1: this.location.x - (halfImgWidth + 10),
      x2: this.location.x - (halfImgWidth + 10) + this.imgSize.x,
      y1: this.location.y - this.imgSize.y,
      y2: this.location.y - this.imgSize.y + this.imgSize.y * 0.7
    };
  }

  isMouseOver(p5, offset, scal) {
    const loc2 = { x: this.location.x / 2, y: this.location.y / 2 };
    return super.isMouseOver(p5, offset, scal, loc2);
  }

  handleLotInteraction(p5, callback) {
    this.setHover(true);
    if (p5.mouseIsPressed) {
      this.doUIAction(p5.frameCount, () => {
        this.setClick(true);
        callback(this);
      });
    }
  }

  update(p5, parent) {
    this.isPlayerBehind = this.checkPlayerBehind(parent);
    if (this.isMouseOver(p5, parent.getCameraOffset(), parent.getCameraZoom())) {
      this.handleLotInteraction(p5, lot => parent.onPropertySelect(lot));
    }
  }

  checkPlayerBehind(parent) {
    const { x, y } = parent.playerControl.location;
    return x >= this.bounds.x1 && x <= this.bounds.x2 && y >= this.bounds.y1 && y <= this.bounds.y2;
  }

  draw(p5, transparency, offset = { x: 0, y: 0 }, scal) {
    const ps = p5.createVector(this.location.x, this.location.y);
    this.setFillColor(p5, transparency);
    this.drawImage(p5, ps);
    this.drawLabel(p5, offset, scal, ps);
  }

  setFillColor(p5, transparency) {
    const fillColor = this.fillColor || (this.characters.length ? this.fillColor : "#000000");
    p5.fill(`${fillColor}${transparency}`);
  }

  drawImage(p5, ps) {
    if (this.imgObj) {
      p5.push();
      if (this.isPlayerBehind) p5.tint(255, 100);
      p5.image(this.imgObj, ps.x - (this.imgSize.x / 2 + 10), ps.y - this.imgSize.y, this.imgSize.x, this.imgSize.y);
      p5.pop();
      p5.fill('#ffffff66');
      p5.ellipse(ps.x - 16, ps.y - 25, 10, 10);
    } else {
      p5.ellipse(ps.x, ps.y, 10, 10);
    }
  }

  drawLabel(p5, offset, scal, ps) {
    if (this.isMouseOver(p5, offset, scal) || super.isSelected()) {
      p5.fill(`${this.fillColor}ff`);
      p5.stroke('#ffffffaa');
      p5.text(this.name || `Lot ${this.id}`, ps.x, ps.y);
    }
  }
}

export default LotEntity;
