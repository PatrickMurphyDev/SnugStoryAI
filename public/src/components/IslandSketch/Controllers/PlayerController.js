import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import SimulationTime from "../../../utils/SimulationTime";

const simTime = SimulationTime.getInstance();

class PlayerController {
  constructor(parent, loc, sp) {
    this.parent = parent;
    this._isAsleep = false;
    this.speed = 0.5;
    this.moveState = {};
    this.lastMoveState = 0;
    this.location = { x: 570, y: 1820 };
    this.didMove = true;

    this.animationFrameCountSpeed = 50;
  }

  setMoveState(ms) {
    this.moveState = ms;
  }

  getMoveState() {
    return this.moveState;
  }

  setLocation(vec2) {
    this.location = vec2;
    this.setDidMove(true);
  }

  getLocation() {
    return this.location;
  }

  setSpeed(sp) {
    this.speed = sp;
  }

  getSpeed() {
    return this.speed;
  }

  setAsleep(bool) {
    this._isAsleep = bool;
    simTime.sleep(60 * 7);
  }

  isAsleep() {
    return this._isAsleep;
  }

  setLastMoveState(lms) {
    this.lastMoveState = lms;
  }

  getLastMoveState() {
    return this.lastMoveState;
  }

  setDidMove(dm) {
    this.didMove = dm;
  }

  getDidMove() {
    return this.didMove;
  }

  determineLastMoveState(code) {
    return IslandTemplate.KEYCODEMAP[code] || 0;
  }

  update(p5) {
    this.handleItemThrow(p5);
  }

  render(p5) {
    this.renderCharacter(p5);
    this.renderHeldItem(p5);
    this.renderThrowingLine(p5);
  }

  renderCharacter(p5) {
    const moveStateIsMoving = this.isMoveStateMoving();

    if (this.parent.useCharImage && moveStateIsMoving) {
      this.renderMovingCharacter(p5);
    } else if (this.parent.useCharImage) {
      this.renderIdleCharacter(p5);
    } else {
      this.renderDefaultBox(p5);
    }
  }

  isMoveStateMoving() {
    return (
      this.moveState.isMovingLeft ||
      this.moveState.isMovingRight ||
      this.moveState.isMovingUp ||
      this.moveState.isMovingDown
    );
  }

  renderMovingCharacter(p5) {
    if (this.moveState.isMovingLeft) {
      this.parent.CharRunLeft.draw(p5, this.location.x, this.location.y);
    } else if (this.moveState.isMovingRight) {
      this.parent.CharRunRight.draw(p5, this.location.x, this.location.y);
    } else if (this.moveState.isMovingUp) {
      this.parent.CharRunUp.draw(p5, this.location.x, this.location.y);
    } else if (this.moveState.isMovingDown) {
      this.parent.CharRunDown.draw(p5, this.location.x, this.location.y);
    }
  }

  renderIdleCharacter(p5) {
    if (this.lastMoveState <= 2) {
      p5.push();
      p5.scale(-1, 1);
      this.parent.CharIdle.draw(p5, -this.location.x - 24, this.location.y);
      p5.pop();
    } else {
      this.parent.CharIdle.draw(p5, this.location.x, this.location.y);
    }
  }

  renderDefaultBox(p5) {
    p5.rect(this.location.x, this.location.y, 24, 32);
  }

  renderHeldItem(p5) {
    if (this.isItemInteractionActive()) {
      const heldItem = this.parent.playerInventory.getItemHeld();
      if (heldItem) {
        const playerHandsPosition = this.getPlayerHandsPosition();
        const heldItemIconPosition = {
          x: playerHandsPosition.x + 8,
          y: playerHandsPosition.y,
        };
        this.drawIcon(p5, heldItem, heldItemIconPosition);
      }
    }
  }

  renderThrowingLine(p5) {
    if (this.parent.inputHandler.isTKeyPressed) {
      const playerHandsPosition = this.getPlayerHandsPosition();
      const mouseWorldPosition = this.parent.getMouseWorldPosition(p5);
      this.drawThrowingLine(p5, playerHandsPosition, mouseWorldPosition);
    }
  }

