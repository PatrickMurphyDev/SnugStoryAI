// IslandSketch.js
import React, { useState } from 'react';
import Sketch from 'react-p5';
import { GameMapScene } from './Entities/GameMapScene';
import { Main_GameMenuScene } from './Entities/Main_GameMenuScene';
import { Intro_GameCutScene } from './Entities/Intro_GameCutScene';

const IslandSketch = ({ onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector = { x: 800, y: 600 } }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  const scenes = [
    new Main_GameMenuScene(IslandSketch),
    new Intro_GameCutScene(),
    new GameMapScene(onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector),
  ];

  const goToScene = (index) => {
    if (index >= 0 && index < scenes.length) {
      setCurrentSceneIndex(index);
    }else{
      console.error('Non-valid scene index '+ index);
    }
  };

  const nextScene = () => {
    goToScene((currentSceneIndex + 1) % scenes.length);
  };

  const prevScene = () => {
    goToScene((currentSceneIndex - 1 + scenes.length) % scenes.length);
  };

  const preload = (p5) => scenes.forEach((val,i)=>{scenes[i].preload(p5);});
  const setup = (p5, canvasParentRef) => p5.createCanvas(800, 600).parent(canvasParentRef);
  const draw = (p5) => scenes[currentSceneIndex].draw(p5);

  return (
    <>
      <button onClick={prevScene}>Previous Scene</button>
      <button onClick={nextScene}>Next Scene</button>
      <Sketch preload={preload} setup={setup} draw={draw} />
    </>
  );
};

export default IslandSketch;
