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
    simTime.sleep();
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

  determineLastMoveState(code) {
    return IslandTemplate.KEYCODEMAP[code] || 0;
  }

  setDidMove(dm) {
    this.didMove = dm;
  }

  getDidMove() {
    return this.didMove;
  }

  update(p5) {}

  render(p5) {
    let renderCharIdle = () => {
      if (this.lastMoveState <= 2) {
        p5.push();
        p5.scale(-1, 1); // Scale -1, 1 means reverse the x axis, keep y the same.
        this.parent.CharIdle.draw(p5, -this.location.x - 24, this.location.y); //p5.image(this.playerImage, -this.playerx - this.tileWidth, this.playery); // Because the x-axis is reversed, we need to draw at different x position. negative x
        p5.pop();
      } else {
        // if last move state was 3 down or 4 left, and not moving then draw the standing to the left sprite
        this.parent.CharIdle.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImage, this.playerx, this.playery);
      }
    };

    if (
      this.parent.useCharImage &&
      (this.moveState.isMovingDown ||
        this.moveState.isMovingUp ||
        this.moveState.isMovingLeft ||
        this.moveState.isMovingRight)
    ) {
      if (this.moveState.isMovingLeft) {
        this.parent.CharRunLeft.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImageLeft, this.playerx, this.playery); //parent.getAssets('GameMapScene')['PlayerImageLeft']
      } else if (this.moveState.isMovingRight) {
        this.parent.CharRunRight.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImageRight, this.playerx, this.playery);
      } else {
        if (this.moveState.isMovingUp) {
          this.parent.CharRunUp.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImage, this.playerx, this.playery);
        } else if (this.moveState.isMovingDown) {
          this.parent.CharRunDown.draw(p5, this.location.x, this.location.y); //p5.image(this.playerImage, this.playerx, this.playery);
        }
      }
    } else if (this.parent.useCharImage) {
      renderCharIdle();
    } else {
      // no char image def box
      p5.rect(this.location.x, this.location.y, 24, 32);
    }
  }
}

export default PlayerController;
