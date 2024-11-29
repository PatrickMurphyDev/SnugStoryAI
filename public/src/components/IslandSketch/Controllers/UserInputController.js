import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import SimulationTime from "../../../utils/SimulationTime";

const SIMTIME = SimulationTime.getInstance();

export class UserInputController {
  constructor(gameMapScene) {
    this.gameMapScene = gameMapScene; //parent class that holds game map scene and player control
    this.playerControl = gameMapScene.playerControl;
    // variables to track mouse pressed length before release
    this.keyPressStartTime = 0;
    this.lastFrameKeyPressed = false;
    this.isTKeyPressed = false;
    this.isTKeyReleased = false;
    this.minPressTime = 500; // j = 0.5 seconds
    this.maxPressTime = 1500; // k = 1.5 seconds
    
    // mouse control variables
    this.lastFrameMousePressed = false;
    this.isMouseReleased = false;

    // Event listeners are added here to handle user input.
    this.initializeEventListeners();
  }

  update(p5) {
    if(this.isTKeyPressed){
      this.lastFrameKeyPressed = true;
    }else if(this.lastFrameKeyPressed){
      this.isTKeyReleased = true;
      this.lastFrameKeyPressed = false;
    }
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
    //indow.addEventListener("mousedown", this.mousePressed.bind(this));
    //window.addEventListener("mouseup", this.mouseReleased.bind(this));
  }
  /*
   * Handles mouse wheel event.
   * This method is triggered when the user scrolls the mouse wheel.
   * It adjusts the zoom level of the game map based on the scroll direction.
   */
  handleWheel(event) {
    if (!this.gameMapScene.GUI.allowMoveInputKeys) return;
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
    e.preventDefault();
    if (e.key === 't' && !this.isTKeyPressed) {
      // if t key pressed and wasn't pressed previously
      // record time when t key was pressed
      this.isTKeyPressed = true;
      this.keyPressStartTime = Date.now();
    }else if (IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]){
      this.playerControl.getMoveState()[
        IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]
      ] = true;
    }
    e.stopPropagation();
  }

  keyReleased(e) {
    e.preventDefault();
    if (e.key === 't') {
      this.isTKeyPressed = false;
      const pressDuration = this.getPressDuration(this.keyPressStartTime);
      if (pressDuration >= this.minPressTime && pressDuration <= this.maxPressTime) {
        const throwDistance = this.calculateThrowDistance(pressDuration);
        this.gameMapScene.placeCrabTrap(throwDistance);
      }
    }
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

  getPressDuration(startTime) {
    startTime = startTime || this.keyPressStartTime;
    return Date.now() - startTime;
  }

  getPressDurationPowerPct(startTime) {
    startTime = startTime || this.keyPressStartTime;
    return Math.min(Math.max((this.getPressDuration() - this.minPressTime),0),(this.maxPressTime - this.minPressTime)*.45) / (this.maxPressTime - this.minPressTime);
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

  calculateThrowDistance(pressDuration) {
    const minDistance = 50; // Minimum throw distance
    const maxDistance = 200; // Maximum throw distance
    const normalizedDuration = (pressDuration - this.minPressTime) / (this.maxPressTime - this.minPressTime);
    return minDistance + normalizedDuration * (maxDistance - minDistance);
  }

  handleMouseInteraction(p5) {
    this.isMouseReleased = false;
    if (p5.mouseIsPressed) {
      this.isMouseReleased = false;
      this.lastFrameMousePressed = true;
    } else if (this.lastFrameMousePressed) {
      this.isMouseReleased = true;
      this.lastFrameMousePressed = false;
      this.onMouseReleased(p5);
    }
  }

  onMouseReleased(p5) {
    // orient player normal
    //this.gameMapScene.onPlaceCrabTrap(p5)
  }
  
  getOffsetLocal(p5, offset, zoom) {
    offset = offset || p5.createVector(0, 0);
    zoom = zoom || 3;
    return p5.createVector(
      offset.x * -1 + p5.mouseX / zoom,
      offset.y * -1 + p5.mouseY / zoom
    );
  }
}