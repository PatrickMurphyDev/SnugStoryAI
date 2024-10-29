// GameMapScene.js

// import dependents
import { GameScene } from "./GameScene";
import LotEntity from "../Entities/LotEntity";
import CharacterEntity from "../Entities/CharacterEntity";
import CollideRectEntity from "../Entities/CollideRectEntity";
import SimulationTime from "../../../utils/SimulationTime";
import { GUIElementManager } from "../GUIElementManager";
import { GameTileMapManager } from "../GameTileMapManager";
import CharacterInventory from "../CharacterFeatures/CharacterInventory";
import CrabTrapEntity from "../Entities/CrabTrapEntity";

// import world data
import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import IslandTemplateJSON from "../../../utils/IslandTemplateTiled.json";
import WallData from "../../../utils/WallData.json"; // Static Data: Wall Positions
import AssetsListGameMapScene from "./AssetsListGameMapScene"; // Static Data: Image Assets imported
import { ItemsEnum } from "../ItemsEnum"; // Static Data: Possible Items

// define simulation time object that tracks time and date in world
const simTime = SimulationTime.getInstance({ 'currentTimeOfDay': 600 }); // start 10 am
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
    this.lastFrame = -1;

    // process params and set 
    this.setupParams(onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector, parentAssetsByScene);
    this.initCamera(); // setup offset and zoom and control mode
    this.initMapSettings();
    this.GUI_Time = '';
    this.GUI_Date = '';

    var tiles = [];
    this.AnimatedSprites = [];
    this.CollideEntities = [];
    this.CrabTraps = [];
    this.preloadedImages = [];
    this.GameMap = new GameTileMapManager(this, { width: 64, height: 64 }, tiles);

    //tmp char fix other char
    this.charPos = { x: this.playerx + 24, y: this.playery - 96 - 64 };

    this.playerInventory = new CharacterInventory({ "Item2": 5 });
    this.isLoaded = false;

    this.npcKeyIndex = 0;
    this.NPCKeys = IslandTemplate.NPCKEYS;
    this.currentNPCKey = "LukasMallard";

    this.useCharImage = true;
    this.useBGImage = true;
    this.lotImages = {};
    // handle char sprites
    this.CharRunUp = undefined;
    this.CharRunRight = undefined;
    this.CharRunDown = undefined;
    this.CharRunLeft = undefined;

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
      this.GUI.setSimulationDateTime({ time: data.time12, date: data.date });
    });
    simTime.pause();
    simTime.setRateOfTime(3);
  } // end constructor

  setupParams(onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector, parentAssetsByScene) {
    this.onCharacterSelect = onCharacterSelect;
    this.onPropertySelect = onPropertySelect;
    this.charList = charList;
    this.setCharList = (cList) => {
      setCharList(cList);
      this.charList = cList;
    };
    this.sizeVector = IslandTemplate.Image.size || sizeVector;
    this.parentAssets = parentAssetsByScene;
  }

  initCamera() {
    this.scal = 1;
    this.CameraOffset = undefined;
    this.currentZoomLevel = 1;
    this.zoomLevels = [.4,.6,.8,.9];
    this.cameraControlMode = "player";
  }

  initMapSettings() {
    this.mapDisplayMode = 0;
    this.tileWidth = 32;
    this.speed = 0.5;
    this.playerx = 570;
    this.playery = 1820;
    this.didMove = true;
    this.lastFrameMousePressed = false;
    this.isMouseReleased = false;
    this.moveState = {};
    this.lastMoveState = 0;
  }

  AddSceneCollideEntities() {
    this.CollideEntities.push(
      new CollideRectEntity(
        66666,
        this.charPos.x + 8,
        this.charPos.y + 12,
        { x: 16, width: 16, y: 20, height: 20 },
        () => {
          //console.log("coll char");
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
    let newLots = [...IslandTemplate.newLots];
    newLots.forEach((v, i) => {
      this.lots.push(new LotEntity(v.id, v.name, v.location.x, v.location.y, { ...IslandTemplate.DEFAULTLOTPROPERTIES, ...v.lotDetails, ...{ imgObj: this.parentAssets["GameMapScene"][v.id] } }, []));
      this.CollideEntities.push(
        new CollideRectEntity(
          66666+v.id,
          v.location.x - 16,
          v.location.y - 25,
          { x: 16, width: 16, y: 20, height: 20 },
          () => {
            //console.log("coll char");
            this.GUI.openAlert(v.name, "Enter the " + v.name + " building?",v.lotDetails);
          }
        )
      );
    });
  }

  initializeCharacters() {
    this.setCharList([]);
    const characterTempList = IslandTemplateJSON.layers[
      this.getLayerIndexByName("Residents")
    ].objects.map((v) => this.createCharacterEntity(v));
    //console.log(characterTempList);
    this.setCharList(characterTempList);
  }

  loadAssets() {
    AssetsListGameMapScene(this.parentAssets, this, this.charPos);
  }

  update(p5) {
    this.lastFrame = p5.frameCount;
    if (simTime.isPaused) simTime.start();
    if (this.mapDisplayMode === 0) {
      this.handleKeyboardUserInputUpdate();
      if (this.didMove) {
        this.setCameraZoom(IslandTemplate.VIEW_ZOOM_SETTING, this.zoomLevels[this.currentZoomLevel]);
        // determine offset based on playerPosition and CameraZoom
        const offsetLocal = p5.createVector(
          (this.playerx * -1) + (p5.width / (this.getCameraZoom())) / 2,
          (this.playery * -1) + (p5.height / (this.getCameraZoom())) / 2.5
        );
        this.setCameraOffset(offsetLocal);
      }

      if (this.moveState.isMovingLeft) {
        this.CharRunLeft.update(p5);
      } else if (this.moveState.isMovingRight) {
        this.CharRunRight.update(p5);
      } else {
        if (this.moveState.isMovingUp) {
          this.CharRunUp.update(p5);
        } else if (this.moveState.isMovingDown) {
          this.CharRunDown.update(p5);
        }
      }

      // WIP TODO: temp: set ellie to player x y
      this.charList[this.charList.length - 1].setLocation({
        x: this.playerx,
        y: this.playery,
      });
      this.charList[this.charList.length - 1].setHidden(true);
    }
    this.didMove = false;
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
    if (simTime.currentTimeOfDay) {
      this.renderBackground(p5);
      this.renderEntities(p5, this);
      this.renderPlayer(p5);
      this.handleMouseInteraction(p5);
      if (this.DEBUG_LEVEL >= 2) {
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

  renderMainView_Dialog(p5, otherPlayerPos) {
    p5.background(0);
    p5.image(this.parentAssets["GameMapScene"]["BGDocks"], -12, -250); // Draw Background Image
    p5.image(
      this.parentAssets["GameMapScene"]["PlayerBackHeadImage"],
      50,
      200,
      450,
      450
    ); // Draw Player Back of Head
    p5.image(
      this.otherPlayerProfileImage,
      otherPlayerPos.x,
      otherPlayerPos.y,
      350,
      350
    ); // Draw Other Player Profile Image
    this.drawEndChatButton(p5, otherPlayerPos);
  }
  
  drawEndChatButton(p5, otherPlayerPos) {
    const pos = p5.createVector(35,otherPlayerPos.y);
    const dim = p5.createVector(150,70);
    p5.fill("blue");
    p5.rect(pos.x, pos.y, dim.x, dim.y);
    p5.fill("#ffffff");
    p5.text("End Chat", pos.x, pos.y, dim.x, dim.y);
    this.handleTargetClick(p5, pos.x, pos.y, dim.x, dim.y, () => {
      this.mapDisplayMode = 0;
    });
  }

  renderBackground(p5) {
    p5.tint(this.convertTimeOfDayToAlpha(simTime.currentTimeOfDay));
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
      ctrap.draw(p5, 255, this.getCameraOffset(), this.getCameraZoom());
    });
    this.AnimatedSprites.forEach((sprite) => {
      sprite.update(p5);
      sprite.draw(p5);
    });
  }

  renderPlayer(p5) {
    let renderCharIdle = () => {
      if (this.lastMoveState <= 2) {
        p5.push();
        p5.scale(-1, 1); // Scale -1, 1 means reverse the x axis, keep y the same.
        this.CharIdle.draw(p5, -this.playerx - 24, this.playery);//p5.image(this.playerImage, -this.playerx - this.tileWidth, this.playery); // Because the x-axis is reversed, we need to draw at different x position. negative x
        p5.pop();
      } else { // if last move state was 3 down or 4 left, and not moving then draw the standing to the left sprite
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

  renderWalls(p5) {
    this.CollideEntities.forEach((collider) => {
      collider.draw(p5);
    });
  }
  /* END RENDER FN*/

  /* CAMERA FN TODO: Move to New Class */
  getCameraOffset() {
    return this.CameraOffset;
  }

  getCameraZoom() {
    return this.scal;
  }

  setCameraZoom(zoomLevelInt = 2, factor = 3) {
    zoomLevelInt = Math.max(1, Math.min(5, zoomLevelInt));
    this.scal = zoomLevelInt * factor;
  }

  setCameraOffset(positionP5Vec) {
    this.CameraOffset = positionP5Vec;
  }
  /**----------- END CAMERA FN */

  /* INPUT FN */
  initializeEventListeners() {
    window.addEventListener("wheel", event => {
      var dir = Math.sign(event.deltaY);
        this.doUIAction(this.lastFrame,()=>{       
          if(dir > 0){
            this.currentZoomLevel--;
          }else{
            this.currentZoomLevel++;
          }
          this.currentZoomLevel = Math.max(0,Math.min(this.zoomLevels.length-1,this.currentZoomLevel));   //Math.min(this.zoomLevels.length-1, Math.max(0, this.currentZoomLevel));
        });
    });
    window.addEventListener("keydown", (e) => this.keyPressed(e));
    window.addEventListener("keyup", (e) => this.keyReleased(e));
  }

  handleKeyboardUserInputUpdate() {
    if (this.GUI.allowMoveInputKeys) {
      let tmpy = this.playery;
      let tmpx = this.playerx;
      let isMovingVertical = this.isMovingUp || this.isMovingDown;
      let isMovingHorizontal = this.isMovingLeft || this.isMovingRight;
      let isMovingDiagonal = isMovingHorizontal && isMovingVertical;
      let speedModifier = .9;
      const newCallBack = (newVal, valid) => {
        this.playerx = valid ? newVal.x : this.playerx;
        this.playery = valid ? newVal.y : this.playery;
        this.didMove = true;
      };
      if (isMovingDiagonal) speedModifier = 0.5;
      const moveDist = this.speed * this.getCameraZoom() * speedModifier;
      if (this.moveState.isMovingUp) tmpy -= moveDist;
      if (this.moveState.isMovingDown) tmpy += moveDist;
      if (this.moveState.isMovingLeft) tmpx -= moveDist;
      if (this.moveState.isMovingRight) tmpx += moveDist;

      if (tmpx !== this.playerx || tmpy !== this.playery)
        this.checkNextPosititionCollision(
          this.playerx,
          this.playery,
          tmpx,
          tmpy,
          newCallBack
        );
    }
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
    return IslandTemplate.KEYCODEMAP[code] || 0;
  }

  handleMouseInteraction(p5) {
    if (p5.mouseIsPressed) {
      this.isMouseReleased = false;
      this.lastFrameMousePressed = true;
    }else if(this.lastFrameMousePressed){      
      this.isMouseReleased = true;
      this.lastFrameMousePressed = false;
      if (this.playerInventory.getItemCount(ItemsEnum['crabtrap']) > 0) {
        let offsetLocal = this.getOffsetLocal(p5, this.getCameraOffset(), this.getCameraZoom());
        this.doUIAction(p5.frameCount, ()=>{
          this.CrabTraps.push(new CrabTrapEntity("CTE" + p5.frameCounter, offsetLocal.x, offsetLocal.y, simTime.getDate() + "|" + simTime.getTime(), p5.frameCount, (i)=>{this.playerInventory.addItem(i)}));
          this.playerInventory.removeItem(ItemsEnum['crabtrap']);
        })
      }
      this.isMouseReleased = false;
    }
  }

  getOffsetLocal(p5, offset, zoom) {
    offset = offset || p5.createVector(0,0);
    zoom = zoom || 3;
    return p5.createVector(offset.x * -1 + (p5.mouseX / zoom),offset.y * -1  + (p5.mouseY / zoom));;
  }
  /** ---------- END INPUT FNs */

  convertTimeOfDayToAlpha(ctd){
    const maxCTD = 1440;
    ctd = ctd || (maxCTD / 2); // param or noon
    const ctdPct = ctd / maxCTD; //Math.min((ctd + (maxCTD/2)), maxCTD) / maxCTD;
    const amp = 255;
    const periodVar = Math.PI * (1 / 6);
    const phaseShift = 0;
    const vertShift = 0;
    const minAlpha = 35;

    return Math.max(minAlpha, amp * (Math.sin(periodVar * (this.degrees_to_radians(360 * ctdPct) + phaseShift)) + vertShift));
  }

  degrees_to_radians(deg) { return (deg * Math.PI) / 180.0; }

  getPositionInWorld(p5, posVector) {
    if (!posVector.x && posVector.x !== 0)
      posVector = p5.createVector(p5.mouseX, p5.mouseY);
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
    if (newPosValidity) returnPos = newPos;
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
