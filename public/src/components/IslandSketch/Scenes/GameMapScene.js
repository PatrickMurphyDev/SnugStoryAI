// GameMapScene.js
import { GameScene } from './GameScene';
import LotEntity from '../Entities/LotEntity';
import CharacterEntity from '../Entities/CharacterEntity';
import { IslandTemplate } from '../../../utils/IslandTemplateTile';
import IslandTemplateJSON from '../../../utils/IslandTemplateTiled.json';
import CollideRectEntity from '../Entities/CollideRectEntity';
import WallData from '../../../utils/WallData.json';

const DefaultLotProperties = {
    size: { width: 32, height: 32 },
    zoneType: "Commercial",
    price: 100000,
    fillColor: "#000000",
  };
  const viewMult = 7.5;

  const keyMap = {
    'KeyW': 'isMovingUp',
    'ArrowUp': 'isMovingUp',
    'KeyS': 'isMovingDown',
    'ArrowDown': 'isMovingDown',
    'KeyA': 'isMovingLeft',
    'ArrowLeft': 'isMovingLeft',
    'KeyD': 'isMovingRight',
    'ArrowRight': 'isMovingRight'
  };
  
export class GameMapScene extends GameScene {
  constructor(
    onCharacterSelect,
    onPropertySelect,
    charList,
    setCharList,
    sizeVector = { x: 800, y: 600 },
    parentAssetsByScene
  ) {
    super("GameMapScene");
    this.parentAssets = parentAssetsByScene;
    this.onCharacterSelect = onCharacterSelect;
    this.onPropertySelect = onPropertySelect;

    this.charList = charList;
    this.setCharList = (cList) => {
      setCharList(cList);
      this.charList = cList;
    };

    this.sizeVector = IslandTemplate.Image.size || sizeVector;
    this.scal = 1;
    this.CameraOffset = undefined;
    this.cameraControlMode = "player";

    this.bgImage = this.parentAssets["GameMapScene"]["BGImage"];
    this.charImages = [];
    this.playerImage = this.parentAssets["GameMapScene"]["PlayerImage"];
    this.playerImageLeft = this.parentAssets["GameMapScene"]["PlayerImageLeft"];
    this.playerImageRight =
      this.parentAssets["GameMapScene"]["PlayerImageRight"];

    this.otherPlayerImage =
      this.parentAssets["GameMapScene"]["OtherPlayerImage"];

      this.PlayerProfileImage = this.parentAssets['GameMapScene']['PlayerProfileImage'];
    this.lots = [];
    this.useCharImage = true;
    this.useBGImage = true;

    this.speed = 0.5;
    this.tileWidth = 32;
    this.playerx = 570;
    this.playery = 1820;
    this.isLoaded = false;

    this.moveState = {};
    this.lastMoveState = 0; // 0: standing, 1:up, 2:rght, 3:dwn, 4:left

    this.CollideEntities = [];

    this.loadWallData();
    this.initializeEventListeners();
    this.initializeLots();
    this.initializeCharacters();

    this.GUIElements = [];
    this.GUIElements.push({ x: 0, y: 650, h: 150, w: 800, fill: 150});
    this.GUIElements.push({ x: 200, y: 650, h: 150, w: 600, text: "Main UI Window" });
    this.GUIElements.push({
      x: 0,
      y: 600,
      h: 200,
      w: 200,
      isCircle: true,
      img: this.PlayerProfileImage,
      text: "Character Details",
    });
    this.GUIElements.push({ x: 800, y: 600, h: 200, w: 200, text: "UI Details Options" });

    //tmp char fix
    this.charPos = { x: this.playerx + 24, y: this.playery - 96 - 64 };
    this.CollideEntities.push(
      new CollideRectEntity(
        66666,
        this.charPos.x + 8,
        this.charPos.y + 12,
        { x: 16, width: 16, y: 20, height: 20 },
        () => {
          console.log("coll char");
        }
      )
    );
  }

