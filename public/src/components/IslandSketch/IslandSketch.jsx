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
  sizeVector = { x: 800, y: 600 },
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  let scenes = [];

  const goToScene = (index) => {
    if (index >= 0 && index < scenes.length) {
      setCurrentSceneIndex(index);
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

  const preload = (p5) =>
    scenes.forEach((val, i) => {
      scenes[i].preload(p5);
    });
  const setup = (p5, canvasParentRef) =>
    p5.createCanvas(sizeVector.x, sizeVector.y).parent(canvasParentRef);
  const draw = (p5) => scenes[currentSceneIndex].draw(p5);
  scenes = [
    new Main_GameMenuScene(setCurrentSceneIndex, 1, 2, 3),
    new Intro_GameCutScene(setCurrentSceneIndex, 4),
    new Load_GameMenuScene(setCurrentSceneIndex, 1, 1, 0),
    new Settings_GameMenuScene(setCurrentSceneIndex, 3, 0),
    new GameMapScene(
      onCharacterSelect,
      onPropertySelect,
      charList,
      setCharList,
      sizeVector
    ),
  ];

  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export default IslandSketch;
