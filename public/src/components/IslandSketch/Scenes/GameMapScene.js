// GameMapScene.js

// import dependents
import { GameScene } from "./GameScene";
import LotEntity from "../Entities/LotEntity";
import CharacterEntity from "../Entities/CharacterEntity";
import CollideRectEntity from "../Entities/CollideRectEntity";
import SimulationTime from "../../../utils/SimulationTime";
import { GUIElementManager } from "../Controllers/GUIElementManager";
import { GameTileMapManager } from "../Controllers/GameTileMapManager";
import CharacterInventory from "../CharacterFeatures/CharacterInventory";
import CrabTrapEntity from "../Entities/CrabTrapEntity";
import PlayerController from "../Controllers/PlayerController";

// import world data
import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import IslandTemplateJSON from "../../../utils/IslandTemplateTiled.json";
import WallData from "../../../utils/WallData.json"; // Static Data: Wall Positions
import AssetsListGameMapScene from "./AssetsListGameMapScene"; // Static Data: Image Assets imported
import { ItemsEnum } from "../ConfigurationData/ItemsEnum"; // Static Data: Possible Items
import ConversationController from "../Controllers/ConversationController";
import GameDialogScene from "./GameDialogScene";
import GameViewMapScene from "./GameViewMapScene";

// define simulation time object that tracks time and date in world
const simTime = SimulationTime.getInstance({ currentTimeOfDay: 600 }); // start 10 am
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
    this.playerControl = new PlayerController(this, { x: 570, y: 1820 }, 0.4);
    this.setupParams(
      onCharacterSelect,
      onPropertySelect,
      charList,
      setCharList,
      sizeVector,
      parentAssetsByScene
    );
    this.parentAssets = parentAssetsByScene;
    this.initMapSettings();
    this.GUI_Time = "";
    this.GUI_Date = "";

    this.sleepTimeOfDay = 1300; // time of day that force sleep

    var tiles = [];
    this.AnimatedSprites = [];
    this.CollideEntities = [];
    this.CrabTraps = [];
    this.preloadedImages = [];
    this.GameMap = new GameTileMapManager(
      this,
      { width: 64, height: 64 },
      tiles
    );

    this.currentZoomLevel = 3;

    this.gameDialogScene = new GameDialogScene(this);
    this.gameViewMapScene = new GameViewMapScene(this);

    //tmp char fix other char
    this.charPos = {
      x: this.playerControl.location.x + 24,
      y: this.playerControl.location.y - 5*32,
    };

    this.playerInventory = new CharacterInventory({ Item2: 5 });
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
    this.chatData = new ConversationController(this, []);
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
    simTime.start();
    //simTime.setRateOfTime(3);
  } // end constructor

  setupParams(
    onCharacterSelect,
    onPropertySelect,
    charList,
    setCharList,
    sizeVector
  ) {
    this.onCharacterSelect = onCharacterSelect;
    this.onPropertySelect = onPropertySelect;
    this.charList = charList;
    this.setCharList = (cList) => {
      setCharList(cList);
      this.charList = cList;
    };
    this.sizeVector = IslandTemplate.Image.size || sizeVector;
  }

  initMapSettings() {
    this.isFirstFrame = true;
    this.tileWidth = 32;
    this.speed = 1.9;
    if (this.DEBUG_LEVEL > 2) this.speed += 5;
    this.playerx = 570;
    this.playery = 1820;
    this.lastFrameMousePressed = false;
    this.isMouseReleased = false;
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
          this.GUI.openAlert("Andi McNuttly", "Andi Wants to talk!", {"NPCKey":"AndiMcNuttly"});
        }
      )
    );
    this.CollideEntities.push(
      new CollideRectEntity(
        66666,
        this.charPos.x + 8 + 32*3,
        this.charPos.y + 12 - 8,
        { x: 16, width: 16, y: 20, height: 20 },
        () => {
          //console.log("coll char");
          this.GUI.openAlert("Brianna Clark", "Bri wants to chat!", {"NPCKey":"BriannaClark"});
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
      this.lots.push(
        new LotEntity(
          v.id,
          v.name,
          v.location.x,
          v.location.y,
          {
            ...IslandTemplate.DEFAULTLOTPROPERTIES,
            ...v.lotDetails,
            ...{ imgObj: this.parentAssets["GameMapScene"][v.id] },
          },
          []
        )
      );
      this.CollideEntities.push(
        new CollideRectEntity(
          66666 + v.id,
          v.location.x - 16,
          v.location.y - 25,
          { x: 16, width: 16, y: 20, height: 20 },
          () => {
            //console.log("coll char");
            this.GUI.openAlert(
              v.name,
              "Enter the " + v.name + " building?",
              v.lotDetails
            );
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
    this.checkSleepConditionUpdate();
    this.lastFrame = p5.frameCount;
    //if (simTime.isPaused) simTime.start();
    if (this.GUI.getDisplayMode() === 0) {
      this.handleKeyboardUserInputUpdate();
      this.gameViewMapScene.update(p5);
    }
    this.playerControl.setDidMove(false);
  }

  checkSleepConditionUpdate() {
    if (
      simTime.currentTimeOfDay >= this.sleepTimeOfDay &&
      !this.playerControl.isAsleep()
    ) {
      this.playerControl.setAsleep(true);
      // TODO: WIP: penalize player for not sleeping
      console.log("not in bed in time.... set sleep");
    }
  }

  draw(p5) {
    this.update(p5);
    if (this.GUI.getDisplayMode() === 0) {
      this.gameViewMapScene.draw(p5);
    } else {
      this.gameDialogScene.draw(p5);
    }
    p5.ellipseMode("CENTER");
    this.GUI.renderGUI(p5);
  }

  getCameraOffset() {
    return this.gameViewMapScene.cameraOffset;
  }

  getCameraZoom() {
    return this.gameViewMapScene.scal;
  }

  /* INPUT FN */
  initializeEventListeners() {
    window.addEventListener("wheel", (event) => {
      var dir = Math.sign(event.deltaY);
      this.doUIAction(this.lastFrame, () => {
        if (dir > 0) {
          this.currentZoomLevel--;
        } else {
          this.currentZoomLevel++;
        }
        this.currentZoomLevel = Math.max(
          0,
          Math.min(
            this.gameViewMapScene.zoomLevels.length - 1,
            this.currentZoomLevel
          )
        ); //Math.min(this.zoomLevels.length-1, Math.max(0, this.currentZoomLevel));
      });
    });
    window.addEventListener("keydown", (e) => this.keyPressed(e));
    window.addEventListener("keyup", (e) => this.keyReleased(e));
  }

  handleKeyboardUserInputUpdate() {
    if (this.GUI.allowMoveInputKeys) {
      let tmpy = this.playerControl.location.y;
      let tmpx = this.playerControl.location.x;
      let isMovingVertical = this.isMovingUp || this.isMovingDown;
      let isMovingHorizontal = this.isMovingLeft || this.isMovingRight;
      let isMovingDiagonal = isMovingHorizontal && isMovingVertical;
      let speedModifier = 0.9;
      const newCallBack = (newVal, valid) => {
        this.playerControl.location.x = valid
          ? newVal.x
          : this.playerControl.location.x;
        this.playerControl.location.y = valid
          ? newVal.y
          : this.playerControl.location.y;
        this.playerControl.setDidMove(true);
      };
      if (isMovingDiagonal) speedModifier = 0.45;
      const moveDist = this.speed * speedModifier;
      if (this.playerControl.getMoveState().isMovingUp) tmpy -= moveDist;
      if (this.playerControl.getMoveState().isMovingDown) tmpy += moveDist;
      if (this.playerControl.getMoveState().isMovingLeft) tmpx -= moveDist;
      if (this.playerControl.getMoveState().isMovingRight) tmpx += moveDist;

      if (
        tmpx !== this.playerControl.location.x ||
        tmpy !== this.playerControl.location.y
      )
        this.checkNextPosititionCollision(
          this.playerControl.location.x,
          this.playerControl.location.y,
          tmpx,
          tmpy,
          newCallBack
        );
    }
  } // end handleKeys FN

  keyPressed(e) {
    if (IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code])
      this.playerControl.getMoveState()[
        IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]
      ] = true;
    this.playerControl.setLastMoveState(0);
    e.stopPropagation(); // Don't bubble/capture the event any further
  } // end keyPressed fn

  keyReleased(e) {
    e.preventDefault(); // Cancel the native event
    if (IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]) {
      this.playerControl.getMoveState()[
        IslandTemplate.INPUTKEY_TO_STATE_MAP[e.code]
      ] = false;
      this.playerControl.setLastMoveState(this.determineLastMoveState(e.code));
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
    } else if (this.lastFrameMousePressed) {
      this.isMouseReleased = true;
      this.lastFrameMousePressed = false;
      if (this.playerInventory.getItemCount(ItemsEnum["crabtrap"]) > 0) {
        let offsetLocal = this.getOffsetLocal(
          p5,
          this.gameViewMapScene.getCameraOffset(),
          this.gameViewMapScene.getCameraZoom()
        );
        this.doUIAction(p5.frameCount, () => {
          this.CrabTraps.push(
            new CrabTrapEntity(
              "CTE" + p5.frameCounter,
              offsetLocal.x,
              offsetLocal.y,
              simTime.getDate() + "|" + simTime.getTime(),
              p5.frameCount,
              (i) => {
                this.playerInventory.addItem(i);
              }
            )
          );
          this.playerInventory.removeItem(ItemsEnum["crabtrap"]);
        });
      }
      this.isMouseReleased = false;
    }
  }

  getOffsetLocal(p5, offset, zoom) {
    offset = offset || p5.createVector(0, 0);
    zoom = zoom || 3;
    return p5.createVector(
      offset.x * -1 + p5.mouseX / zoom,
      offset.y * -1 + p5.mouseY / zoom
    );
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
    let returnPos = oldPos; //default to current/old position
    
    const newPos = { x: newPosX, y: newPosY };
    const testPosition = { x: newPos.x + 16, y: newPos.y + 30 };
    let newPosValidity = true; // is new pos valid pixel? assume true  

    // check each collider
    this.CollideEntities.forEach((collider) => {
      if (collider.contains(testPosition)) {
        newPosValidity = false;
        collider.onCollide(testPosition, collider, {          x: this.playerControl.location.x,
          y: this.playerControl.location.y,
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
