// IslandSketch.js
import React, { useState } from "react";
import Sketch from "react-p5";
import { GameMapScene } from "./Scenes/GameMapScene";
import { Main_GameMenuScene } from "./Scenes/custom/Main_GameMenuScene";
import { Load_GameMenuScene } from "./Scenes/custom/Load_GameMenuScene";
import { Settings_GameMenuScene } from "./Scenes/custom/Settings_GameMenuScene";
import { Intro_GameCutScene } from "./Scenes/custom/Intro_GameCutScene";
import { IslandTemplate } from "../../utils/IslandTemplateTile";
import gameMapSceneAssets from "./ConfigurationData/AssetsList";

const SCENECOUNT = 5;

//const NPCKeys = ["AddisonClark","AndiMcNuttly","Betty","Chad","Elaine"];
const IslandSketch = ({
  onCharacterSelect,
  onPropertySelect,
  charList,
  setCharList,
  sizeVector = { x: window.innerWidth, y: window.innerHeight },
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  let assetsByScene = {};
  let currentSave = undefined; // for saving game
  const [loadData, setLoadData] = useState(undefined);

  const [scenes, setScenes] = useState([]);

  const checkForGameToLoad = () => {
    if (currentSceneIndex === 4 && loadData) {
      scenes[currentSceneIndex].loadGameState(loadData);
      setLoadData(undefined);
    }
  };
  
  const setCurrentSceneIndexLoad = (id, data) => {
    console.log('load save game ' + id + " " + scenes.length, currentSave); // if is object set save data
    if(id >= 0 && id < SCENECOUNT) { 
      //console.log('load save game, after int check, range check ' + id, currentSave); // if is object set save data
      currentSave = data; // if is object set save data
      setLoadData(data);
      setCurrentSceneIndex(id); 
    }
  }  

  const getIsServerConnected = () => {
    if(scenes.length <= 5) {
      return scenes[4].isServerConnected();
    }
    return false;
  };

  // draw the server is connected indicator
  const drawServerConnectedIndicator = (p5, serverIsConnected) => {
    p5.push();
    p5.fill('red');
    if (serverIsConnected) {
      p5.fill('green');
    }
    p5.ellipse(30, 30, 25, 25);
    p5.pop();
  }

  const preload = (p5) => {
    console.log('run sketchpreload');
    const mapSceneId = "GameMapScene";
    assetsByScene[mapSceneId] = {};
       
    assetsByScene[mapSceneId]["BGImage"] = p5.loadImage(IslandTemplate.Image.source);
    
    // Load assets from the config
    gameMapSceneAssets.forEach(asset => {
      assetsByScene[mapSceneId][asset.key] = p5.loadImage(asset.path);
    });
  
    let newLots = [...IslandTemplate.Buildings];
    newLots.forEach((v)=>{
      assetsByScene[mapSceneId][v.id] = p5.loadImage("images/lots/"+v.lotDetails.imgFileSrc);
    });
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(sizeVector.x, sizeVector.y).parent(canvasParentRef);
    if (scenes.length === 0) {
      setScenes([
        new Main_GameMenuScene(setCurrentSceneIndex, 1, 2, 3),
        new Intro_GameCutScene(setCurrentSceneIndex, 4),
        new Load_GameMenuScene(setCurrentSceneIndexLoad, 1, 4, 0),
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
    checkForGameToLoad();
    scenes[currentSceneIndex].draw(p5);
    drawServerConnectedIndicator(p5, getIsServerConnected());
  };

  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export default IslandSketch;
