// IslandSketch.js
import React, { useState } from "react";
import Sketch from "react-p5";
import { GameMapScene } from "./Scenes/GameMapScene";
import { Main_GameMenuScene } from "./Scenes/Main_GameMenuScene";
import { Load_GameMenuScene } from "./Scenes/Load_GameMenuScene";
import { Settings_GameMenuScene } from "./Scenes/Settings_GameMenuScene";
import { Intro_GameCutScene } from "./Scenes/Intro_GameCutScene";

const IslandSketch = ({
  onCharacterSelect,
  onPropertySelect,
  charList,
  setCharList,
  sizeVector = { x: 1000, y: 800 },
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const setCurrentSceneIndex2 = (i)=>{
    console.log('setCurrent');
    return setCurrentSceneIndex;
  };

  let scenes = [];

  const goToScene = (index) => {
    if (index >= 0 && index < scenes.length) {
      setCurrentSceneIndex(index);
      //scenes[index].preload(p5);
    } else {
      console.error("Non-valid scene index " + index);
    }
  };

  const nextScene = () => {
    goToScene((currentSceneIndex + 1) % scenes.length);
  };

  const prevScene = () => {
    goToScene((currentSceneIndex - 1 + scenes.length) % scenes.length);
  };

  const preload = (p5) => {
    console.log('PreloadSketch');
  };

  const setup = (p5, canvasParentRef) =>{
    p5.createCanvas(sizeVector.x, sizeVector.y).parent(canvasParentRef);
    scenes = [
      new Main_GameMenuScene(setCurrentSceneIndex2, 1, 2, 3),
      new Intro_GameCutScene(4),
      new Load_GameMenuScene(setCurrentSceneIndex2, 1, 1, 0),
      new Settings_GameMenuScene(setCurrentSceneIndex2, 3, 0),
      new GameMapScene(
        onCharacterSelect,
        onPropertySelect,
        charList,
        setCharList,
        sizeVector
      ),
    ];
    scenes[currentSceneIndex].setup(p5, canvasParentRef);
  }
  const draw = (p5) =>
    scenes.length > 0 ? scenes[currentSceneIndex].draw(p5) : null;


  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export default IslandSketch;
