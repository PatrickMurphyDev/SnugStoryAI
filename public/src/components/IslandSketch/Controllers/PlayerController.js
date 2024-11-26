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
  }

  playerx() {
    return this.location.x;
  }

  playery() {
    return this.location.y;
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
    simTime.sleep(60*7);
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

  update(p5) {}

  render(p5) { 
    const moveStateIsMoving = this.moveState.isMovingLeft || this.moveState.isMovingRight || this.moveState.isMovingUp || this.moveState.isMovingDown;
    let renderCharIdle = () => {
      if (this.lastMoveState <= 2) {
        p5.push();
        p5.scale(-1, 1); // Scale -1, 1 means reverse the x axis, keep y the same.
        this.parent.CharIdle.draw(p5, -this.location.x - 24, this.location.y);
        p5.pop();
      } else {
        // if last move state was 3 down or 4 left, and not moving then draw the standing to the left sprite
        this.parent.CharIdle.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImage, this.playerx, this.playery);
      }
    };
    // if player is moving, draw the running sprite
   if (
      this.parent.useCharImage &&
      (moveStateIsMoving)
    ) {
      if (this.moveState.isMovingLeft) {
        this.parent.CharRunLeft.draw(p5, this.location.x, this.location.y);
      } else if (this.moveState.isMovingRight) {
        this.parent.CharRunRight.draw(p5, this.location.x, this.location.y);
      } else {
        if (this.moveState.isMovingUp) {
          this.parent.CharRunUp.draw(p5, this.location.x, this.location.y);
        } else if (this.moveState.isMovingDown) {
          this.parent.CharRunDown.draw(p5, this.location.x, this.location.y);
        }
      }
    } else if (this.parent.useCharImage) {
      renderCharIdle();
    } else {
      // no char image def box
      p5.rect(this.location.x, this.location.y, 24, 32);
    }

    if(this.parent.inputHandler.isTKeyPressed) {
      const characterIconOffset = {x: 12, y: 22};
      const playerhandsPosition = {x:this.location.x+characterIconOffset.x, y: this.location.y+characterIconOffset.y};

      const line = (p5,v1,v2) => {
        const powerPct = this.parent.inputHandler.getPressDurationPowerPct();
        let dx = v2.x - v1.x;
        let dy = v2.y - v1.y;
        let v3 = p5.createVector(
          v1.x + dx * powerPct,
          v1.y + dy * powerPct
        );
        p5.curve(v1.x-60, v1.y + powerPct*(25*10), v1.x, v1.y, v3.x, v3.y, v3.x+dx*(1-powerPct), v3.y+dy*(1-powerPct));
        p5.stroke("#000000");
        p5.strokeWeight(1);
        p5.line(v1.x, v1.y, v3.x, v3.y);
      };

      p5.push();
      p5.stroke("#ff0000");
      p5.strokeWeight(2);
      line(p5, playerhandsPosition, this.parent.getMouseWorldPosition(p5));
      p5.pop();
    }

  }
}

export default PlayerController;
