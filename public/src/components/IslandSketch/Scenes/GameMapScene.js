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

const getDefaultLotProperties = ()=>{
  return {
    size: { width: 32, height: 32 },
    zoneType: "Commercial",
    price: Math.max(15000, Math.floor(Math.random()*250000)),
    fillColor: "#000000",
  };
}

export class GameMapScene extends GameScene {
  constructor(onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector = { x: 800, y: 600 }, parentAssetsByScene) {
    super('GameMapScene');
    this.parentAssets = parentAssetsByScene;
    this.onCharacterSelect = onCharacterSelect;
    this.onPropertySelect = onPropertySelect;
    
    this.charList = charList;
    this.setCharList = (cList) => {setCharList(cList); this.charList = cList;}

    this.sizeVector = IslandTemplate.Image.size || sizeVector;
    this.scal = 1;
    this.CameraOffset = undefined;

    this.bgImage = this.parentAssets["GameMapScene"]['BGImage'];
    this.charImages = [];
    this.playerImage = this.parentAssets["GameMapScene"]['PlayerImage'];
    this.playerImageLeft = this.parentAssets["GameMapScene"]['PlayerImageLeft'];
    this.playerImageRight = this.parentAssets["GameMapScene"]['PlayerImageRight'];

    this.lots = [];
    this.useCharImage = true;
    this.useBGImage = true;

    this.speed = .5;
    this.tileWidth = 32;
    this.playerx = 570;
    this.playery = 1820;
    this.isLoaded = false;

    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.lastMoveState = 0; // 0: standing, 1:up, 2:rght, 3:dwn, 4:left

    this.CollideEntities = [];

    this.loadWallData();
    this.initializeEventListeners();
  }

  loadWallData(){
    WallData.forEach(wall => {
      this.CollideEntities.push(new CollideRectEntity(wall.id, wall.x+12, wall.y, {"x":wall.width, "y": wall.height}));
    });
    }

  loadAssets(p5){
    /* this.bgImage = p5.loadImage(IslandTemplate.Image.source);

    let characterImages = {};
    
    this.playerImage = p5.loadImage("images/playerStanding.png");
    this.playerImageLeft = p5.loadImage("images/char_walk_left.gif");
    this.playerImageRight = p5.loadImage("images/char_walk_right.gif"); */
    /* 
    IslandTemplateJSON.layers[this.getLayerIndexByName("Residents")].objects.forEach(resident => {
      
      characterImages[resident.name] = p5.loadImage(`images/${resident.img}`);
    }); */

    //this.charImages = characterImages;
    //this.initializeLots();
    //this.initializeCharacters();
    this.initializeEventListeners(p5); 
    this.setCameraPosition(p5.createVector((this.playerx*-1), (this.playery*-1)));
    this.loadAssetsState = 2;
  }

  preload(p5) {
    console.log('preload GameMapScene');
  }

  setup(p5, canvasParentRef) {
    console.log('run GameMapScene Setup');
    //p5.createCanvas(800, 600).parent(canvasParentRef);
    //this.CameraOffset = p5.createVector(this.playerx*-1, this.playery*-1);
    //this.initializeEventListeners(p5);
    //this.initializeLots();
    //this.initializeCharacters();
  }

  /* CAMERA FN TODO: Move to New Class */
  setCameraZoom(p5, zoomLevelInt = 2){
    zoomLevelInt = Math.min(1, Math.max(5,zoomLevelInt));
    this.scal = zoomLevelInt*3;
    //const mouse = p5.createVector(400+300+816, 300+16);
    //this.CameraOffset = p5.createVector(this.CameraOffset.x, this.CameraOffset.y).sub(mouse).mult(this.scal).add(mouse);
  }

  setCameraPosition(positionP5Vec){
    this.CameraOffset = positionP5Vec;
  }

  checkCollisions(){
     this.CollideEntities.forEach(collider => {
      collider.update();
    });
  }
  handleZoom(e, p5) {
    const s = 1 - e.deltaY / 1000;
    this.scal *= s;
    console.log("scale", s);
    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    this.CameraOffset = p5.createVector(this.CameraOffset.x, this.CameraOffset.y).sub(mouse).mult(s).add(mouse);
  }

      //-p5.width/2+64
      //-p5.height/2
      //const viewCenter = p5.createVector(p5.width/2-16, p5.mouseY/p5.height-16);
     // this.CameraOffset = p5.createVector(this.CameraOffset.x, this.CameraOffset.y).sub(viewCenter).mult(s).add(viewCenter);
   
