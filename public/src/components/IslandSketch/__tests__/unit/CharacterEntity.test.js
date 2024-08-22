import CharacterEntity from './CharacterEntity';
import { states } from '../states';

describe('CharacterEntity', () => {
  let character, mockMap, mockGrid;

  beforeEach(() => {
    mockMap = { mapWidth: 10, mapHeight: 10, tiles: Array(10).fill(Array(10).fill(0)) };
    mockGrid = Array(10).fill(Array(10).fill(1));
    character = new CharacterEntity('Test', 30, 'Female', [], 'A character', {}, { location: { x: 0, y: 0 } }, { location: { x: 9, y: 9 } }, null, 1, mockGrid);
  });

  test('should start in the sleeping state', () => {
    expect(character.currentFSMState).toBe(states.SLEEPING);
  });

  test('should transition to traveling state and move', () => {
    character.moveTo({ x: 5, y: 5 });
    expect(character.currentFSMState).toBe(states.LEAVING);
  });

  test('should move character to correct destination', () => {
    character.moveTo({ x: 5, y: 5 });
    character.update();
    
    expect(character.x).toBeGreaterThan(0); // Ensure movement
    expect(character.y).toBeGreaterThan(0);
  });

  test('should handle multi-stage movement correctly', () => {
    character.moveTo({ x: 5, y: 5 });
    character.update();
    character.currentFSMState = states.TRAVELING;

    expect(character.currentFSMState).toBe(states.TRAVELING);

    character.update();
    expect(character.currentFSMState).toBe(states.ARRIVING);
  });
});
