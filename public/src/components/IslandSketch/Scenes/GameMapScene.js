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
import AssetsListGameMapScene from "./AssetsListGameMapScene";
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
    this.DEBUG_LEVEL = 0;
        
    // ----- Constructor Params ---------
    this.onCharacterSelect = onCharacterSelect;
    this.onPropertySelect = onPropertySelect;
    this.charList = charList;
    this.setCharList = (cList) => {
      setCharList(cList);
      this.charList = cList;
    };
    this.sizeVector = IslandTemplate.Image.size || sizeVector;
    this.parentAssets = parentAssetsByScene;
    // -- end Constructor Params ---------
    
    this.mapDisplayMode = 0; // 0 = standard map, 1 = dialog
    this.GUI_Time = '';
    this.GUI_Date = '';
    this.tileWidth = 32;
    this.speed = 0.5;
    this.playerx = 570;
    this.playery = 1820;

    this.scal = 1;
    this.CameraOffset = undefined;
    this.cameraControlMode = "player";

    this.testImgSec = 1;

    var tiles = [];
    this.AnimatedSprites = [];
    this.CollideEntities = [];
    this.CrabTraps = [];
    this.preloadedImages = [];
    this.GameMap = new GameTileMapManager(this, {width:64,height:64}, tiles);

    this.moveState = {};
    this.lastMoveState = 0; // 0: standing, 1:up, 2:rght, 3:dwn, 4:left

    //tmp char fix other char
    this.charPos = { x: this.playerx + 24, y: this.playery - 96 - 64 };

    this.playerInventory = new CharacterInventory([ItemsEnum["crabtrap"]]);
    this.isLoaded = false;

    this.npcKeyIndex = 0;
    this.NPCKeys = IslandTemplate.NPCKEYS;
    this.currentNPCKey = "LukasMallard";

    this.useCharImage = true;
    this.useBGImage = true;
    this.bgImage = this.parentAssets["GameMapScene"]["BGImage"];
    this.WaveSpriteSheet = this.parentAssets["GameMapScene"]["WaveSpriteSheet"];

    this.loadAssets();
    // character profile images data structure map CharKey:Str -> p5.Image
    this.characterProfileImages = {
      LukasMallard: this.parentAssets.GameMapScene.OtherPlayerProfileImage,
    };

    this.GUI = new GUIElementManager(this);
    this.loadWallData();
    this.initializeEventListeners();
    this.initializeLots();
    this.initializeCharacters();
    this.AddSceneCollideEntities();
        
    simTime.onTimeUpdate((data) => {
      this.GUI_Time = data.time12;
      this.GUI_Date = data.date;
      this.GUI.setSimulationDateTime({time: data.time12, date: data.date});
    });
    simTime.pause();
  } // end constructor
    
    AddSceneCollideEntities() {
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
          pos.properties || IslandTemplate.DEFAULTLOTPROPERTIES,
          []
        )
    );
    this.lots = [...lotEntities];
  }

  initializeCharacters() {
    this.setCharList([]);
    const characterTempList = IslandTemplateJSON.layers[
      this.getLayerIndexByName("Residents")
    ].objects.map((v) => this.createCharacterEntity(v));
    console.log(characterTempList);
    this.setCharList(characterTempList);
  }

    loadAssets() {
      AssetsListGameMapScene(this.parentAssets,this,this.charPos);
  }

  update(p5) {
    if (simTime.isPaused) simTime.start();
    if (this.mapDisplayMode === 0) {
      this.handleKeyboardUserInputUpdate();
      this.setCameraZoom(p5, IslandTemplate.VIEW_ZOOM_SETTING);

      const offsetLocal =  p5.createVector(
        this.playerx * -1 +
          (p5.width / (this.getCameraZoom()))/2,
        this.playery * -1 +(
          p5.height / (this.getCameraZoom()))/2.5
      );
      this.setCameraOffset(offsetLocal);
      
      // handle char sprites
      this.CharRunUp.update(p5);
      this.CharRunRight.update(p5);
      this.CharRunDown.update(p5);
      this.CharRunLeft.update(p5);
      
      // WIP TODO: temp: set ellie to player x y
      this.charList[this.charList.length - 1].setLocation({
        x: this.playerx,
        y: this.playery,
      });
      this.charList[this.charList.length - 1].setHidden(true);
    }
  }

  draw(p5) {
    this.update(p5);
    if (this.mapDisplayMode === 0) {
      this.renderMainView_Map(p5);
    } else {
      let otherPlayerPos = p5.createVector(1000 - 175 - 200, 250 - 200);
      this.renderMainView_Dialog(p5, otherPlayerPos);
    }
    p5.ellipseMode("CENTER");
    this.GUI.renderGUI(p5);
  }

  renderMainView_Map(p5) {
    p5.push();
    if(simTime.currentTimeOfDay){
      let tmpTimeToAlpha = (ctd)=>{
        let maxCTD = 1440;
        ctd = ctd || (maxCTD/2); // param or noon
        /*
          ctd = 0 = midnight -- black
            0 + 720 % 1440 = 720 / 1440 = .5
          ctd = 720 = noon -- light
            720 + 720 % 1440 = 0
          ctd = 1440 = midnight -- black
        */
        let ctdTmp = ctd;
        let ctdPct = Math.min((ctd + (maxCTD/2)), maxCTD) / maxCTD;
        if(ctd<=(maxCTD/2)){
          // ramp
          ctdPct = ctd/(maxCTD/2);
        }else{
          // reverse ramp
          ctdPct = ((maxCTD/2)-(ctd-(maxCTD/2)))/(maxCTD/2);
        }
        // 0 = 0, 360 = 127, 720 = 255, 1080 = 127, 1440 = 0
        return 255*ctdPct;
      }

      // tint image alpha
      p5.tint(Math.max(35,tmpTimeToAlpha(simTime.currentTimeOfDay)));
    }
    this.renderBackground(p5);
    this.renderEntities(p5, this);
    this.renderPlayer(p5);

    this.handleMouseInteraction(p5);
    if (this.DEBUG_LEVEL >= 2) {
      // draw walls
      this.CollideEntities.forEach((collider) => {
        collider.draw(p5);
      });
    }
    p5.pop();
  }

  renderMainView_Dialog(p5, otherPlayerPos) {
    p5.background(0);
    p5.image(this.parentAssets["GameMapScene"]["BGDocks"], -12, -250);
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

  renderBackground(p5) {
    p5.background("#111");//"#20D6C7");
    p5.scale(this.getCameraZoom());
    p5.translate(this.getCameraOffset().x, this.getCameraOffset().y);
    if (this.useBGImage) {
      p5.image(this.bgImage, 0, 0, this.sizeVector.x, this.sizeVector.y); //this.parent.getAssets('GameMapScene')['BGImage']
    }
  }

  renderEntities(p5) {
    this.charList.forEach((villager) => {
      villager.update(p5);
      if (!villager.isHidden()) {
        villager.draw(p5);
      }
    });
    this.lots.forEach((lot) => {
      lot.update(p5, this);
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
        this.CharIdle.draw(p5, this.playerx, this.playery); //p5.image(this.playerImage, this.playerx, this.playery);
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
        this.CharRunLeft.draw(p5, this.playerx, this.playery); //p5.image(this.playerImageLeft, this.playerx, this.playery); //parent.getAssets('GameMapScene')['PlayerImageLeft']
      } else if (this.moveState.isMovingRight) {
        this.CharRunRight.draw(p5, this.playerx, this.playery); //p5.image(this.playerImageRight, this.playerx, this.playery);
      } else {
        if (this.moveState.isMovingUp) {
          this.CharRunUp.draw(p5, this.playerx, this.playery); //p5.image(this.playerImage, this.playerx, this.playery);
        } else if (this.moveState.isMovingDown) {
          this.CharRunDown.draw(p5, this.playerx, this.playery); //p5.image(this.playerImage, this.playerx, this.playery);
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
  getCameraOffset(){
    return this.CameraOffset;
  }

  getCameraZoom(){
    return this.scal;
  }

  setCameraZoom(p5, zoomLevelInt = 2, factor = 3) {
    zoomLevelInt = Math.min(1, Math.max(5, zoomLevelInt));
    this.scal = zoomLevelInt * factor;
  }

  setCameraOffset(positionP5Vec) {
    this.CameraOffset = positionP5Vec;
  }
  /**----------- END CAMERA FN */

  /* INPUT FN */
  initializeEventListeners() {
    //window.addEventListener('wheel', (e) => this.handleZoom(e, p5));
    // window.addEventListener('mouseup', (e) => console.log(`{x:${p5.mouseX}, y:${p5.mouseY}}`));
    window.addEventListener("keydown", (e) => this.keyPressed(e));
    window.addEventListener("keyup", (e) => this.keyReleased(e));
  }

  handleKeyboardUserInputUpdate() {
      if(this.GUI.allowMoveInputKeys){
        let tmpy = this.playery;
        let tmpx = this.playerx;
        let isMovingVertical = this.isMovingUp || this.isMovingDown;
        let isMovingHorizontal = this.isMovingLeft || this.isMovingRight;
        let isMovingDiagonal = isMovingHorizontal && isMovingVertical;

        let speedModifier = .9;

        const newCallBack = (newVal, valid) => {
          this.playerx = valid ? newVal.x : this.playerx;
          this.playery = valid ? newVal.y : this.playery;
        };

        if (isMovingDiagonal) speedModifier = 0.5;

        const moveDist = this.speed * this.getCameraZoom() * speedModifier;

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
      }
  } // end handleKeys FN
  // disabled in initializeEventListeners
  /*
  handleZoom(e, p5) {
    const s = 1 - e.deltaY / 1000;
    this.scal *= s;
    console.log("scale", s);
    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    this.CameraOffset = this.getPositionInWorld(p5, mouse);
}*/

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

  handleMouseInteraction(p5) {
    if (p5.mouseIsPressed) {
      let tmpOffset = { x: this.getCameraOffset().x, y: this.getCameraOffset().y };
      tmpOffset.x -= p5.pmouseX - p5.mouseX;
      tmpOffset.y -= p5.pmouseY - p5.mouseY;
      const mouse = p5.createVector(p5.mouseX, p5.mouseY);

      let v3 = p5.createVector(this.getCameraOffset().x + p5.mouseX,
      this.getCameraOffset().y + p5.mouseY);
        // TODO fix the use of offset
      this.CrabTraps.push(new CrabTrapEntity(p5.frameCounter, v3.x, v3.y, simTime.getDate()+"|"+simTime.getTime()));

      console.log("loc: " + v3.x + " - " + v3.y);
      if (this.DEBUG_LEVEL >= 2) {
        this.setCameraOffset(p5.createVector(tmpOffset.x, tmpOffset.y));
      }
    }
  }

  /** ---------- END INPUT FNs */

  getPositionInWorld(p5,posVector){
    if(!posVector.x && posVector.x !== 0)
      posVector = p5.createVector(p5.mouseX,p5.mouseY);
      //throw new Error("getPositionInWorld param PosVector");
    return p5
        .createVector(this.getCameraOffset().x, this.getCameraOffset().y)
        .sub(posVector)
        .mult(this.getCameraZoom())
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
