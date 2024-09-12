// GameMapScene.js
import { GameScene } from './GameScene';
import LotEntity from '../Entities/LotEntity';
import CharacterEntity from '../Entities/CharacterEntity';
import { IslandTemplate } from '../../../utils/IslandTemplateTile';
import IslandTemplateJSON from '../../../utils/IslandTemplateTiled.json';

const DefaultLotProperties = {
    size: { width: 32, height: 32 },
    zoneType: "Commercial",
    price: 100000,
    fillColor: "#000000",
  };

export class GameMapScene extends GameScene {
  constructor(onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector = { x: 800, y: 600 }) {
    super('GameMapScene');
    this.onCharacterSelect = onCharacterSelect;
    this.onPropertySelect = onPropertySelect;
    
    this.charList = charList;
    this.setCharList = setCharList;

    this.sizeVector = IslandTemplate.Image.size || sizeVector;
    this.scal = 1;
    this.CameraOffset = undefined;

    this.bgImage = null;
    this.charImages = [];

    this.villagers = charList;
    this.lots = [];

    this.speed = 1;

    this.playerx = 570;
    this.playery = 1820;
    this.isLoaded = false;

    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isMovingRight = false;
    this.isMovingLeft = false;
  }

  setCameraZoom(p5, zoomLevelInt = 1){
    zoomLevelInt = Math.min(1, Math.max(5,zoomLevelInt));
    this.scal = 1.5;
    //const mouse = p5.createVector(400+300+816, 300+16);
    //this.CameraOffset = p5.createVector(this.CameraOffset.x, this.CameraOffset.y).sub(mouse).mult(this.scal).add(mouse);
  }
  setCameraPosition(positionP5Vec){
    this.CameraOffset = positionP5Vec;
  }

  loadAssets(p5){
    let characterImages = {};
    this.bgImage = p5.loadImage(IslandTemplate.Image.source);
    IslandTemplateJSON.layers[this.getLayerIndexByName("Residents")].objects.forEach(resident => {
        let resObj = this.convertPropertiesToLotDetails(resident.properties);
        characterImages[resident.name] = p5.loadImage(`images/${resObj.img}`);
    });
    this.charImages = characterImages;
  }

  preload(p5) {
    this.loadAssets(p5);
  }

  setup(p5, canvasParentRef) {
    //p5.createCanvas(800, 600).parent(canvasParentRef);
    //this.CameraOffset = p5.createVector(this.playerx*-1, this.playery*-1);
    //this.initializeEventListeners(p5);
    //this.initializeLots();
    //this.initializeCharacters();
  }

  draw(p5) {
    if(!this.CameraOffset){
      this.initializeEventListeners(p5); 
      this.setCameraPosition(p5.createVector((this.playerx*-1), (this.playery*-1)));
      //-p5.width/2+64
      //-p5.height/2
      //const viewCenter = p5.createVector(p5.width/2-16, p5.mouseY/p5.height-16);
     // this.CameraOffset = p5.createVector(this.CameraOffset.x, this.CameraOffset.y).sub(viewCenter).mult(s).add(viewCenter);
    }else{
      this.setCameraZoom(p5,5);
      this.handleKeys();
      this.setCameraPosition(p5.createVector((this.playerx*-1), (this.playery*-1)));
      this.renderBackground(p5);
    }
    //this.renderEntities(p5);
    //this.handleMouseInteraction(p5);
  }

  renderPlayer(p5){
    p5.rect(this.playerx, this.playery, 32,32);
  }

  initializeEventListeners(p5) {
   //window.addEventListener('wheel', (e) => this.handleZoom(e, p5));
   // window.addEventListener('mouseup', (e) => console.log(`{x:${p5.mouseX}, y:${p5.mouseY}}`));
    window.addEventListener('keydown', (e)=>this.keyPressed(e));
    window.addEventListener('keyup', (e)=>this.keyReleased(e));
  }

  handleKeys() {
    if (this.isMovingUp) {
      this.playery -= this.speed*this.scal;
    }
    if (this.isMovingDown) {
      this.playery += this.speed*this.scal;
    }
    if (this.isMovingLeft) {
      this.playerx -= this.speed*this.scal;
    }
    if (this.isMovingRight) {
      this.playerx += this.speed*this.scal;
    }
  }
  
