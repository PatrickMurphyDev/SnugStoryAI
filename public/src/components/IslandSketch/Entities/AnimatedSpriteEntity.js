import Entity from "./Entity";

class AnimatedSpriteEntity extends Entity {
  constructor(
    id,
    imgSheet,
    x,
    y,
    dimensions,
    SpriteSheetDet,
    offset,
    speed,
    row
  ) {
    super(
      "AnimatedSprite",
      id,
      { x, y },
      dimensions || { width: 32, height: 32 }
    );
    this.frameOffset = offset || 0;
    this.SpriteSheet = imgSheet;
    this.row = row || 0;
    this.SpriteSheetDetails = SpriteSheetDet || { rows: 4, columns: 3 };

    this.AnimationFrameCount = 0;
    this.frameSpeed = speed || 30;
  }

  getAnimationFrame() {
    return (
      ((this.AnimationFrameCount + this.frameOffset) %
        this.SpriteSheetDetails.columns) *
      this.size.width
    );
  }

  update(p5) {
    // Implement any update logic specific to AnimatedSpriteEntity
    if (this.frameSpeed > 0)
      if (p5.frameCount % this.frameSpeed === 0) {
        this.AnimationFrameCount = this.AnimationFrameCount + 1;
      }
  }

  draw(p5, x, y) {
    p5.image(
      this.SpriteSheet,
      x || this.location.x,
      y || this.location.y,
      this.size.width,
      this.size.height,
      this.getAnimationFrame(0),
      this.row * this.size.height,
      this.size.width,
      this.size.height
    );
  }
}

export default AnimatedSpriteEntity;
