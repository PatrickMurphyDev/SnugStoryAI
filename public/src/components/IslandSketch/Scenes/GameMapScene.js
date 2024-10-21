// GameMapScene.js

// import dependents
import { GameScene } from "./GameScene";
import LotEntity from "../Entities/LotEntity";
import CharacterEntity from "../Entities/CharacterEntity";
import CollideRectEntity from "../Entities/CollideRectEntity";
import SimulationTime from "../../../utils/SimulationTime";
import { GUIElementManager } from "../GUIElementManager";
import { GameTileMapManager } from "../GameTileMapManager";

// import world data
import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import IslandTemplateJSON from "../../../utils/IslandTemplateTiled.json";
import WallData from "../../../utils/WallData.json";
import AnimatedSpriteEntity from "../Entities/AnimatedSpriteEntity";
import CharacterInventory from "../CharacterFeatures/CharacterInventory";
import { ItemsEnum } from "../ItemsEnum";
import CrabTrapEntity from "../Entities/CrabTrapEntity";

// define simulation time object that tracks time and date in world
const simTime = new SimulationTime();
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

    this.DEBUG_LEVEL = 0;
    this.sizeVector = IslandTemplate.Image.size || sizeVector;
    this.scal = 1;
    this.CameraOffset = undefined;
    this.cameraControlMode = "player";
    this.mapDisplayMode = 0; // 0 = standard map, 1 = dialog
    this.testImgSec = 1;

    this.GUI_Time = '';
    this.GUI_Date = '';
    var tiles = [];
    this.GameMap = new GameTileMapManager(this, {width:64,height:64}, tiles);

    this.speed = 0.5;
    this.tileWidth = 32;
    this.playerx = 570;
    this.playery = 1820;
    this.playerInventory = new CharacterInventory([ItemsEnum["crabtrap"]]);
    this.isLoaded = false;

    //tmp char fix
    this.charPos = { x: this.playerx + 24, y: this.playery - 96 - 64 };

    this.bgImage = this.parentAssets["GameMapScene"]["BGImage"];
    this.WaveSpriteSheet = this.parentAssets["GameMapScene"]["WaveSpriteSheet"];
    this.frameCounter = 0;
    this.npcKeyIndex = 0;
    this.NPCKeys = IslandTemplate.NPCKEYS;
    this.currentNPCKey = "LukasMallard";

    this.AnimatedSprites = [];
    this.CollideEntities = []; // wall data structure
    this.lots = [];
    this.CrabTraps = [];

    this.loadAssets();
    this.useCharImage = true;
    this.useBGImage = true;

    this.moveState = {};
    this.lastMoveState = 0; // 0: standing, 1:up, 2:rght, 3:dwn, 4:left


    // character profile images data structure map CharKey:Str -> p5.Image
    this.characterProfileImages = {
      LukasMallard: this.parentAssets.GameMapScene.OtherPlayerProfileImage,
    };

    this.GUI = new GUIElementManager(this);
    this.loadWallData();
    this.initializeEventListeners();
    this.initializeLots();
    this.initializeCharacters();

    this.CollideEntities.push(
      new CollideRectEntity(
        66666,
        this.charPos.x + 8,
        this.charPos.y + 12,
        { x: 16, width: 16, y: 20, height: 20 },
        () => {
          console.log("coll char");
          this.GUI.openAlert();
        }
      )
    );
    simTime.onTimeUpdate((data) => {
      this.GUI_Time = data.time12;
      this.GUI_Date = data.date;
      this.GUI.setSimulationDateTime({time: data.time12, date: data.date});
    });
    simTime.pause();
  } // end constructor

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
          pos.properties || IslandTemplate.DEFAULTLOTPROPERTIES,
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
    console.log(characterTempList);
    this.setCharList(characterTempList);
  }

  loadAssets() {
    this.AnimatedSprites.push(
      new AnimatedSpriteEntity(
        "as2323",
        this.parentAssets["GameMapScene"]["WaveSpriteSheet"],
        640,
        1728,
        { width: 32, height: 32 },
        { columns: 4, rows: 1 },
        0,
        30, 
        1
      )
    );
    this.AnimatedSprites.push(
      new AnimatedSpriteEntity(
        "as2323",
        this.parentAssets["GameMapScene"]["OtherCharSheet"],
        this.charPos.x,
        this.charPos.y,
        { width: 24, height: 32 },
        { columns: 3, rows: 4 },
        1, // frame offset
        -1, // speed
        2 // row
      )
    );

    this.playerImage = this.parentAssets["GameMapScene"]["PlayerImage"];
    this.playerImageLeft = this.parentAssets["GameMapScene"]["PlayerImageLeft"];
    this.playerImageRight =
      this.parentAssets["GameMapScene"]["PlayerImageRight"];

    this.otherPlayerImage =
      this.parentAssets["GameMapScene"]["OtherPlayerImage"];
    this.otherPlayerProfileImage =
      this.parentAssets["GameMapScene"]["OtherPlayerProfileImage"];

    this.PlayerProfileImage =
      this.parentAssets["GameMapScene"]["PlayerProfileImage"];
    this.GameMapSceneUI = this.parentAssets["GameMapScene"]["GameMapSceneUI"];
    this.GameMapSceneUIBanner =
      this.parentAssets["GameMapScene"]["GameMapSceneUIBanner"];

    this.AnimatedSprites.push(
      new AnimatedSpriteEntity(
        "as2324",
        this.parentAssets["GameMapScene"]["WaveSpriteSheet"],
        640 + 32,
        1728,
        { width: 32, height: 32 },
        { columns: 4, rows: 1 },
        1
      )
    );
    this.CharRunUp = new AnimatedSpriteEntity(
      "as2326",
      this.parentAssets["GameMapScene"]["NewCharSheet"],
      0,
      0,
      { width: 24, height: 32 },
      { columns: 3, rows: 4 },
      0,
      10,
      0
    );
    this.CharRunRight = new AnimatedSpriteEntity(
      "as2327",
      this.parentAssets["GameMapScene"]["NewCharSheet"],
      0,
      0,
      { width: 24, height: 32 },
      { columns: 3, rows: 4 },
      0,
      10,
      1
    );
    this.CharRunDown = new AnimatedSpriteEntity(
      "as2328",
      this.parentAssets["GameMapScene"]["NewCharSheet"],
      0,
      0,
      { width: 24, height: 32 },
      { columns: 3, rows: 4 },
      0,
      10,
      2
    );
    this.CharRunLeft = new AnimatedSpriteEntity(
      "as2329",
      this.parentAssets["GameMapScene"]["NewCharSheet"],
      0,
      0,
      { width: 24, height: 32 },
      { columns: 3, rows: 4 },
      0,
      10,
      3
    );
    this.CharIdle = new AnimatedSpriteEntity(
      "as2329",
      this.parentAssets["GameMapScene"]["NewCharSheet"],
      0,
      0,
      { width: 24, height: 32 },
      { columns: 3, rows: 4 },
      1,
      0,
      2
    );
  }

  update(p5) {
    if (simTime.isPaused) simTime.start();
    // if frame based timer expires
    if (this.frameCounter >= p5.frameRate() * this.testImgSec) {
      this.frameCounter = 0;
      //this.npcKeyIndex++; // remove move ahead index
      //this.currentNPCKey = this.NPCKeys[this.npcKeyIndex % this.NPCKeys.length];
    } else if (this.characterProfileImages[this.currentNPCKey]) {
      // if timer not expired and the char profileimg isnt null
      this.frameCounter++; // increment timer of frames this image has been displayed
    }

    if (this.mapDisplayMode === 0) {
      this.handleKeyboardUserInputUpdate();
      this.setCameraZoom(p5, IslandTemplate.VIEW_ZOOM_SETTING);
      this.setCameraPosition(
        p5.createVector(
          this.playerx * -1 +
            p5.width / IslandTemplate.VIEW_ZOOM_MULTIPLIER +
            this.tileWidth / 2,
          this.playery * -1 +
            p5.height / IslandTemplate.VIEW_ZOOM_MULTIPLIER +
            this.tileWidth / 2
        )
      );
    }

    this.CharRunUp.update(p5);
    this.CharRunRight.update(p5);
    this.CharRunDown.update(p5);
    this.CharRunLeft.update(p5);

    // temp: set ellie to player x y
    this.charList[this.charList.length - 1].setLocation({
      x: this.playerx,
      y: this.playery,
    });
    this.charList[this.charList.length - 1].setHidden(true);
  }

  draw(p5) {
    this.update(p5);
    if (this.mapDisplayMode === 0) {
      p5.push();
      this.renderBackground(p5);
      this.renderEntities(p5);
      this.renderPlayer(p5);

      this.handleMouseInteraction(p5);
      if (this.DEBUG_LEVEL >= 2) {
        // draw walls
        this.CollideEntities.forEach((collider) => {
          collider.draw(p5);
        });
      }
      p5.pop();
    } else {
      let otherPlayerPos = p5.createVector(1000 - 175 - 200, 250 - 200);
      p5.background(0);
      p5.image(this.parentAssets["GameMapScene"]["BGDocks"], -12, -250);
      //p5.rect(100, 400, 150, 150);
      p5.image(
        this.parentAssets["GameMapScene"]["PlayerBackHeadImage"],
        50,
        200,
        450,
        450
      );
      p5.image(
        this.otherPlayerProfileImage,
        otherPlayerPos.x,
        otherPlayerPos.y,
        350,
        350
      );
      p5.fill("blue");
      p5.rect(35, otherPlayerPos.y, 150, 70);
      p5.fill("#ffffff");
      p5.text("End Chat", 35, otherPlayerPos.y, 150, 70);
      this.handleTargetClick(p5, 35, otherPlayerPos.y, 150, 70, () => {
        this.mapDisplayMode = 0;
      });
    }
    p5.ellipseMode("CENTER");
    // after translate
    this.GUI.renderGUI(p5);
  }

  renderBackground(p5) {
    // set bg color of water
    p5.background("#20D6C7");

    // set Camera Settings
    p5.scale(this.scal);
    p5.translate(this.CameraOffset.x, this.CameraOffset.y);

    // draw map bg
    if (this.useBGImage) {
      p5.image(this.bgImage, 0, 0, this.sizeVector.x, this.sizeVector.y); //this.parent.getAssets('GameMapScene')['BGImage']
    } // else { //this.bgImage = p5.loadImage(IslandTemplate.Image.source); }
    //p5.noTint();
  }

  renderEntities(p5) {
    //p5.rect(this.charPos.x,this.charPos.y,16,24);
    //p5.image(this.otherPlayerImage, this.charPos.x, this.charPos.y);

    this.charList.forEach((villager) => {
      villager.update(p5);
      if (!villager.isHidden()) {
        villager.draw(p5);
      }
    });
    this.lots.forEach((lot) => {
      lot.update();
      //if (this.isMouseOverLot(p5, lot)) {
      // this.handleLotInteraction(p5, lot);
      // }
      lot.draw(p5);
    });

    this.CrabTraps.forEach((ctrap) => {
      ctrap.update(p5);
      ctrap.draw(p5);
    });

    this.AnimatedSprites.forEach((sprite) => {
      sprite.update(p5);
      sprite.draw(p5);
    });
  }

  renderPlayer(p5) {
    let renderCharIdle = () => {
      if (this.lastMoveState <= 2 && false) {
        p5.push();
        // Scale -1, 1 means reverse the x axis, keep y the same.
        p5.scale(-1, 1);
        // Because the x-axis is reversed, we need to draw at different x positio n. negative x
        p5.image(
          this.playerImage,
          -this.playerx - this.tileWidth,
          this.playery
        );
        p5.pop();
      } else {
        // if last move state was 3 down or 4 left, and not moving then draw the standing to the left sprite
        //p5.image(this.playerImage, this.playerx, this.playery);
        this.CharIdle.draw(p5, this.playerx, this.playery);
      }
    };
    if (
      this.useCharImage &&
      (this.moveState.isMovingDown ||
        this.moveState.isMovingUp ||
        this.moveState.isMovingLeft ||
        this.moveState.isMovingRight)
    ) {
      if (this.moveState.isMovingLeft) {
        //p5.image(this.playerImageLeft, this.playerx, this.playery); //parent.getAssets('GameMapScene')['PlayerImageLeft']
        this.CharRunLeft.draw(p5, this.playerx, this.playery);
      } else if (this.moveState.isMovingRight) {
        //p5.image(this.playerImageRight, this.playerx, this.playery);
        this.CharRunRight.draw(p5, this.playerx, this.playery);
      } else {
        if (this.moveState.isMovingUp) {
          //p5.image(this.playerImage, this.playerx, this.playery);
          this.CharRunUp.draw(p5, this.playerx, this.playery);
        } else if (this.moveState.isMovingDown) {
          //p5.image(this.playerImage, this.playerx, this.playery);
          this.CharRunDown.draw(p5, this.playerx, this.playery);
        }
      }
    } else if (this.useCharImage) {
      renderCharIdle();
    } else {
      // no char image def box
      p5.rect(this.playerx, this.playery, 24, 32);
    }
  }

  /* END RENDER FN*/

  /* CAMERA FN TODO: Move to New Class */
  setCameraZoom(p5, zoomLevelInt = 2, factor = 3) {
    zoomLevelInt = Math.min(1, Math.max(5, zoomLevelInt));
    this.scal = zoomLevelInt * factor;
    if (this.cameraControlMode === "Mouse") {
      // currently set to player does not run
      const mouse = p5.createVector(400 + 300 + 816, 300 + 16); // Center ????? TODO:Investigate
      this.CameraOffset = this.getPositionInWorld(p5,mouse);
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
    this.CameraOffset = this.getPositionInWorld(p5, mouse);
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
    if (IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code])
      this.moveState[IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]] = true;
    this.lastMoveState = 0;
    e.stopPropagation(); // Don't bubble/capture the event any further
  } // end keyPressed fn

  keyReleased(e) {
    e.preventDefault(); // Cancel the native event
    if (IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]) {
      this.moveState[IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]] = false;
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
      const mouse = p5.createVector(p5.mouseX, p5.mouseY);

      let v3 = p5.createVector((Math.abs(this.CameraOffset.x) + p5.mouseX),
      (Math.abs(this.CameraOffset.y) + p5.mouseY));
      this.CrabTraps.push(new CrabTrapEntity(p5.frameCounter, v3.x, v3.y, simTime.getDate()+"|"+simTime.getTime()));

      console.log("loc: " + v3.x + " - " + v3.y);
      if (this.DEBUG_LEVEL >= 2) {
        this.CameraOffset = p5.createVector(tmpOffset.x, tmpOffset.y);
      }
    }
  }

  /** ---------- END INPUT FNs */

  getPositionInWorld(p5,posVector){
    if(!posVector.x && posVector.x !== 0)
      posVector = p5.createVector(p5.mouseX,p5.mouseY);
      //throw new Error("getPositionInWorld param PosVector");
    return p5
        .createVector(this.CameraOffset.x, this.CameraOffset.y)
        .sub(posVector)
        .mult(this.scal)
        .add(posVector);
  }

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

  /* Called by InitializeCharacters for each char
    Parameters: Resident
    Returns: new CharacterEntity object 
  */
  createCharacterEntity(resident) {
    const residenceLot = this.findRandomResidentialLot();
    const employmentLot = this.findRandomCommercialLot();

    if (residenceLot) residenceLot.occupied = true;
    if (employmentLot) employmentLot.occupied = true;

    return new CharacterEntity(
      { x: resident.x, y: resident.y },
      resident.name,
      resident.age,
      resident.gender,
      resident.skills,
      resident.bio,
      resident.attributes,
      residenceLot,
      employmentLot,
      "", //this.charImages[resident.name] ||
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