  keyPressed(e) {
    let kCode = e.code;
    //e.preventDefault(); // Cancel the native event
    console.log("gameMapScene",e);
    if (kCode === 'KeyW' || kCode === 'ArrowUp') {
      this.isMovingUp = true;
    }
    if (kCode === 'KeyS' || kCode === 'ArrowDown') {
      this.isMovingDown = true;
    }
    if (kCode === 'KeyA' || kCode === 'ArrowLeft') {
      this.isMovingLeft = true;
    }
    if (kCode === 'KeyD' || kCode === 'ArrowRight') {
      this.isMovingRight = true;
    }
   // e.stopPropagation();// Don't bubble/capture the event any further
  }
  
  keyReleased(e) { 
    console.log('key released',e);
    let kCode = e.code;
    //e.preventDefault(); // Cancel the native event
    console.log("gameMapScene",e);
    if (kCode === 'KeyW' || kCode === 'ArrowUp') {
      this.isMovingUp = false;
    }else if (kCode === 'KeyS' || kCode === 'ArrowDown') {
      this.isMovingDown = false;
    }
    if (kCode === 'KeyA' || kCode === 'ArrowLeft') {
      this.isMovingLeft = false;
    }
    if (kCode === 'KeyD' || kCode === 'ArrowRight') {
      this.isMovingRight = false;
    }
    //e.stopPropagation();// Don't bubble/capture the event any further
  }

  handleZoom(e, p5) {
    const s = 1 - e.deltaY / 1000;
    this.scal *= s;
    console.log("scale", s);
    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    this.CameraOffset = p5.createVector(this.CameraOffset.x, this.CameraOffset.y).sub(mouse).mult(s).add(mouse);
  }

  initializeLots() {
    const buildingsLayerIndex = this.getLayerIndexByName('Buildings');
    const lotEntities = IslandTemplateJSON.layers[buildingsLayerIndex].objects.map((pos, index) =>
      new LotEntity(
        index + 1,
        pos.name || `Lot ${index + 1}`,
        pos.x * 2,
        pos.y * 2,
        pos.properties ? this.convertPropertiesToLotDetails(pos.properties) : DefaultLotProperties,
        []
      )
    );
    this.lots = [...lotEntities];
  }

  getLayerIndexByName(name) {
    return IslandTemplateJSON.layers.map((v, i) => (v.name === name ? i : -1)).filter(i => i !== -1)[0];
  }

  convertPropertiesToLotDetails(properties) {
    let retDetails = {};
    properties.forEach(element => {
      retDetails[element.name] = element.value;
    });
    return retDetails;
  }

  initializeCharacters() {
    for (var e in this.villagers) {
      this.villagers[e].remove();
    }
    this.setCharList([]);
    const characterTempList = IslandTemplateJSON.layers[this.getLayerIndexByName("Residents")].objects.map((v) => this.createCharacterEntity(v));
    this.setCharList(characterTempList);
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
      this.charImages[resident.name] || '',
      resident.img
    );
  }

  findRandomResidentialLot() {
    return this.lots.find(lot => lot.lotDetails.zoneType === 'Residential' && Math.random() > (0.2 + (lot.occupied ? 0.3 : 0.0)));
  }

  findRandomCommercialLot() {
    return this.lots.find(lot => lot.lotDetails.zoneType !== 'Residential' && !lot.occupied && Math.random() > 0.6);
  }

  renderBackground(p5) {
    p5.background('#20D6C7');
    p5.scale(this.scal);
    p5.translate(this.CameraOffset.x, this.CameraOffset.y);
    if(this.bgImage){
      p5.image(this.bgImage, 0, 0, this.sizeVector.x, this.sizeVector.y);
    }else{
      this.bgImage = p5.loadImage(IslandTemplate.Image.source);
    }
    p5.noTint();
    this.renderPlayer(p5);
  }

  renderEntities(p5) {
    this.charList.forEach(villager => {
      villager.update();
      villager.draw(p5);
    });
    this.lots.forEach(lot => {
      lot.update();
      if (this.isMouseOverLot(p5, lot)) {
        this.handleLotInteraction(p5, lot);
      }
      lot.draw(p5);
    });
  }

  isMouseOverLot(p5, lot) {
    return p5.dist(lot.location.x / 2, lot.location.y / 2, (p5.mouseX - this.CameraOffset.x) / this.scal, (p5.mouseY - this.CameraOffset.y) / this.scal) <= 15.0;
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
}
