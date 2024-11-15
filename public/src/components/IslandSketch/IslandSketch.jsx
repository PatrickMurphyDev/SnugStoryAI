// IslandSketch.js
import React, { useState } from "react";
import Sketch from "react-p5";
import { GameMapScene } from "./Scenes/GameMapScene";
import { Main_GameMenuScene } from "./Scenes/Main_GameMenuScene";
import { Load_GameMenuScene } from "./Scenes/Load_GameMenuScene";
import { Settings_GameMenuScene } from "./Scenes/Settings_GameMenuScene";
import { Intro_GameCutScene } from "./Scenes/Intro_GameCutScene";
import { IslandTemplate } from "../../utils/IslandTemplateTile";


//const NPCKeys = ["AddisonClark","AndiMcNuttly","Betty","Chad","Elaine"];
const IslandSketch = ({
  onCharacterSelect,
  onPropertySelect,
  charList,
  setCharList,
  sizeVector = { x: 1000, y: 800 },
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  let assetsByScene = {};

  const [scenes, setScenes] = useState([]);

  const goToScene = (index) => {
    if (index >= 0 && index < scenes.length) {
      setCurrentSceneIndex(index);
    } else {
      console.error("Non-valid scene index " + index);
    }
  };

  const preload = (p5) => {
    console.log('run sketchpreload');
    const mapSceneId = "GameMapScene";
    assetsByScene[mapSceneId] = {};
    /* assetsByScene[mapSceneId]["NPCImages"] = {};
    
    for(var k = 0; k<NPCKeys.length; k++){
      assetsByScene[mapSceneId]["NPCImages"][NPCKeys[k]] = p5.loadImage("images/CharacterProfileImages/"+NPCKeys[k]+".png");
    } */
    
    assetsByScene[mapSceneId]["WaveSpriteSheet"] = p5.loadImage("tiles/Wave4.png");
    assetsByScene[mapSceneId]["OtherCharSheet"] = p5.loadImage("images/otherchar.png");
    assetsByScene[mapSceneId]["OtherCharSheet2"] = p5.loadImage("images/otherchar2.png");
    assetsByScene[mapSceneId]["NewCharSheet"] = p5.loadImage("images/EllieSpriteNew.png");
    assetsByScene[mapSceneId]["BGImage"] = p5.loadImage(
      IslandTemplate.Image.source
    );
    assetsByScene[mapSceneId]["BGDocks"] = p5.loadImage("images/SettingBGImages/DocksBlur4.png");
    assetsByScene[mapSceneId]["BGGym"] = p5.loadImage("images/SettingBGImages/Gym.png");
    assetsByScene[mapSceneId]["BGFoodTown"] = p5.loadImage("images/SettingBGImages/BGFoodTownBlur4.png");
    assetsByScene[mapSceneId]["BGBar"] = p5.loadImage("images/SettingBGImages/TheBethelBlur4.png");
    assetsByScene[mapSceneId]["GameMapSceneUI"] = p5.loadImage(
      "images/GameMapSceneUINoBanner.png"
    );
    assetsByScene[mapSceneId]["GameMapSceneUIBanner"] = p5.loadImage(
      "images/UIBanner.png"
    );

    assetsByScene[mapSceneId]["PlayerImage"] = p5.loadImage("images/playerStanding.png");
    assetsByScene[mapSceneId]["PlayerImageLeft"] = p5.loadImage("images/char_walk_left.gif");
    assetsByScene[mapSceneId]["PlayerImageRight"] = p5.loadImage("images/char_walk_right.gif");
    assetsByScene[mapSceneId]["PlayerProfileImage"] = p5.loadImage("images/Maureen256.png");
    assetsByScene[mapSceneId]["PlayerBackHeadImage"] = p5.loadImage("images/BackHeadMainChar.png");
    assetsByScene[mapSceneId]["OtherPlayerImage"] = p5.loadImage("images/playerStandingChar.png");
    assetsByScene[mapSceneId]["OtherPlayerProfileImage"] = p5.loadImage("images/CharacterProfileImages/LukasMallard.png");
  
    let newLots = [...IslandTemplate.Buildings];
    newLots.forEach((v)=>{
      assetsByScene[mapSceneId][v.id] = p5.loadImage("images/lots/"+v.lotDetails.imgFileSrc);
    });
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(sizeVector.x, sizeVector.y).parent(canvasParentRef);
    if (scenes.length === 0) {
      console.log('set scenes');
      setScenes([
        new Main_GameMenuScene(setCurrentSceneIndex, 1, 2, 3),
        new Intro_GameCutScene(setCurrentSceneIndex, 4),
        new Load_GameMenuScene(setCurrentSceneIndex, 1, 1, 0),
        new Settings_GameMenuScene(setCurrentSceneIndex, 3, 0),
        new GameMapScene(
          onCharacterSelect,
          onPropertySelect,
          charList,
          setCharList,
          sizeVector,
          assetsByScene
        ),
      ]);
    }
  };
  const draw = (p5) => {
      scenes[currentSceneIndex].draw(p5);
  };

  const nextScene = () => {
    goToScene((currentSceneIndex + 1) % scenes.length);
  };

  const prevScene = () => {
    goToScene((currentSceneIndex - 1 + scenes.length) % scenes.length);
  };

  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export default IslandSketch;