     /**----------- END CAMERA FN */
     /**----------- END CAMERA FN */
     /**----------- END CAMERA FN */


  draw(p5) {
      this.handleKeyboardUserInputUpdate();
      this.setCameraZoom(p5,5);
      this.setCameraPosition(p5.createVector((this.playerx*-1)+(p5.width/viewMult)+this.tileWidth/2, (this.playery*-1)+(p5.height/viewMult)+this.tileWidth/2));
      
      this.renderBackground(p5);
      this.renderEntities(p5);
      this.renderPlayer(p5);
      
      //this.handleMouseInteraction(p5);
      //this.CollideEntities.forEach(collider => {
        //collider.draw(p5);
      //});
  }
  

  renderPlayer(p5){
    if(this.useCharImage && (this.isMovingDown || this.isMovingUp || this.isMovingLeft || this.isMovingRight)){
      if(this.isMovingLeft){
        p5.image(this.playerImageLeft, this.playerx, this.playery); //parent.getAssets('GameMapScene')['PlayerImageLeft']
      }else if(this.isMovingRight){
        p5.image(this.playerImageRight, this.playerx, this.playery);
      }else{
        if(this.isMovingUp){
          p5.image(this.playerImage, this.playerx, this.playery);
        }else if(this.isMovingDown){
          p5.image(this.playerImage, this.playerx, this.playery);
        }
      }
    }else if(this.useCharImage){
      // if not moving then, if last move state was 1 (up) or 2 (right), mirror image
      if(this.lastMoveState <= 2){ 
        p5.push();
        // Scale -1, 1 means reverse the x axis, keep y the same.
        p5.scale(-1, 1);
        // Because the x-axis is reversed, we need to draw at different x position. negative x
        p5.image(this.playerImage, -this.playerx-this.tileWidth, this.playery);
        p5.pop();
      }else{
        // if last move state was 3 down or 4 left, and not moving then draw the standing to the left sprite
        p5.image(this.playerImage,this.playerx, this.playery);
      }
    }else{
      p5.rect(this.playerx,this.playery,24,32);
    }
  }

 /* INPUT FN */
  initializeEventListeners() {
   //window.addEventListener('wheel', (e) => this.handleZoom(e, p5));
   // window.addEventListener('mouseup', (e) => console.log(`{x:${p5.mouseX}, y:${p5.mouseY}}`));
    window.addEventListener('keydown', (e)=>this.keyPressed(e));
    window.addEventListener('keyup', (e)=>this.keyReleased(e));
  }

/* UNUSED

  convertPropertiesToLotDetails(properties) {
    let retDetails = {};
    properties.forEach(element => {
      retDetails[element.name] = element.value;
    });
    return retDetails;
  }


  translatePixelIndexToVector(i,imgDim){
    const imgDimensions = imgDim || {"x":2064,"y":2048};

    // Y axis is equal to how many rows down the pixIndex is, use floor of the index/imgXWidth is equal to the number of rows down
    const yEst = Math.floor(i/imgDimensions.x);

    // get the remainder to deterimine X Pos
    const xEst = ((i/imgDimensions.x) - yEst)*imgDimensions.x;
    // multiply remainder pct by dim x to get x estimate 
    return {x:xEst, y:yEst};
  }

  translateVectorToPixelIndex(v,imgDim){
    const imgDimensions = imgDim || {"x":2064,"y":2048};

    // mult by 4 for [xy(R G B or A)] 00r,00g,00b,00a,10r,10g,10b,10a,...etc
    return ((v.y)*imgDimensions.x + v.x)* 4; 
  }
    
  
  getLayerByName(name) {
    IslandTemplateJSON.layers.forEach(element => {
      if(element.hasOwnProperty("layers")){
        // search layers
        element.layers.forEach(el2 => {
          if(el2.name === name){
            return el2;
          }          
        })
      } else if(element.name === name){
          return element;
      }
    });
    return {};
  }
  
  */

