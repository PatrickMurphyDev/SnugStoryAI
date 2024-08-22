import React from 'react';
import { render } from '@testing-library/react';
import IslandSketch from '../IslandSketch';
import MapDisplay from '../MapDisplay';
import CharacterEntity from '../Entities/CharacterEntity';
import { states, stateDetails } from '../states';

describe('Map and Character Rendering Integration', () => {
  let mapDisplay, character, mockP5, mockMap, mockGrid;

  beforeEach(() => {
    mockP5 = { createCanvas: jest.fn(), createImage: jest.fn(), loadImage: jest.fn(), image: jest.fn(), translate: jest.fn(), scale: jest.fn(), background: jest.fn(), ellipse: jest.fn() };
    mockMap = { mapWidth: 10, mapHeight: 10, tiles: Array(10).fill(Array(10).fill(0)) };
    mockGrid = Array(10).fill(Array(10).fill(1));

    mapDisplay = new MapDisplay(mockP5, 25, 25, 'testWorld');
    character = new CharacterEntity('Test', 30, 'Female', [], 'A character', {}, { location: { x: 0, y: 0 } }, { location: { x: 9, y: 9 } }, null, 1, mockGrid);
  });

  test('Character should render correctly on map', () => {
    character.moveTo({ x: 5, y: 5 });
    character.update();

    expect(mockP5.image).toHaveBeenCalled(); // Character image should be rendered
  });

  test('Map should update when character moves', () => {
    mapDisplay.render();
    character.moveTo({ x: 5, y: 5 });
    character.update();

    mapDisplay.render();
    expect(mockP5.translate).toHaveBeenCalledTimes(2); // Map rendering should reflect character movement
  });
});
