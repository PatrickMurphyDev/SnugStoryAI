// GameMapScene.js

// import dependents
import SimulationTime from "../../../utils/SimulationTime";
import { GameScene } from "./GameScene";
import LotEntity from "../Entities/LotEntity";
import CharacterEntity from "../Entities/CharacterEntity";
import CollideRectEntity from "../Entities/CollideRectEntity";
import { GUIElementManager } from "../Controllers/GUIElementManager";
import CharacterInventory from "../CharacterFeatures/CharacterInventory";
import CrabTrapEntity from "../Entities/CrabTrapEntity";
import PlayerController from "../Controllers/PlayerController";

// import world data
import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import WallData from "../../../utils/WallData.json"; // Static Data: Wall Positions
import AssetsListGameMapScene from "./AssetsListGameMapScene"; // Static Data: Image Assets imported
import { ItemsEnum } from "../ConfigurationData/ItemsEnum"; // Static Data: Possible Items
import ConversationController from "../Controllers/ConversationController";
import GameDialogScene from "./GameDialogScene";
import GameViewMapScene from "./GameViewMapScene";
import { UserInputController } from "../Controllers/UserInputController";

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
    this.OPTIONS = { "enable_socket-load-world": false };
    this.parentAssets = parentAssetsByScene;
    this.initMapSettings();
    this.GUI_Time = "";
    this.GUI_Date = "";

    this.sleepTimeOfDay = 1300; // time of day that force sleep

    this.AnimatedSprites = [];
    this.CollideEntities = [];
    this.CrabTraps = [];
    this.preloadedImages = [];
    /* this.GameMap = new GameTileMapManager(
      this,
      { width: 64, height: 64 },
      tiles
    ); */

    this.currentZoomLevel = 3;

    this.gameDialogScene = new GameDialogScene(this);
    this.gameViewMapScene = new GameViewMapScene(this);

    //tmp char fix other char
    this.charPos = {
      x: this.playerControl.location.x + 24 + 2,
      y: this.playerControl.location.y - 1 * 32,
    };

    this.playerInventory = new CharacterInventory(
      1300,
      { Item2: 5 },
      { Item2: ItemsEnum.Item2 }
    );
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
    this.inputHandler = new UserInputController(this);
    this.initializeLots();
    this.initializeCharacters();
    this.AddSceneCollideEntities();

    simTime.onTimeUpdate((data) => {
      this.GUI_Time = data.time12;
      this.GUI_Date = data.date;
      this.GUI.setSimulationDateTime({ time: data.time12, date: data.date });
    });
    simTime.start();
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
        6666556,
        this.charPos.x + 8 + 13 * 32,
        this.charPos.y + 12 - 15 * 32,
        { x: 16, width: 16, y: 20, height: 20 },
        (p, o, o2) => {
          o.setEnabled(false);
          this.playerInventory.addItem(ItemsEnum.Item2, 5);
        }
      )
    );
    this.CollideEntities.push(
      new CollideRectEntity(
        66666,
        this.charPos.x + 8,
        this.charPos.y + 12,
        { x: 16, width: 16, y: 20, height: 20 },
        () => {
          this.GUI.openAlert(
            "Andi McNuttly",
            "Andi wants to welcome you to te island!",
            {
              NPCKey: "AndiMcNuttly",
              msg: "Hey Ellie! So excited you finally arrived on the island! I'll help show you to your property!",
            }
          );
        }
      )
    );
    this.CollideEntities.push(
      new CollideRectEntity(
        66666,
        this.charPos.x + 8 + 32 * 3,
        this.charPos.y + 12 - 32 * 4,
        { x: 16, width: 16, y: 20, height: 20 },
        () => {
          this.GUI.openAlert("Brianna Clark", "Bri wants to chat!", {
            NPCKey: "BriannaClark",
          });
        }
      )
    );
  }

  findCharByNPCKey(npcKeyParam){
    let retVal = {};
    this.charList.forEach((v,i,a)=>{
      //console.log(v.getKey() + " " + npcKeyParam + " " + (v.getKey() === npcKeyParam));
      if(v.getKey() === npcKeyParam){
        retVal = v;
      }
    });
    return retVal;
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
    this.lots = [];
    let newLots = [...IslandTemplate.Buildings];
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
            this.GUI.AlertWindow.setDetails(v.lotDetails);
            if (v.id === "PlayerCabin") {
              this.GUI.openAlert("Player Cabin", "Sleep?", v.lotDetails);
            } else {
              this.GUI.openAlert(
                v.name,
                "Enter the " + v.name + " building?",
                v.lotDetails
              );
            }
          }
        )
      );
    });
  }

  initializeCharacters() {
    this.setCharList([]);
    const characterTempList = IslandTemplate.Residents.map((v) =>
      this.createCharacterEntity(v)
    );
    //console.log(characterTempList);
    this.setCharList(characterTempList);
    if (this.OPTIONS["enable_socket-load-world"]) {
      this.chatData.loadWorld();
    }
  }

  loadAssets() {
    AssetsListGameMapScene(this.parentAssets, this, this.charPos);
  }

  update(p5) {
    this.checkSleepConditionUpdate();
    this.lastFrame = p5.frameCount;
    if (this.GUI.getDisplayMode() === 0) {
      this.inputHandler.handleKeyboardUserInput();
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
      this.playerControl.setLocation({ x: 500, y: 800 });
      this.playerInventory.setCash(this.playerInventory.getCash() - 200); // penalize player for not sleeping
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

  updatePlayerPosition(newPosition, isValid) {
    if (isValid) {
      this.playerControl.location = newPosition;
      this.playerControl.setDidMove(true);
    }
  }

  handleMouseInteraction(p5) {
    this.isMouseReleased = false;
    if (p5.mouseIsPressed) {
      //pressed track
      this.isMouseReleased = false;
      this.lastFrameMousePressed = true;
    } else if (this.lastFrameMousePressed) {
      //released
      this.isMouseReleased = true;
      this.lastFrameMousePressed = false;
      this.onPlaceCrabTrap(p5);
    }
  }

  onPlaceCrabTrap(p5) {
    if (this.playerInventory.getItemCount(ItemsEnum["Item2"]) > 0) {
      this.placeCrabTrap(p5);
    }
  }

  placeCrabTrap(p5) {
    let offsetLocal = this.getOffsetLocal(
      p5,
      this.gameViewMapScene.getCameraOffset(),
      this.gameViewMapScene.getCameraZoom()
    );
    this.doUIAction(p5.frameCount, () => {
      this.CrabTraps.push(
        new CrabTrapEntity(
          this,
          "CTE" + p5.frameCounter,
          offsetLocal.x,
          offsetLocal.y,
          simTime.getDate() + "|" + simTime.getTime(),
          p5.frameCount,
          (i) => {
            this.doUIAction(p5.frameCount, () => {
              this.playerInventory.addItem(ItemsEnum["Item2"]);
              this.playerInventory.addItem(i);
            });
          }
        )
      );
      this.playerInventory.removeItem(ItemsEnum["Item2"]);
    });
  }

  // get mouse position in world
  getOffsetLocal(p5, offset, zoom) {
    offset = offset || p5.createVector(0, 0);
    zoom = zoom || 3;
    return p5.createVector(
      offset.x * -1 + p5.mouseX / zoom,
      offset.y * -1 + p5.mouseY / zoom
    );
  }
  /** ---------- END INPUT FNs */

  checkNextPosititionCollision(oldPos, newPos, returnNewValueCallback) {
    let returnPos = oldPos; //default to current/old position
    const testPosition = { x: newPos.x + 16, y: newPos.y + 30 };
    let newPosValidity = true; // is new pos valid pixel? assume true

    // check each collider
    this.CollideEntities.forEach((collider) => {
      if (collider.contains(testPosition)) {
        newPosValidity = false;
        collider.onCollide(testPosition, collider, {
          x: this.playerControl.location.x,
          y: this.playerControl.location.y,
        });
      }
    });

    // if new position is valid, set return to newPos
    if (newPosValidity) returnPos = newPos;
    returnNewValueCallback(returnPos, newPosValidity);
  } // end checkNextPositionCollision FN

  /* Called by InitializeCharacters for each char
    Parameters: Resident
    Returns: new CharacterEntity object 
  */
  createCharacterEntity(resident) {
    return new CharacterEntity(
      { x: resident.x || 0, y: resident.y || 0 },
      resident.name || "Char 1",
      resident.nameObj || {first: "First",last:"Last"},
      resident.age || 25,
      resident.gender || "Female",
      resident.skills || [],
      resident.bio || resident.details.description || "",
      resident.attributes || [],
      resident.residenceLot || { location: { x: 800, y: 800 } },
      resident.employmentLot || { location: { x: 900, y: 900 } },
      resident.pImage || "", //this.charImages[resident.name] ||
      resident.img || "AndiMcNuttley.png"
    );
  }
}