  handleItemThrow(p5) {
    if (this.parent.inputHandler.isTKeyReleased) {
      this.parent.inputHandler.isTKeyReleased = false;
      const playerHandsPosition = this.getPlayerHandsPosition();
      const mouseWorldPosition = this.parent.getMouseWorldPosition(p5);
      this.createThrownItemEntity(p5, playerHandsPosition, mouseWorldPosition);
    }
  }

  isItemInteractionActive() {
    return (
      this.parent.inputHandler.isTKeyPressed ||
      this.parent.inputHandler.isTkeyReleased
    );
  }

  getPlayerHandsPosition() {
    const characterIconOffset = { x: 12, y: 22 };
    return {
      x: this.location.x + characterIconOffset.x,
      y: this.location.y + characterIconOffset.y,
    };
  }

  drawIcon(p5, heldItem, position) {
    let icon = heldItem.icon || ["🥅", "🥅"];
    p5.push();
    p5.textSize(13);
    p5.text(icon[0] || icon, position.x, position.y);
    p5.text(icon[1] || "", position.x + 5, position.y + 5);
    p5.pop();
  }

  drawThrowingLine(p5, start, end) {
    const powerPct = this.parent.inputHandler.getPressDurationPowerPct();
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let v3 = p5.createVector(start.x + dx * powerPct, start.y + dy * powerPct);
    let controlPoint = p5.createVector(start.x - 60,
      start.y + powerPct * (25 * 10));
    let endControlPoint = p5.createVector(
      v3.x + dx * (1 - powerPct),
      v3.y + dy * (1 - powerPct));

    p5.push();
    p5.stroke("#ff0000");
    p5.strokeWeight(2);
    p5.curve(
      controlPoint.x,
      controlPoint.y,
      start.x,
      start.y,
      v3.x,
      v3.y,
      endControlPoint.x,
      endControlPoint.y);
    p5.stroke("#000000");
    p5.strokeWeight(1);
    /* p5.text("🥅", 
      p5.curvePoint(controlPoint.x, start.x, v3.x, endControlPoint.x, 0.5),
      p5.curvePoint(controlPoint.y, start.y, v3.y, endControlPoint.y, 0.5)); */
    p5.line(start.x, start.y, v3.x, v3.y);
    p5.pop();
  }

  createThrownItemEntity(p5, start, end) {
    const powerPct = this.parent.inputHandler.getPressDurationPowerPct();
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const controlPoint = p5.createVector(
      start.x - 60,
      start.y + powerPct * (25 * 10)
    );
    let v3 = p5.createVector(start.x + dx * powerPct, start.y + dy * powerPct);
    let endControlPoint = p5.createVector(
      v3.x + dx * (1 - powerPct),
      v3.y + dy * (1 - powerPct));

    let that = this;
    const newEntity = {
      pos: p5.createVector(start.x, start.y),
      id:"trap01",
      frame: 0,
      item: that.parent.playerInventory.getItemHeld(),
      update: function () {
        this.frame++;
        if (this.frame <= that.animationFrameCountSpeed) {
          const t = this.frame / that.animationFrameCountSpeed;
          this.pos = {
            x: p5.curvePoint(controlPoint.x, start.x, v3.x, endControlPoint.x, t),
            y: p5.curvePoint(controlPoint.y, start.y, v3.y, endControlPoint.y, t),
          };
        } else {
          that.parent.placeCrabTrap(v3);
          that.createSplashEntity(p5, v3);
          that.parent.gameViewMapScene.removeEntity(this);
          console.log("remove trap throw entity")
        }
      },
      draw: function () {
        p5.text("🥅",this.pos.x, this.pos.y);
      },
    };

    this.parent.gameViewMapScene.addEntity(newEntity);
  }

  createSplashEntity(p5, pos, ent) {
    let that = this;
    const newEntity = {
      pos: pos,
      id:"splash0111",
      frame: 0,
      item: that.parent.playerInventory.getItemHeld(),
      update: function () {
        this.frame++;
        if (this.frame >= that.animationFrameCountSpeed) {
          that.parent.gameViewMapScene.removeEntity(this);
        }
      },
      draw: function () {
        p5.fill("blue");
        p5.ellipse(this.pos.x, this.pos.y,20,20);
      },
    };

    this.parent.gameViewMapScene.addEntity(newEntity);
  }
}

export default PlayerController;