  handleKeyboardUserInputUpdate() {
    let tmpy = this.playery;
    let tmpx = this.playerx;
    if(this.bgCollisionImage || true){
      const YCallBack = (newVal,valid)=>{this.playery = valid ? newVal.y : this.playery;};
      const XCallBack = (newVal,valid)=>{this.playerx = valid ? newVal.x : this.playerx;};
    if (this.isMovingUp) {
      tmpy -= this.speed*this.scal;
      this.checkNextPosititionCollision(this.playerx, this.playery, this.playerx,tmpy, YCallBack);
    }
    if (this.isMovingDown) {
      tmpy += this.speed*this.scal;
      this.checkNextPosititionCollision(this.playerx, this.playery, this.playerx,tmpy, YCallBack);
    }
    if (this.isMovingLeft) {
      tmpx -= this.speed*this.scal;
      this.checkNextPosititionCollision(this.playerx, this.playery, tmpx,this.playery, XCallBack);
    }
    if (this.isMovingRight) {
      tmpx += this.speed*this.scal;
      this.checkNextPosititionCollision(this.playerx, this.playery, tmpx,this.playery, XCallBack);
    }
  }
} // end handleKeys FN 
  
  keyPressed(e) {
    let kCode = e.code;
    this.lastMoveState = 0;
    //e.preventDefault(); // Cancel the native event
    // DEBUG console.log("gameMapScene",e);
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
  } // end keyPressed fn
  
  keyReleased(e) { 
    // DEBUG: console.log('key released',e);
    let kCode = e.code;
    //e.preventDefault(); // Cancel the native event
    // DEBUG: console.log("gameMapScene",e);
    if (kCode === 'KeyW' || kCode === 'ArrowUp') {
      this.isMovingUp = false;
      this.lastMoveState = 1;
    }else if (kCode === 'KeyS' || kCode === 'ArrowDown') {
      this.isMovingDown = false;
      this.lastMoveState = 3;
    }
    if (kCode === 'KeyA' || kCode === 'ArrowLeft') {
      this.isMovingLeft = false;
      this.lastMoveState = 4;
    }
    if (kCode === 'KeyD' || kCode === 'ArrowRight') {
      this.isMovingRight = false;
      this.lastMoveState = 2;
    }
    //e.stopPropagation();// Don't bubble/capture the event any further
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

  /** ---------- END INPUT FNs */

  checkNextPosititionCollision(oldPosX, oldPosY, newPosX, newPosY, returnNewValueCallback){
    const oldPos = {x:oldPosX, y:oldPosY};
    const newPos = {x:newPosX, y:newPosY};
  
    let returnPos =       oldPos; //default to current/old position
    let newPosValidity =  true;   // is the new position a valid pixel?

    //const c = this.bgCollisionImage.get(newPos.x,newPos.y);
    //if(this.bgCollisionImage.pixels.length>4){
    //if(this.bgCollisionImage.pixels[this.translateVectorToPixelIndex({"x":Math.abs(this.playerx), "y":Math.abs(this.playery)})] > 0){
    //if (c.alpha > 0){
      this.CollideEntities.forEach(collider => {
        if(collider.contains({x:newPos.x+16,y:newPos.y+30})){
          newPosValidity = false;
        }
      });
    //}
  //}
    
    // if new position is valid, set return to newPos
    if(newPosValidity){
      returnPos = newPos;
    }
    returnNewValueCallback(returnPos, newPosValidity);
  } // end checkNextPositionCollision FN


  getLayerIndexByName(name) {
    return IslandTemplateJSON.layers.map((v, i) => (v.name === name ? i : -1)).filter(i => i !== -1)[0];
  }


  initializeLots() {
    const lotEntities = IslandTemplateJSON.layers[7].layers[0]["objects"].map((pos, index) =>
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
    console.log(this.getLayerIndexByName("Residents"));
    const characterTempList = IslandTemplateJSON.layers[this.getLayerIndexByName("Residents")].objects.map((v) => this.createCharacterEntity(v));
    this.setCharList(characterTempList);
  }

  createCharacterEntity(resident) {
    const residenceLot = this.lots[0]; //this.findRandomResidentialLot();
    const employmentLot = this.lots[0]; //this.findRandomCommercialLot();

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
      '', // this.charImages[resident.name] ||  
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
    if(this.useBGImage){
      p5.image(this.bgImage, 0, 0, this.sizeVector.x, this.sizeVector.y); //this.parent.getAssets('GameMapScene')['BGImage']
    }else{
      //this.bgImage = p5.loadImage(IslandTemplate.Image.source);
    }
    p5.noTint();
  }


  renderEntities(p5) {
    this.charList.forEach(villager => {
      //villager.update();
      villager.draw(p5);
    });
    this.lots.forEach(lot => {
      //lot.update();
      //if (this.isMouseOverLot(p5, lot)) {
       // this.handleLotInteraction(p5, lot);
     // }
      lot.draw(p5);
    });
  }

}