  loadWallData() {
    WallData.forEach((wall) => {
      this.CollideEntities.push(
        new CollideRectEntity(wall.id, wall.x + 12, wall.y, {
          x: wall.width,
          y: wall.height,
        })
      );
    });
  }

  initializeLots() {
    // todo replace hard coded folder layer access with this.getLayerIndexByFolderAndName("Folder","Name")
    const lotEntities = IslandTemplateJSON.layers[7].layers[0]["objects"].map(
      (pos, index) =>
        new LotEntity(
          index + 1,
          pos.name || `Lot ${index + 1}`,
          pos.x * 2,
          pos.y * 2,
          pos.properties || DefaultLotProperties,
          []
        )
    );
    this.lots = [...lotEntities];
  }
  //? this.convertPropertiesToLotDetails(pos.properties) :

  initializeCharacters() {
    this.setCharList([]);
    const characterTempList = IslandTemplateJSON.layers[
      this.getLayerIndexByName("Residents")
    ].objects.map((v) => this.createCharacterEntity(v));
    this.setCharList(characterTempList);
  }

  preload(p5) {
    console.log("preload GameMapScene");
  }

  setup(p5, canvasParentRef) {
    console.log("run GameMapScene Setup");
  }

  draw(p5) {
    this.handleKeyboardUserInputUpdate();
    p5.push();
    this.setCameraZoom(p5, 5);
    this.setCameraPosition(
      p5.createVector(
        this.playerx * -1 + p5.width / viewMult + this.tileWidth / 2,
        this.playery * -1 + p5.height / viewMult + this.tileWidth / 2
      )
    );

    this.renderBackground(p5);
    this.renderEntities(p5);
    this.renderPlayer(p5);
    if (this.DEBUG_LEVEL >= 2) {
      this.handleMouseInteraction(p5);
      this.CollideEntities.forEach((collider) => {
        collider.draw(p5);
      });
    }
    p5.pop();

    p5.ellipseMode('CENTER');
    // after translate
    this.renderGUI(p5);
  }

  renderGUI(p5) {
    this.GUIElements.forEach((v) => {
      p5.fill(v.fill || 200);
      if(v.isCircle){
        p5.ellipse((v.x || 0)+v.w/2, (v.y || 0)+v.h/2, v.w || 0, v.h || 0);  
      }else{
        p5.rect(v.x || 0, v.y || 0, v.w || 0, v.h || 0);
      }
      if(v.img){
        p5.image(this.PlayerProfileImage, v.x+v.w*.1, v.y+v.h*.05, v.w*.8, v.h*.8);
        p5.fill(0);
        p5.text(v.text || "Panel", v.x, v.y+v.h*.8, v.w, v.h*.2);
      }else{
        p5.fill(0);
        p5.text(v.text || "Panel", v.x, v.y, v.w, v.h);
      }
    });
  }

  renderPlayer(p5) {
    if (
      this.useCharImage &&
      (this.moveState.isMovingDown ||
        this.moveState.isMovingUp ||
        this.moveState.isMovingLeft ||
        this.moveState.isMovingRight)
    ) {
      if (this.moveState.isMovingLeft) {
        p5.image(this.playerImageLeft, this.playerx, this.playery); //parent.getAssets('GameMapScene')['PlayerImageLeft']
      } else if (this.moveState.isMovingRight) {
        p5.image(this.playerImageRight, this.playerx, this.playery);
      } else {
        if (this.moveState.isMovingUp) {
          p5.image(this.playerImage, this.playerx, this.playery);
        } else if (this.moveState.isMovingDown) {
          p5.image(this.playerImage, this.playerx, this.playery);
        }
      }
    } else if (this.useCharImage) {
      // if not moving then, if last move state was 1 (up) or 2 (right), mirror image
      if (this.lastMoveState <= 2) {
        p5.push();
        // Scale -1, 1 means reverse the x axis, keep y the same.
        p5.scale(-1, 1);
        // Because the x-axis is reversed, we need to draw at different x position. negative x
        p5.image(
          this.playerImage,
          -this.playerx - this.tileWidth,
          this.playery
        );
        p5.pop();
      } else {
        // if last move state was 3 down or 4 left, and not moving then draw the standing to the left sprite
        p5.image(this.playerImage, this.playerx, this.playery);
      }
    } else {
      p5.rect(this.playerx, this.playery, 24, 32);
    }
  }

