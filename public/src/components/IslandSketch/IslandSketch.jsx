// IslandSketch.js
import React, { useState } from 'react';
import Sketch from 'react-p5';
import { GameMapScene } from './Entities/GameMapScene';
import { GameMenuScene } from './Entities/GameMenuScene';
import { GameCutScene } from './Entities/GameCutScene';

const IslandSketch = ({ onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector = { x: 800, y: 600 } }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  const scenes = [
    new GameMenuScene(),
    new GameCutScene(),
    new GameMapScene(onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector),
  ];

  const nextScene = () => {
    setCurrentSceneIndex((prevIndex) => (prevIndex + 1) % scenes.length);
  };

  const prevScene = () => {
    setCurrentSceneIndex((prevIndex) => (prevIndex - 1 + scenes.length) % scenes.length);
  };

  const goToScene = (index) => {
    if (index >= 0 && index < scenes.length) {
      setCurrentSceneIndex(index);
    }
  };

  const preload = (p5) => scenes[currentSceneIndex].preload(p5);
  const setup = (p5, canvasParentRef) => scenes[currentSceneIndex].setup(p5, canvasParentRef);
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
