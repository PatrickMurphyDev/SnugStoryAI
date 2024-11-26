import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import SimulationTime from "../../../utils/SimulationTime";

const SIMTIME = SimulationTime.getInstance();

export class UserInputController {
  constructor(gameMapScene) {
    this.gameMapScene = gameMapScene;
    this.playerControl = gameMapScene.playerControl;
    this.initializeEventListeners();
  }

  /*
   * Initializes event listeners for user input.
   * This method sets up event listeners for mouse wheel, key press, and key release events.
   * These listeners are crucial for capturing user interactions with the game.
   * 
   * @method
   * @name initializeEventListeners
   * @memberof UserInputController
   * @instance
   * @description Sets up event listeners for wheel, keydown, and keyup events on the window object.
   * @returns {void} This method does not return a value.
   */
  initializeEventListeners() {
    window.addEventListener("wheel", this.handleWheel.bind(this));
    window.addEventListener("keydown", this.keyPressed.bind(this));
    window.addEventListener("keyup", this.keyReleased.bind(this));
  }
  handleWheel(event) {
    const dir = Math.sign(event.deltaY);
    this.gameMapScene.doUIAction(this.gameMapScene.lastFrame, () => {
      if (dir > 0) {
        this.gameMapScene.currentZoomLevel--;
      } else {
        this.gameMapScene.currentZoomLevel++;
      }
      this.gameMapScene.currentZoomLevel = Math.max(
        0,
        Math.min(
          this.gameMapScene.gameViewMapScene.zoomLevels.length - 1,
          this.gameMapScene.currentZoomLevel
        )
      );
      this.playerControl.setDidMove(true);
    });
  }

  keyPressed(e) {
    if (IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code])
      this.playerControl.getMoveState()[
        IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]
      ] = true;
    this.playerControl.setLastMoveState(0);
    e.stopPropagation();
  }

  keyReleased(e) {
    e.preventDefault();
    if (IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]) {
      this.playerControl.getMoveState()[
        IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]
      ] = false;
      this.playerControl.setLastMoveState(this.determineLastMoveState(e.code));
    }
    e.stopPropagation();
  }

  determineLastMoveState(code) {
    return IslandTemplate.KEYCODEMAP[code] || 0;
  }

  handleKeyboardUserInput() {
    if (!this.gameMapScene.GUI.allowMoveInputKeys) return;

    const currentLocation = this.playerControl.location;
    const moveState = this.playerControl.getMoveState();
    const newPosition = this.calculateNewPosition(currentLocation, moveState);

    if (this.hasPositionChanged(currentLocation, newPosition)) {
      this.gameMapScene.checkNextPosititionCollision(
        currentLocation,
        newPosition,
        this.gameMapScene.updatePlayerPosition.bind(this.gameMapScene)
      );
    }
  }

  calculateNewPosition(currentLocation, moveState) {
    const speedModifier = this.getSpeedModifier(moveState);
    const moveDist = this.gameMapScene.speed * speedModifier;

    let { x, y } = currentLocation;
    if (moveState.isMovingUp) y -= moveDist;
    if (moveState.isMovingDown) y += moveDist;
    if (moveState.isMovingLeft) x -= moveDist;
    if (moveState.isMovingRight) x += moveDist;

    return { x, y };
  }

  getSpeedModifier(moveState) {
    const isMovingDiagonal = 
      (moveState.isMovingUp || moveState.isMovingDown) && 
      (moveState.isMovingLeft || moveState.isMovingRight);

    if (isMovingDiagonal) return 0.45;

    switch (SIMTIME.rateOfTime) {
      case 1: return 0.9;
      case 2: return 0.9 * 1.3;
      case 3: return 0.9 * 1.8;
      default: return 0.9;
    }
  }

  hasPositionChanged(oldPos, newPos) {
    return oldPos.x !== newPos.x || oldPos.y !== newPos.y;
  }

  handleMouseInteraction(p5) {
    this.gameMapScene.isMouseReleased = false;
    if (p5.mouseIsPressed) {
      this.gameMapScene.isMouseReleased = false;
      this.gameMapScene.lastFrameMousePressed = true;
    } else if (this.gameMapScene.lastFrameMousePressed) {
      this.gameMapScene.isMouseReleased = true;
      this.gameMapScene.lastFrameMousePressed = false;
      this.gameMapScene.onPlaceCrabTrap(p5);
    }
  }
}