  renderBackground(p5) {
    p5.background("#20D6C7");
    p5.scale(this.scal);
    p5.translate(this.CameraOffset.x, this.CameraOffset.y);
    if (this.useBGImage) {
      p5.image(this.bgImage, 0, 0, this.sizeVector.x, this.sizeVector.y); //this.parent.getAssets('GameMapScene')['BGImage']
    } else {
      //this.bgImage = p5.loadImage(IslandTemplate.Image.source);
    }
    p5.noTint();
  }

  renderEntities(p5) {
    //p5.rect(this.charPos.x,this.charPos.y,16,24);
    p5.image(this.otherPlayerImage, this.charPos.x, this.charPos.y);
    this.charList.forEach((villager) => {
      villager.update();
      villager.draw(p5);
    });
    this.lots.forEach((lot) => {
      lot.update();
      //if (this.isMouseOverLot(p5, lot)) {
      // this.handleLotInteraction(p5, lot);
      // }
      lot.draw(p5);
    });
  }

  /* END RENDER FN*/

  /* CAMERA FN TODO: Move to New Class */
  setCameraZoom(p5, zoomLevelInt = 2, factor = 3) {
    zoomLevelInt = Math.min(1, Math.max(5, zoomLevelInt));
    this.scal = zoomLevelInt * factor;
    if (this.cameraControlMode === "Mouse") {
      const mouse = p5.createVector(400 + 300 + 816, 300 + 16); // Center ????? TODO:Investigate
      this.CameraOffset = p5
        .createVector(this.CameraOffset.x, this.CameraOffset.y)
        .sub(mouse)
        .mult(this.scal)
        .add(mouse);
    }
  }

  setCameraPosition(positionP5Vec) {
    this.CameraOffset = positionP5Vec;
  }

  /*  checkCollisions() {
    this.CollideEntities.forEach((collider) => {
      collider.update();
    });
  } */

  handleZoom(e, p5) {
    const s = 1 - e.deltaY / 1000;
    this.scal *= s;
    console.log("scale", s);
    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    this.CameraOffset = p5
      .createVector(this.CameraOffset.x, this.CameraOffset.y)
      .sub(mouse)
      .mult(s)
      .add(mouse);
  }
  /**----------- END CAMERA FN */
  /**----------- END CAMERA FN */
  /**----------- END CAMERA FN */

  /* INPUT FN */
  initializeEventListeners() {
    //window.addEventListener('wheel', (e) => this.handleZoom(e, p5));
    // window.addEventListener('mouseup', (e) => console.log(`{x:${p5.mouseX}, y:${p5.mouseY}}`));
    window.addEventListener("keydown", (e) => this.keyPressed(e));
    window.addEventListener("keyup", (e) => this.keyReleased(e));
  }

  handleKeyboardUserInputUpdate() {
    let tmpy = this.playery;
    let tmpx = this.playerx;
    let isMovingVertical = this.isMovingUp || this.isMovingDown;
    let isMovingHorizontal = this.isMovingLeft || this.isMovingRight;
    let isMovingDiagonal = isMovingHorizontal && isMovingVertical;

    let speedModifier = 1;

    const newCallBack = (newVal, valid) => {
      this.playery = valid ? newVal.y : this.playery;
      this.playerx = valid ? newVal.x : this.playerx;
    };

    if (isMovingDiagonal) speedModifier = 0.5;

    const moveDist = this.speed * this.scal * speedModifier;

    if (this.moveState.isMovingUp) {
      tmpy -= moveDist;
    }
    if (this.moveState.isMovingDown) {
      tmpy += moveDist;
    }
    if (this.moveState.isMovingLeft) {
      tmpx -= moveDist;
    }
    if (this.moveState.isMovingRight) {
      tmpx += moveDist;
    }

    this.checkNextPosititionCollision(
      this.playerx,
      this.playery,
      tmpx,
      tmpy,
      newCallBack
    );
  } // end handleKeys FN

