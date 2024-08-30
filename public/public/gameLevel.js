/*
    LittleJS Platformer Example - Level Generator
    - Procedurally generates level geometry
    - Picks colors for the level and background
    - Creates crates, doors, and spawns player
*/
// import module
import * as LittleJS from "./littlejs.esm.js";
import Player from "./gamePlayer.js";
//import DoorTile from "./tiles/DoorTile";
import { GatherableItem, DoorTile } from "./gameObjects.js";
const {
  tile,
  vec2,
  hsl,
  ASSERT,
  tileCollisionSize,
  TileLayerData,
  randColor,
  engineObjectsUpdate,
  setTileCollisionData,
  getTileCollisionData,
  layer,
  PI,
  randInt,
  initTileCollision,
  TileLayer,
  engineObjectsDestroy,
} = LittleJS;

// Tile types
const tileType_empty = 0;
const tileType_solid = 1111;
const tileType_breakable = 2;
const tileType_door = 3;
const tileType_SolidTop = 1;
const tileType_SolidRight = 10;
const tileType_SolidBottom = 100;
const tileType_SolidLeft = 1000;

let player, playerStartPos, tileData, tileLayers, foregroundLayerIndex;
let levelSize, levelColor, levelBackgroundColor, levelOutlineColor, warmup;

// Utility functions to set and get tile data
const setTileData = (pos, layer, data) =>
  pos.arrayCheck(tileCollisionSize) &&
  (tileData[layer][((pos.y | 0) * tileCollisionSize.x + pos.x) | 0] = data);
const getTileData = (pos, layer) =>
  pos.arrayCheck(tileCollisionSize)
    ? tileData[layer][((pos.y | 0) * tileCollisionSize.x + pos.x) | 0]
    : 0;

function buildLevel() {
  // Initialize level colors and load level data
  initializeLevelColors();
  loadLevel();

  // Apply decoration to all level tiles
  const layerCount = tileLayers.length;
  for (let layer = layerCount; layer--; ) processLayerTiles(layer);

  // Warm up the level to ensure smooth gameplay
  warmupLevel();

  // Spawn the player at the starting position
  player = new Player(playerStartPos);
}

// Function to initialize level colors
function initializeLevelColors() {
  levelColor = randColor(hsl(0, 0, 0.2), hsl(0, 0, 0.8));
  levelBackgroundColor = levelColor.mutate().scale(0.4, 1);
  levelOutlineColor = levelColor.mutate().add(hsl(0, 0, 0.4)).clamp();
}

// Function to warm up the level by running updates
function warmupLevel() {
  warmup = 1;
  for (let i = 500; i--; ) engineObjectsUpdate();
  warmup = 0;
}

// Function to process and decorate tiles for each layer
function processLayerTiles(layer) {
  const pos = vec2();
  for (pos.x = levelSize.x; pos.x--; )
    for (pos.y = levelSize.y; pos.y--; ) decorateTile(pos, layer);
}

// Function to load level data from an exported Tiled js file
function loadLevel() {
  const dataName = Object.keys(TileMaps)[0];
  const tileMapData = TileMaps[dataName];
  levelSize = vec2(tileMapData.width, tileMapData.height);
  initTileCollision(levelSize);
  engineObjectsDestroy();

  // Lookup table for tile types
  const tileLookup = createTileLookup();

  // Set all level data tiles
  tileData = [];
  tileLayers = [];
  playerStartPos = vec2(1, levelSize.y);
  const layerCount = tileMapData.layers.length;
  foregroundLayerIndex = layerCount - 1;

  for (let layer = layerCount; layer--; ) {
    const layerData = tileMapData.layers[layer].data;
    const tileLayer = createTileLayer(layer);
    tileLayers[layer] = tileLayer;
    tileData[layer] = [];

    for (let x = levelSize.x; x--; )
      for (let y = levelSize.y; y--; )
        processTile(layer, tileLookup, layerData, x, y, tileLayer);

    tileLayer.redraw();
  }
}

// Function to create a lookup table for different tile types
function createTileLookup() {
  return {
    circle: 1,
    ground: 2,
    metal: 5,
    player: 17,
    crate: 18,
    door: 19, // New entry for door tile
    gatherableItem: 20, // Formerly coin, now GatherableItem
  };
}

// Function to create a tile layer for rendering
function createTileLayer(layer) {
  const tileLayer = new TileLayer(vec2(), levelSize, tile(0, 16, 1));
  tileLayer.renderOrder = -1e3 + layer;
  return tileLayer;
}

// Function to process each tile in the layer
function processTile(layer, tileLookup, layerData, x, y, tileLayer) {
  const pos = vec2(x, levelSize.y - 1 - y);
  const tile = layerData[y * levelSize.x + x];

  if (tile >= tileLookup.player) {
    // Create an object for specific tiles (player, crate, gatherableItem, door)
    createObjectForTile(tile, tileLookup, pos);
    return;
  }

  // Set the tile data
  setTileData(pos, layer, tile);

  // Determine the tile type for special tiles
  const tileType = determineTileType(tile, tileLookup);

  if (tileType) {
    // Set collision data for solid tiles in the foreground layer
    if (layer == foregroundLayerIndex) setTileCollisionData(pos, tileType);

    // Set tile layer data for rendering
    setTileLayerData(tileType, layer, tileLayer, pos, tile);
  }
}

