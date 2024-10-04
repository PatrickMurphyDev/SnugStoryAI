// GameMapScene.js

// import dependents
import { GameScene } from "./GameScene";
import LotEntity from "../Entities/LotEntity";
import CharacterEntity from "../Entities/CharacterEntity";
import { IslandTemplate } from "../../../utils/IslandTemplateTile";
import IslandTemplateJSON from "../../../utils/IslandTemplateTiled.json";
import CollideRectEntity from "../Entities/CollideRectEntity";
import WallData from "../../../utils/WallData.json";

// List of CharacterName Keys {first,last}
const CNPCKeys = [
  "AddisonClark",
  "BettyLast",
  "ChadLast",
  "ElaineLast",
  "NataliaChenchko",
  "AndiMcNuttly",
  "KyleSueco",
  "BriggsLast",
  "LennyCarver",
  "ShannonDickson",
  "JeanWong",
  "DarrelEason",
  "JaviLopez",
  "MateoRomano",
  "DylanMcNuttly",
  "KatieCarrington",
  "KovaApak",
  "MitchBrowning",
  "LukasMallard",
  "TeddyMcNuttly",
  "MarkDickson",
  "RyderKonieg",
  "LynnMcNeil",
  "ChadEllington",
  "BrittanyConnors",
  "KarenOMalley",
  "KorganLuna",
  "KelleighHawk",
  "MaraMcNeil",
  "LindseyLast",
  "JoeRomano",
  "BriannaClark",
  "CharlieMallard",
  "MarissabelLast",
  "DanteVenezia",
  "ChristianLumley",
  "WesLast",
  "DaeHoNyguen",
  "LindaLast",
  "MarieLast",
  "ChealseaKing",
  "MikeCarpenter",
  "WalterMcNeil",
  "HenryTurner",
  "StephanieVenezia",
  "KennyMcNeil",
  "LauraHale",
  "PeteyOBrian",
  "MelindaCooper",
  "JenSlate",
  "ClaraDickson",
  "KonanNoah",
  "ScottAnkor"
];

const DEFAULTLOTPROPERTIES = {
  size: { width: 32, height: 32 },
  zoneType: "Commercial",
  price: 100000,
  fillColor: "#000000",
};

// constant that controls the zoom
const VIEW_ZOOM_SETTING = 5;
const VIEW_ZOOM_MULTIPLIER = 7.5;