  keyPressed(e) {
    if (keyMap[e.code]) this.moveState[keyMap[e.code]] = true;
    this.lastMoveState = 0;
    e.stopPropagation(); // Don't bubble/capture the event any further
  } // end keyPressed fn

  keyReleased(e) {
    e.preventDefault(); // Cancel the native event
    if (keyMap[e.code]) {
      this.moveState[keyMap[e.code]] = false;
      this.lastMoveState = this.determineLastMoveState(e.code);
    }
    e.stopPropagation(); // Don't bubble/capture the event any further
  }

  determineLastMoveState(code) {
    return (
      {
        KeyW: 1,
        ArrowUp: 1,
        KeyS: 3,
        ArrowDown: 3,
        KeyA: 4,
        ArrowLeft: 4,
        KeyD: 2,
        ArrowRight: 2,
      }[code] || 0
    );
  }

  isMouseOverLot(p5, lot) {
    return (
      p5.dist(
        lot.location.x / 2,
        lot.location.y / 2,
        (p5.mouseX - this.CameraOffset.x) / this.scal,
        (p5.mouseY - this.CameraOffset.y) / this.scal
      ) <= 15.0
    );
  }
  handleLotInteraction(p5, lot) {
    lot.setHover(true);
    if (p5.mouseIsPressed) {
      lot.setClick(true);
      this.onPropertySelect(lot);
    }
  }

  handleMouseInteraction(p5) {
    if (p5.mouseIsPressed) {
      let tmpOffset = { x: this.CameraOffset.x, y: this.CameraOffset.y };
      tmpOffset.x -= p5.pmouseX - p5.mouseX;
      tmpOffset.y -= p5.pmouseY - p5.mouseY;
      this.CameraOffset = p5.createVector(tmpOffset.x, tmpOffset.y);
    }
  }

  /** ---------- END INPUT FNs */

  checkNextPosititionCollision(
    oldPosX,
    oldPosY,
    newPosX,
    newPosY,
    returnNewValueCallback
  ) {
    const oldPos = { x: oldPosX, y: oldPosY };
    const newPos = { x: newPosX, y: newPosY };

    let returnPos = oldPos; //default to current/old position
    let newPosValidity = true; // is the new position a valid pixel?

    this.CollideEntities.forEach((collider) => {
      if (collider.contains({ x: newPos.x + 16, y: newPos.y + 30 })) {
        newPosValidity = false;
        collider.onCollide({ x: newPos.x + 16, y: newPos.y + 30 }, collider, {
          x: this.playerx,
          y: this.playery,
        });
      }
    });

    // if new position is valid, set return to newPos
    if (newPosValidity) {
      returnPos = newPos;
    }
    returnNewValueCallback(returnPos, newPosValidity);
  } // end checkNextPositionCollision FN

  getLayerIndexByName(name) {
    return IslandTemplateJSON.layers
      .map((v, i) => (v.name === name ? i : -1))
      .filter((i) => i !== -1)[0];
  }

  createCharacterEntity(resident) {
    const residenceLot = this.findRandomResidentialLot();
    const employmentLot = this.findRandomCommercialLot();

    if (residenceLot) residenceLot.occupied = true;
    if (employmentLot) employmentLot.occupied = true;

    return new CharacterEntity(
      resident.name,
      resident.age,
      resident.gender,
      resident.skills,
      resident.bio,
      resident.attributes,
      residenceLot,
      employmentLot,
      this.charImages[resident.name] || "",
      resident.img
    );
  }

  findRandomResidentialLot() {
    return this.lots.find(
      (lot) =>
        lot.lotDetails.zoneType === "Residential" &&
        Math.random() > 0.2 + (lot.occupied ? 0.3 : 0.0)
    );
  }

  findRandomCommercialLot() {
    return this.lots.find(
      (lot) =>
        lot.lotDetails.zoneType !== "Residential" &&
        !lot.occupied &&
        Math.random() > 0.6
    );
  }
}
