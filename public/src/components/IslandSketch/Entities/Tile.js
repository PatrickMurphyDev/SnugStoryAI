import Entity from './Entity';

class TileEntity extends Entity {
  constructor(x, y, TileType, tileDetails) {
    super('Tile', "T"+(Math.random()*100000), { x, y }, { width: 32, height: 32 });
    this.tileType = TileType || "unknown";
    this.tileDetails = tileDetails;
    this.fillColor = tileDetails['fillColor'] || "#000000";
  }
  
  update() {
    // Implement any update logic specific to tiles
  }

  draw(p5, transparency, offset, scal) {
    offset = offset || {x:0,y:0};
    const ps = p5.createVector(this.location.x / 2, this.location.y / 2);
    if(this.tileDetails['imageSrc'])
        p5.image(this.tileDetails['imageSrc'],ps.x,ps.y);
  }
}

export default TileEntity;