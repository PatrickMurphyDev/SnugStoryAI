// GameMapScene.js
/*
1. **Class: GameMapScene**
   - Extends the `GameScene` class
   - Manages the main game map, including characters, lots, and user interactions

2. **Key Properties:**
   - `playerControl`: Manages player movement and position
   - `charList`: List of characters in the game
   - `lots`: Array of game lots (buildings)
   - `CollideEntities`: Array of collidable objects
   - `playerInventory`: Manages player's inventory
   - `GUI`: Handles GUI elements
   - `chatData`: Manages conversation data
   - `inputHandler`: Handles user input

3. **Initialization Methods:**
   - `constructor`: Sets up initial game state, loads assets, and initializes game components
   - `setupParams`: Configures parameters passed to the scene
   - `initMapSettings`: Initializes map-related settings
   - `AddSceneCollideEntities`: Adds collision entities to the scene
   - `loadWallData`: Loads wall data for collision detection
   - `initializeLots`: Sets up game lots (buildings)
   - `initializeCharacters`: Initializes game characters
   - `loadAssets`: Loads game assets

4. **Utility Methods:**
   - `findCharByNPCKey`: Finds a character by their NPC key
   - `getMouseScreenPosition`: Gets the mouse position in screen coordinates
   - `getMouseWorldPosition`: Gets the mouse position in world coordinates
   - `convertScreenPositionToWorldPosition`: Converts screen coordinates to world coordinates
   - `convertWorldPositionToScreenPosition`: Converts world coordinates to screen coordinates

5. **Update Method:**
   - `update`: Main update loop for the game scene

6. **Time Management:**
   - Uses `SimulationTime` to manage in-game time and date

7. **Subcomponents:**
   - `GameDialogScene`: Manages dialog interactions
   - `GameViewMapScene`: Handles map viewing functionality

This class serves as the core of the game's map scene, managing various aspects such as character movement, interactions, GUI elements, and game state. It integrates multiple components to create a cohesive game environment.
*/


