import { GameSlideScene } from "./GameSlideScene";
import SimulationTime from "../../../utils/SimulationTime";
import { IslandTemplate } from "../../../utils/IslandTemplateTile";

// define simulation time object that tracks time and date in world
const simTime = SimulationTime.getInstance(); // start 10 am
class GameViewMapScene extends GameSlideScene {
  constructor(parent) {
    super("GameViewMapScene");
    this.parent = parent;
    this.initCamera(); // setup offset and zoom and control mode
  }

  initCamera() {
    this.scal = 1;
    this.cameraOffset = undefined;
    this.zoomLevels = IslandTemplate.VIEW_ZOOM_SETTINGS;
    this.cameraControlMode = "player";
  }

  getCameraOffset() {
    return this.cameraOffset;
  }

  getCameraZoom() {
    return this.scal;
  }

  setCameraZoom(zoomLevelInt = 2, factor = 3) {
    zoomLevelInt = Math.max(1, Math.min(5, zoomLevelInt));
    this.scal = zoomLevelInt * factor;
  }

  setCameraOffset(positionP5Vec) {
    this.cameraOffset = positionP5Vec;
  }

  update(p5){
    this.setCameraZoom(IslandTemplate.VIEW_ZOOM_SETTING, this.zoomLevels[this.parent.currentZoomLevel]);
    if (this.parent.playerControl.getDidMove()) {
      // determine offset based on playerPosition and CameraZoom
      const offsetLocal = p5.createVector(
        (this.parent.playerControl.location.x * -1) + (p5.width / (this.getCameraZoom())) / 2,
        (this.parent.playerControl.location.y * -1) + (p5.height / (this.getCameraZoom())) / 2.5
      );
      this.setCameraOffset(offsetLocal);
    }

    // update correct sprite
    this.updatePlayerSprite(p5);

    // WIP TODO: temp: set ellie to player x y
    this.parent.charList[this.parent.charList.length - 1].setLocation({
      x: this.parent.playerControl.location.x,
      y: this.parent.playerControl.location.y,
    });
    this.parent.charList[this.parent.charList.length - 1].setHidden(true);
  }

  updatePlayerSprite(p5) {
    if (this.parent.playerControl.getMoveState().isMovingLeft) {
      this.parent.CharRunLeft.update(p5);
    } else if (this.parent.playerControl.getMoveState().isMovingRight) {
      this.parent.CharRunRight.update(p5);
    } else {
      if (this.parent.playerControl.getMoveState().isMovingUp) {
        this.parent.CharRunUp.update(p5);
      } else if (this.parent.playerControl.getMoveState().isMovingDown) {
        this.parent.CharRunDown.update(p5);
      }
    }
  }

  draw(p5) {
    p5.push();
    if (simTime.currentTimeOfDay) {
      this.renderBackground(p5);
      this.renderEntities(p5);
      this.parent.playerControl.render(p5);
      this.parent.inputHandler.handleMouseInteraction(p5);
      if (this.parent.DEBUG_LEVEL >= 2) {
        this.renderWalls(p5);
      }
    } else { // loading map scene
      this.renderLoadingScreen(p5);
    }
    p5.pop();
  }

  renderLoadingScreen(p5) {
    p5.background(60);
    p5.text("Loading...", p5.width / 2, p5.height / 2);
  }

  renderBackground(p5) {
    p5.tint(this.convertTimeOfDayToAlpha(simTime.currentTimeOfDay));
    p5.background("#111");
    p5.scale(this.getCameraZoom());
    p5.translate(this.getCameraOffset().x, this.getCameraOffset().y);
    if (this.parent.useBGImage) {
      // TODO: WIP: Image Chunks
      p5.image(this.parent.bgImage, 0, 0, this.parent.sizeVector.x, this.parent.sizeVector.y); 
    }
  }

  renderEntities(p5) {
    this.parent.charList.forEach((villager) => {
      villager.update(p5);
      if (!villager.isHidden()) {
        villager.draw(p5);
      }
    });
    this.parent.lots.forEach((lot) => {
      lot.update(p5, this.parent);
      lot.draw(p5);
    });
    this.parent.CrabTraps.forEach((ctrap) => {
      ctrap.update(p5,this.getCameraOffset(),this.getCameraZoom());
      ctrap.draw(p5, 255, this.getCameraOffset(), this.getCameraZoom());
    });
    this.parent.AnimatedSprites.forEach((sprite) => {
      sprite.update(p5);
      sprite.draw(p5);
    });
  }

  renderWalls(p5) {
    this.parent.CollideEntities.forEach((collider) => {
      collider.draw(p5);
    });
  }
  
  convertTimeOfDayToAlpha(ctd){
    const maxCTD = 1440;
    ctd = ctd || (maxCTD / 2); // param or noon
    const ctdPct = ctd / maxCTD; //Math.min((ctd + (maxCTD/2)), maxCTD) / maxCTD;
    const amp = 255;
    const periodVar = Math.PI * (1 / 6);
    const phaseShift = 0;
    const vertShift = 0;
    const minAlpha = 35;

    const degrees_to_radians = (deg) => { return (deg * Math.PI) / 180.0; }

    return Math.max(minAlpha, amp * (Math.sin(periodVar * (degrees_to_radians(360 * ctdPct) + phaseShift)) + vertShift));
  }

}

export default GameViewMapScene;