// Map Data Structure : keyMap[str Key] : str MoveState 
//  converts KEYBOARDKEYCODE to PLAYERMOVESTATE
//  Many to 1
const KEY_TO_STATE_MAP = {
  KeyW: "isMovingUp",
  ArrowUp: "isMovingUp",
  KeyS: "isMovingDown",
  ArrowDown: "isMovingDown",
  KeyA: "isMovingLeft",
  ArrowLeft: "isMovingLeft",
  KeyD: "isMovingRight",
  ArrowRight: "isMovingRight",
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
    this.mapDisplayMode = 0; // 0 = standard map, 1 = dialog
    this.testImgSec = 1;

    this.bgImage = this.parentAssets["GameMapScene"]["BGImage"];
    this.frameCounter = 0;
    this.npcKeyIndex = 0;
    this.NPCKeys = CNPCKeys;
    this.currentNPCKey = "LukasMallard";
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

    // wall data structure
    this.CollideEntities = [];

    // character profile images data structure map CharKey:Str -> p5.Image
    this.characterProfileImages = {
      LukasMallard: this.parentAssets.GameMapScene.OtherPlayerProfileImage,
    };
    
    this.GUIElements = [];
    this.alertWindowIsOpen = false;

    this.loadWallData();
    this.initializeEventListeners();
    this.initializeLots();
    this.initializeCharacters();
    this.initializeGUIElements();


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
          this.alertWindowIsOpen = true;
        }
      )
    );
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
          pos.properties || DEFAULTLOTPROPERTIES,
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

  initializeGUIElements(){
    this.GUIElements.push({
      x: 0,
      y: 650,
      h: 150,
      w: 1000,
      GUIType: "GUIBG",
      fill: 150,
    });
    this.GUIElements.push({
      x: 200,
      y: 650,
      h: 150,
      w: 600,
      GUIType: "Panel",
      text: "Main UI Window",
    });
    this.GUIElements.push({
      x: 0,
      y: 600,
      h: 200,
      w: 200,
      GUIType: "CirclePanel",
      isCircle: true,
      img: this.PlayerProfileImage,
      text: "Ellie Tupee",
    });
    this.GUIElements.push({
      x: 800,
      y: 600,
      h: 200,
      w: 200,
      GUIType: "Panel",
      text: "UI Details Options",
    });
    this.GUIElements.push({
      x: 300,
      y: 300,
      h: 200,
      w: 400,
      GUIType: "AlertWindow",
      title: "Welcome Newcomer!",
      text: "Lukas Swan Introduces himself...",
      actions: [
        /* {
          onClickHandle: (e) => {
            this.alertWindowIsOpen = false;
          },
          text: "Close",
        }, */
        {
          onClickHandle: (e) => {
            this.alertWindowIsOpen = false;
            this.mapDisplayMode = 1;
          },
          fill: "#63aff3",
          text: "Chat",
        },
      ],
    });
  }

  preload(p5) {
    console.log("preload GameMapScene");
  }

  setup(p5, canvasParentRef) {
    console.log("run GameMapScene Setup");
  }

  draw(p5) {
    if (this.frameCounter >= p5.frameRate() * this.testImgSec) {
      this.frameCounter = 0;
      this.npcKeyIndex++;
      this.currentNPCKey = this.NPCKeys[this.npcKeyIndex % this.NPCKeys.length];
    } else if (this.characterProfileImages[this.currentNPCKey]) {
      this.frameCounter++;
    }
    if (this.mapDisplayMode === 0) {
      this.handleKeyboardUserInputUpdate();
      p5.push();
      this.setCameraZoom(p5, VIEW_ZOOM_SETTING);
      this.setCameraPosition(
        p5.createVector(
          this.playerx * -1 + p5.width / VIEW_ZOOM_MULTIPLIER + this.tileWidth / 2,
          this.playery * -1 + p5.height / VIEW_ZOOM_MULTIPLIER + this.tileWidth / 2
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
    } else {
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
        1000 - 175 - 200,
        250 - 200,
        350,
        350
      );
      //p5.rect(1000 - 175, 250, 150, 150);
    }
    p5.ellipseMode("CENTER");
    // after translate
    this.renderGUI(p5);
  }

  renderGUIAlertWindow(p5, v) {
    p5.rect(v.x || 0, v.y || 0, v.w || 0, v.h || 0);
    // add window title bar bg
    p5.fill(100);
    p5.rect(v.x, v.y, v.w, 24);

    // window title text
    p5.fill(200);
    p5.text(v.title || "Panel", v.x, v.y, v.w, 24);

    // window body text
    p5.push();
    p5.fill(0);
    p5.textAlign("LEFT", "TOP");
    p5.text(
      v.text || "Panel",
      v.x + p5.textWidth(v.text) / 2 + 10,
      v.y + 15 + 24,
      v.w,
      v.h
    );
    p5.pop();

    if (this.characterProfileImages[this.currentNPCKey]) {
      p5.image(
        this.characterProfileImages[this.currentNPCKey],
        570,
        350,
        125,
        125
      );

      // ---- ADD Alert Window Buttons ----- //s
      v.actions.forEach((v2, vi) => {
        vi = vi + 1;
        p5.push();
        p5.fill(v2.fill || 65);
        p5.rect(v.x + v.w - 175 * vi, v.y + v.h - 12, 150, 24);
        p5.fill(225);
        p5.text(v2.text, v.x + v.w - 175 * vi, v.y + v.h - 12, 150, 24);
        this.handleTargetClick(
          p5,
          v.x + v.w - 175 * vi,
          v.y + v.h - 12,
          150,
          24,
          v2.onClickHandle
        );
        p5.pop();
      });
    } else {
      this.characterProfileImages[this.currentNPCKey] = p5.loadImage(
        "images/CharacterProfileImages/" + this.currentNPCKey + ".png"
      );
    }
  }

  renderGUI(p5) {
    p5.image(this.GameMapSceneUI, 0, 800 - 224);
    //console.log(this.GUIElements);
    this.GUIElements.forEach((v) => {
      //console.log(v.GUIType);
      p5.fill(v.fill || 200);
      switch (v.GUIType) {
        case "AlertWindow":
          //console.log('render alert window try');
          if (this.alertWindowIsOpen) {
            //console.log('render alert window');
            this.renderGUIAlertWindow(p5, v);
          }
          break;

        case "CirclePanel":
          //p5.ellipse((v.x || 0)+v.w/2, (v.y || 0)+v.h/2, v.w || 0, v.h || 0);
          if (v.img) {
            p5.image(
              this.PlayerProfileImage,
              v.x + v.w * 0.1,
              v.y + v.h * 0.05,
              v.w * 0.8,
              v.h * 0.8
            );
            p5.image(this.GameMapSceneUIBanner, 4, 800 - 47);
            p5.fill(255);
            p5.textStyle("Bold");
            p5.text(v.text || "Panel", v.x, v.y + v.h * 0.75, v.w, v.h * 0.25);
          }
          break;

        case "Panel":
        default:
          console.log("no GUI Match Or Panel");
        //p5.rect(v.x || 0, v.y || 0, v.w || 0, v.h || 0);
      }

      /**        // basic text
        p5.fill(0);
        p5.text(v.text || "Panel", v.x, v.y, v.w, v.h); */
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
    if (KEY_TO_STATE_MAP[e.code]) this.moveState[KEY_TO_STATE_MAP[e.code]] = true;
    this.lastMoveState = 0;
    e.stopPropagation(); // Don't bubble/capture the event any further
  } // end keyPressed fn

  keyReleased(e) {
    e.preventDefault(); // Cancel the native event
    if (KEY_TO_STATE_MAP[e.code]) {
      this.moveState[KEY_TO_STATE_MAP[e.code]] = false;
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