// import dependents
import SimulationTime from "../../../utils/SimulationTime";
import { GameScene } from "./GameScene";
import { GUIElementManager } from "../Controllers/GUIElementManager";
import PlayerController from "../Controllers/PlayerController";
import CharacterInventory from "../CharacterFeatures/CharacterInventory";
import LotEntity from "../Entities/LotEntity";
import CharacterEntity from "../Entities/CharacterEntity";
import CollideRectEntity from "../Entities/CollideRectEntity";
import CrabTrapEntity from "../Entities/CrabTrapEntity";
import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import WallData from "../ConfigurationData/WallData.json"; // Static Data: Wall Positions
import LoadAnimatedSpritesAndAssetsHelper from "../Objects/LoadAnimatedSpritesAndAssetsHelper"; // Static Data: Image Assets imported
import { ItemsEnum } from "../ConfigurationData/ItemsEnum"; // Static Data: Possible Items
import SocketClientInterface from "../Controllers/SocketClientInterface";
import ConversationController from "../Controllers/ConversationController";
import GameDialogScene from "./GameDialogScene";
import GameViewMapScene from "./GameViewMapScene";
import { UserInputController } from "../Controllers/UserInputController";
import { GameTileMapManager } from "../Controllers/GameTileMapManager";

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
    this.OPTIONS = { "enable_socket-load-world": false };
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
    this.p5 = undefined;

    this.sleepTimeOfDay = 1300; // time of day that force sleep

    this.AnimatedSprites = [];
    this.CollideEntities = [];
    this.CrabTraps = [];
    this.preloadedImages = [];

    this.currentZoomLevel = 3;
    this.currentInventoryOffset = 0;

    this.gameDialogScene = new GameDialogScene(this);
    this.gameViewMapScene = new GameViewMapScene(this);
    this.nextGameStateSaveID = -1; // reset saveID after load state

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

    this.TileMovementMap = new GameTileMapManager(this);

    this.GUI = new GUIElementManager(this);
    this.SocketClientInterface = new SocketClientInterface(this);
    this.chatData = new ConversationController(this, [], this.SocketClientInterface);
    this.loadWallData();
    this.inputHandler = new UserInputController(this);
    this.initializeLots();
    this.initializeCharacters();
    this.AddSceneCollideEntities();

    // HANDLE LOAD GAME STATE
    this.SocketClientInterface.onLoadGameStateData((data) => {
      console.log("Load game state data:", data);
      this.playerControl.location = data.player.location;
      const offsetLocal = this.p5.createVector(
        (data.player.location.x * -1) + (this.p5.width / (this.getCameraZoom())) / 2,
        (data.player.location.y * -1) + (this.p5.height / (this.getCameraZoom())) / 2.5
      );
      this.gameViewMapScene.setCameraOffset(offsetLocal); //{x: -1*(data.player.location.x - this.p5.width/2), y: -1*(data.player.location.y + (this.p5.height/2))}
    });

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
  }

  AddSceneCollideEntities() {
    // Add a item pickup collision to add 5 crab traps (Item2)
    // todo make ItemPickup its own entity
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

    // Add Andi NPC
    this.CollideEntities.push(
      new CollideRectEntity(
        66666,
        this.charPos.x + 8,
        this.charPos.y + 12,
        { x: 16, width: 16, y: 20, height: 20 },
        () => {
          this.GUI.openAlert(
            "Andi McNuttly",
            "Andi wants to welcome you to the island!",
            {
              NPCKey: "AndiMcNuttly",
              msg: "Hey Ellie! So excited you finally arrived on the island! I'll help show you to your property!",
            }
          );
        }
      )
    );

    // Add Brianna NPC
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
      if(v.getKey() === npcKeyParam){
        retVal = v;
      }
    });
    return retVal;
  }

  loadGameState(saveID) {
    console.log("Load game state: ", saveID);
    this.SocketClientInterface.loadGameState(saveID);
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
    this.setCharList(characterTempList);
    if (this.OPTIONS["enable_socket-load-world"]) {
      this.chatData.loadWorld();
    }
  }

  loadAssets() {
    LoadAnimatedSpritesAndAssetsHelper(this.parentAssets, this, this.charPos);
  }

  setNPCKey(npcKey) {
    this.currentNPCKey = npcKey;
  }

  getNPCKey() {
    return this.currentNPCKey;
  }

  getMouseScreenPosition(p5) {
    return {
      x: p5.mouseX,
      y: p5.mouseY
    };
  }
  
  getMouseWorldPosition(p5) {
    return this.convertScreenPositionToWorldPosition({x: p5.mouseX, y:p5.mouseY});
  }

  convertScreenPositionToWorldPosition(screenPos) {
    return {
      x: screenPos.x / this.gameViewMapScene.getCameraZoom() - this.gameViewMapScene.getCameraOffset().x,
      y: screenPos.y / this.gameViewMapScene.getCameraZoom() - this.gameViewMapScene.getCameraOffset().y
    };
  }

  convertWorldPositionToScreenPosition(worldPos) {
    return {
      x: worldPos.x * this.gameViewMapScene.getCameraZoom() + this.gameViewMapScene.getCameraOffset().x,
      y: worldPos.y * this.gameViewMapScene.getCameraZoom() + this.gameViewMapScene.getCameraOffset().y
    };
  }

  setNextGameStateSaveID(saveID) {
    this.nextGameStateSaveID = saveID;
  }

  update(p5) {
    if(!this.p5) this.p5 = p5;
    this.checkSleepConditionUpdate();
    this.lastFrame = p5.frameCount;
    if (this.GUI.getDisplayMode() === 0) {
      this.inputHandler.update(p5);
      this.inputHandler.handleKeyboardUserInput();
      this.inputHandler.handleMouseInteraction(p5);
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
    this.GUI.renderGUI(p5,this.SocketClientInterface);
  }

  getCameraOffset() {
    return this.gameViewMapScene.cameraOffset;
  }

  getCameraZoom() {
    return this.gameViewMapScene.scal;
  }

  /*
    Referenced: UserInputController.js > handleKeyboardUserInput
  */
  updatePlayerPosition(newPosition, isValid) {
    if (isValid) {
      this.playerControl.location = newPosition;
      this.playerControl.setDidMove(true);
    }
  }

  onPlaceCrabTrap(p5) {
    if (this.playerInventory.getItemCount(ItemsEnum["Item2"]) > 0) {
      let mousePosition = this.inputHandler.getOffsetLocal(
        this.p5,
        this.gameViewMapScene.getCameraOffset(),
        this.gameViewMapScene.getCameraZoom()
      );
      this.placeCrabTrap(mousePosition);
    }
  }

  placeCrabTrap(offsetLocal) {
    const plcTrp = () => {
      const worldLocation = {x: offsetLocal.x-16, y: offsetLocal.y};//this.convertScreenPositionToWorldPosition(offsetLocal);
      // v1 = {x: worldLocation.x, y: worldLocation.y};
      //const v2 = {x: worldLocation.x / 32, y: worldLocation.y / 32};
      //const v3 = {x: worldLocation.x / 32 * 3, y: worldLocation.y / 32 * 3};
      //console.log("PlaceCrabTrap: offsetLocal: x: " + offsetLocal.x + ", y: " + offsetLocal.y);
      //console.log("PlaceCrabTrap: worldLocation: x: " + v1.x + ", y: " + v1.y + ", x2: " + v2.x + ", y2: " + v2.y + ", x3: " + v3.x + ", y3: " + v3.y);
      const tileColor = this.TileMovementMap.getColorAtLocation(worldLocation);
      //console.log(tileColor);
      if(tileColor.r === 0 && tileColor.g === 255 && tileColor.b === 255){
        // Create a new CrabTrap Entity and push it into the CrabTraps array
        const catchCallback = (i) => {
          // add the new item passed to the callback to player inventory
          this.playerInventory.addItem(i);
        };
        const harvestCallback = () => {
          // add the trap back to inventory on harvest trap
          this.playerInventory.addItem(ItemsEnum["Item2"]);
        };
        this.CrabTraps.push(
          new CrabTrapEntity(
            this,
            "CTE" + this.p5.frameCount,
            offsetLocal.x,
            offsetLocal.y,
            simTime.getDate() + "|" + simTime.getTime(),
            this.p5.frameCount,
            catchCallback,
            harvestCallback
          )
        );
        // REMOVE CrabTrap Item from player inventory after placement
        this.playerInventory.removeItem(ItemsEnum["Item2"]);
      }
    };

    this.doUIAction(this.p5.frameCount, plcTrp);
  }

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
    if (newPosValidity) 
      returnPos = newPos;
    returnNewValueCallback(returnPos, newPosValidity); // end checkNextPositionCollision FN
  }

  isServerConnected() {
    return this.SocketClientInterface.isConnected();
  }

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
