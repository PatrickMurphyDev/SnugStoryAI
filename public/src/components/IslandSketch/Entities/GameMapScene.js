// GameMapScene.js
import { GameScene } from '../Scenes/GameScene';
import LotEntity from './LotEntity';
import CharacterEntity from './CharacterEntity';
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
    this.offset = { x: 0, y: 0 };
    this.bgImage = null;
    this.charImages = [];
    this.villagers = charList;
    this.lots = [];
  }

  preload(p5) {
    let characterImages = {};
    this.bgImage = p5.loadImage(IslandTemplate.Image.source);
    IslandTemplateJSON.layers[this.getLayerIndexByName("Residents")].objects.forEach(resident => {
        let resObj = this.convertPropertiesToLotDetails(resident.properties);
        characterImages[resident.name] = p5.loadImage(`images/${resObj.img}`);
    });
    this.charImages = characterImages;
  }

  setup(p5, canvasParentRef) {
    this.offset = p5.createVector(0, 0);
    this.initializeEventListeners(p5);
    p5.createCanvas(800, 600).parent(canvasParentRef);
    this.initializeLots();
    this.initializeCharacters();
  }

  draw(p5) {
    this.renderBackground(p5);
    this.renderEntities(p5);
    this.handleMouseInteraction(p5);
  }

  initializeEventListeners(p5) {
    window.addEventListener('wheel', (e) => this.handleZoom(e, p5));
    window.addEventListener('mouseup', (e) => console.log(`{x:${p5.mouseX}, y:${p5.mouseY}}`));
  }

  handleZoom(e, p5) {
    const s = 1 - e.deltaY / 1000;
    this.scal *= s;
    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    this.offset = p5.createVector(this.offset.x, this.offset.y).sub(mouse).mult(s).add(mouse);
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
    this.setVillagers([]);
    const characterTempList = IslandTemplateJSON.layers[this.getLayerIndexByName("Residents")].objects.map((v) => this.createCharacterEntity(v));
    this.setVillagers(characterTempList);
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
    p5.translate(this.offset.x, this.offset.y);
    p5.scale(this.scal);
    p5.image(this.bgImage, 0, 0, this.sizeVector.x, this.sizeVector.y);
    p5.noTint();
  }

  renderEntities(p5) {
    this.villagers.forEach(villager => {
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
    return p5.dist(lot.location.x / 2, lot.location.y / 2, (p5.mouseX - this.offset.x) / this.scal, (p5.mouseY - this.offset.y) / this.scal) <= 15.0;
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
      let tmpOffset = { x: this.offset.x, y: this.offset.y };
      tmpOffset.x -= p5.pmouseX - p5.mouseX;
      tmpOffset.y -= p5.pmouseY - p5.mouseY;
      this.offset = p5.createVector(tmpOffset.x, tmpOffset.y);
    }
  }
}
