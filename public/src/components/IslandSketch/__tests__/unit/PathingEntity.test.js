import PathingEntity from './PathingEntity';
import PF from 'pathfinding';

describe('PathingEntity', () => {
  let entity, mockMap, mockGrid;

  beforeEach(() => {
    mockMap = { mapWidth: 10, mapHeight: 10, tiles: Array(10).fill(Array(10).fill(0)) };
    mockGrid = Array(10).fill(Array(10).fill(1));
    entity = new PathingEntity(0, 0, mockMap, 1, mockGrid);
  });

  test('should calculate path correctly using A*', () => {
    const goal = { x: 2, y: 2 };
    entity.setPath(goal);
    expect(entity.path.length).toBeGreaterThan(0);
  });

  test('should adjust speed based on tile speed modifier', () => {
    mockGrid[0][0] = 0.75;
    mockGrid[0][1] = 1.75;
    
    entity.setNextTarget();
    entity.update();
    
    expect(entity.speed).toBe(1); // Base speed
    expect(entity.currentTarget).toBeDefined();
  });

  test('should handle blocked paths correctly', () => {
    mockMap.tiles[1][1] = 1; // Block tile
    const goal = { x: 2, y: 2 };
    entity.setPath(goal);
    
    expect(entity.path.length).toBe(0); // Path should be empty
  });

  test('should recalculate path when target changes', () => {
    const goal1 = { x: 5, y: 5 };
    entity.setPath(goal1);
    const initialPathLength = entity.path.length;

    const goal2 = { x: 2, y: 2 };
    entity.setPath(goal2);
    const newPathLength = entity.path.length;

    expect(newPathLength).not.toBe(initialPathLength); // Path should change
  });
});