// Function to create objects like player, crate, gatherable items, and doors
function createObjectForTile(tile, tileLookup, pos) {
  const objectPos = pos.add(vec2(0.5));
  if (tile == tileLookup.player) playerStartPos = objectPos;
  //else if (tile == tileLookup.crate) new Crate(objectPos);
  else if (tile == tileLookup.gatherableItem)
    new GatherableItem(objectPos); // Formerly Coin, now GatherableItem
  else if (tile == tileLookup.door) new DoorTile(objectPos); // New door object
}

// Function to determine the tile type based on the tile value
function determineTileType(tile, tileLookup) {
  let tileType = tileType_solid; //tileType_empty;
  if (tile == tileLookup.metal) tileType = tileType_solid;
  if (tile == tileLookup.door) tileType = tileType_door; // Handle door tile type
  return tileType;
}

// Function to set the data for rendering a tile
function setTileLayerData(tileType, layer, tileLayer, pos, tile) {
  let direction, mirror, color;
  if (tileType == tileType_breakable || tileType == tileType_door) {
    direction = randInt(4);
    mirror = randInt(2);
    //color = layer ? levelColor : levelBackgroundColor;
    //color = color.mutate(0.03);
  }

  const data = new TileLayerData(tile - 1, direction, mirror, color);
  tileLayer.setData(pos, data);
}

// Function to decorate a tile based on its position and layer
function decorateTile(pos, layer = 1) {
  ASSERT((pos.x | 0) == pos.x && (pos.y | 0) == pos.y);
  const tileLayer = tileLayers[layer];

  if (layer == foregroundLayerIndex) {
    decorateForegroundTile(pos, tileLayer);
  } else {
    decorateBackgroundTile(pos, tileLayer);
  }
}

// Function to decorate foreground tiles (e.g., outline breakable tiles, doors)
function decorateForegroundTile(pos, tileLayer) {
  const tileType = getTileCollisionData(pos);
  if (tileType <= 0) {
    tileType || tileLayer.setData(pos, new TileLayerData(), 1);
    return;
  }
  if (tileType == tileType_breakable || tileType == tileType_door) {
    drawTileOutline(pos, tileLayer);
  }
}

// Function to decorate background tiles (e.g., round corners)
function decorateBackgroundTile(pos, tileLayer) {
  for (let i = 4; i--; ) {
    const neighborTileDataA = getTileData(
      pos.add(vec2().setDirection(i)),
      layer
    );
    const neighborTileDataB = getTileData(
      pos.add(vec2().setAngle((((i + 1) % 4) * PI) / 2)),
      layer
    );
    if (neighborTileDataA > 0 || neighborTileDataB > 0) continue;

    const directionVector = vec2()
      .setAngle((i * PI) / 2 + PI / 4, 10)
      .floor();
    const drawPos = pos.add(vec2(0.5)).scale(16).add(directionVector).floor();

    clearTileCorner(drawPos, tileLayer);
  }
}

// Function to draw an outline around breakable tiles and doors
function drawTileOutline(pos, tileLayer) {
  for (let i = 4; i--; ) {
    const neighborTileType = getTileCollisionData(
      pos.add(vec2().setDirection(i))
    );
    if (
      neighborTileType == tileType_breakable ||
      neighborTileType == tileType_door
    )
      continue;

    const size = i & 1 ? vec2(2, 16) : vec2(16, 2);
    tileLayer.context.fillStyle = levelOutlineColor.mutate(0.1);
    const drawPos = pos
      .scale(16)
      .add(vec2(i == 1 ? 14 : 0, i == 0 ? 14 : 0))
      .subtract(i & 1 ? vec2(0, 8 - size.y / 2) : vec2(8 - size.x / 2, 0));
    tileLayer.context.fillRect(
      drawPos.x,
      tileLayer.canvas.height - drawPos.y,
      size.x,
      -size.y
    );
  }
}

// Function to clear rounded corners for background tiles
function clearTileCorner(drawPos, tileLayer) {
  const s = 2;
  tileLayer.context.clearRect(
    drawPos.x - s / 2,
    tileLayer.canvas.height - drawPos.y - s / 2,
    s,
    s
  );
}
export {
  buildLevel,
  initializeLevelColors,
  warmupLevel,
  processLayerTiles,
  loadLevel,
  createTileLookup,
  createTileLayer,
  processTile,
  createObjectForTile,
  determineTileType,
  setTileLayerData,
  decorateTile,
  decorateForegroundTile,
  decorateBackgroundTile,
  drawTileOutline,
  clearTileCorner,
  player,
  playerStartPos
};
