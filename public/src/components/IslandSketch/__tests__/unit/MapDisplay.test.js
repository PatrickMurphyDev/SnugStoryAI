import MapDisplay from './MapDisplay';

describe('MapDisplay', () => {
  let p5, mapDisplay;

  beforeEach(() => {
    p5 = { createImage: jest.fn(), loadImage: jest.fn(), push: jest.fn(), pop: jest.fn(), scale: jest.fn(), translate: jest.fn(), image: jest.fn(), mouseX: 0, mouseY: 0 };
    mapDisplay = new MapDisplay(p5, 25, 25, 'testWorld');
  });

  test('should load images correctly', () => {
    mapDisplay.loadImages();
    expect(mapDisplay.imageMap.size).toBeGreaterThan(0);
  });

  test('should render the map without errors', () => {
    mapDisplay.render();
    expect(p5.push).toHaveBeenCalled();
    expect(p5.pop).toHaveBeenCalled();
  });

  test('should handle panning correctly', () => {
    p5.mouseX = 100;
    p5.mouseY = 100;
    mapDisplay.startDragging();
    p5.mouseX = 150;
    p5.mouseY = 150;
    mapDisplay.handleMouseDragged();
    expect(mapDisplay.offset.x).toBeGreaterThan(0);
    expect(mapDisplay.offset.y).toBeGreaterThan(0);
  });

  test('should handle zoom correctly', () => {
    const event = { deltaY: -1 };
    mapDisplay.handleMouseWheel(event);
    expect(mapDisplay.zoomLevel).toBeGreaterThan(1);
  });
});
