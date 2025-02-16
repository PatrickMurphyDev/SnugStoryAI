export class GameTileMapManager {
  constructor(parent, dimensions) {
    this.parent = parent;
    this.imageData = parent.parentAssets.GameMapScene.TileMovementMap;
    this.dimensions = dimensions || { width: 64, height: 64 };
    this.imageDimensions = {
      width: this.dimensions.width * 3,
      height: this.dimensions.height * 3,
    };
    this.tileSize = 32;
  }

  getColorAtLocation(location) {
    const pixelLocation = this.getImagePixelSubTileLocation(location);
    const tileIndex =
      Math.round(pixelLocation.x) +
      Math.round(pixelLocation.y) * this.imageDimensions.width;
    this.imageData.loadPixels();
    const tileType = {
      r: this.imageData.pixels[tileIndex * 4],
      g: this.imageData.pixels[tileIndex * 4 + 1],
      b: this.imageData.pixels[tileIndex * 4 + 2],
      a: this.imageData.pixels[tileIndex * 4 + 3],
    };
    return tileType;
  }

  getTileMapData() {
    return this.imageData;
  }

  getImagePixelTileLocation(positionVector) {
    const pixelLocation = {
      x: positionVector.x / this.tileSize,
      y: positionVector.y / this.tileSize,
    };
    return pixelLocation;
  }

  getImagePixelSubTileLocation(positionVector) {
    const pixelLocation = {
      x: (positionVector.x / this.tileSize) * 3,
      y: (positionVector.y / this.tileSize) * 3,
    };
    return pixelLocation;
  }

  getTileSize() {
    return this.tileSize;
  }

  getWidth() {
    return this.dimensions.width;
  }

  getHeight() {
    return this.dimensions.height;
  }
}
