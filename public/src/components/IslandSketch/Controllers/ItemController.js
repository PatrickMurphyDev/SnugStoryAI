class ItemController {
  constructor(player) {
    this.player = player;
  }

  update() {
    // Implement item update logic here
  }

  render(p5) {
    this.renderHeldItem(p5);
    this.renderThrowingLine(p5);
    this.handleItemThrow(p5);
  }

  renderHeldItem(p5) {
    if (this.isItemInteractionActive()) {
      const heldItem = this.player.parent.playerInventory.getItemHeld();
      if (heldItem) {
        const playerHandsPosition = this.getPlayerHandsPosition();
        const heldItemIconPosition = { x: playerHandsPosition.x + 8, y: playerHandsPosition.y };
        this.drawIcon(p5, heldItem, heldItemIconPosition);
      }
    }
  }

  renderThrowingLine(p5) {
    if (this.player.parent.inputHandler.isTKeyPressed) {
      const playerHandsPosition = this.getPlayerHandsPosition();
      const mouseWorldPosition = this.player.parent.getMouseWorldPosition(p5);
      this.drawThrowingLine(p5, playerHandsPosition, mouseWorldPosition);
    }
  }

  handleItemThrow(p5) {
    if (this.player.parent.inputHandler.isTKeyReleased) {
      const playerHandsPosition = this.getPlayerHandsPosition();
      const mouseWorldPosition = this.player.parent.getMouseWorldPosition(p5);
      this.createThrownItemEntity(p5, playerHandsPosition, mouseWorldPosition);
    }
  }

  isItemInteractionActive() {
    return this.player.parent.inputHandler.isTKeyPressed || this.player.parent.inputHandler.isTkeyReleased;
  }

  getPlayerHandsPosition() {
    const characterIconOffset = { x: 12, y: 22 };
    return {
      x: this.player.location.x + characterIconOffset.x,
      y: this.player.location.y + characterIconOffset.y
    };
  }

  drawIcon(p5, heldItem, position) {
    let icon = heldItem.icon || ["🥅", "🥅"];
    p5.push();
    p5.textSize(13);
    p5.text((icon[0] || icon), position.x, position.y);
    p5.text((icon[1] || ""), position.x + 5, position.y + 5);
    p5.pop();
  }

  drawThrowingLine(p5, start, end) {
    const powerPct = this.player.parent.inputHandler.getPressDurationPowerPct();
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let v3 = p5.createVector(start.x + dx * powerPct, start.y + dy * powerPct);

    p5.push();
    p5.stroke("#ff0000");
    p5.strokeWeight(2);
    p5.curve(start.x - 60, start.y + powerPct * (25 * 10), start.x, start.y, v3.x, v3.y, v3.x + dx * (1 - powerPct), v3.y + dy * (1 - powerPct));
    p5.stroke("#000000");
    p5.strokeWeight(1);
    p5.line(start.x, start.y, v3.x, v3.y);
    p5.pop();
  }

  createThrownItemEntity(p5, start, end) {
    const powerPct = this.player.parent.inputHandler.getPressDurationPowerPct();
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const midPos = p5.createVector(start.x + dx * powerPct, start.y + dy * powerPct);
    const controlPoint = p5.createVector(start.x - 60, start.y + powerPct * (25 * 10));

    const newEntity = {
      pos: p5.createVector(start.x, start.y),
      frame: 0,
      item: this.player.parent.playerInventory.getItemHeld(),
      update: function () {
        this.frame++;
        if (this.frame <= 1000) {
          const t = this.frame / 1000;
          this.pos = {
            x: p5.curvePoint(start.x, controlPoint.x, midPos.x, end.x, t),
            y: p5.curvePoint(start.y, controlPoint.y, midPos.y, end.y, t),
          };
        } else {
          this.parent.removeEntity(this);
        }
      },
      draw: function () {
        p5.ellipse(this.pos.x, this.pos.y, 10, 10);
      },
    };

    this.player.parent.gameViewMapScene.addEntity(newEntity);
  }
}

export default ItemController;