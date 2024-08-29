/*
    Little JS Module Demo
    - A simple starter project
    - Shows how to use LittleJS with modules
*/
// import module
import * as LittleJS from "./littlejs.esm.js";
const { tile, vec2, hsl } = LittleJS;

let GLOBALDATETIME = {
  dateValue: { yearValue: 2004, monthValue: 3, dayValue: 21 },
  timeValue: { hourValue: 12, minuteValue: 18, dayPartValue: "PM" },
};

// show the LittleJS splash screen
LittleJS.setShowSplashScreen(false);

// sound effects
const sound_click = new LittleJS.Sound([1, 0.5]);

// medals
const medal_example = new LittleJS.Medal(
  0,
  "Example Medal",
  "Welcome to LittleJS!"
);

LittleJS.medalsInit("Hello World");

let spriteAtlas;

///////////////////////////////////////////////////////////////////////////////
function getCameraTarget()
{
    // camera is above player
    const offset = 30;
    return new LittleJS.Vector2(0,0).add(new LittleJS.Vector2(0, offset));
}

///////////////////////////////////////////////////////////////////////////////
function gameInit() {
  // create a table of all sprites
  spriteAtlas = {
    // large tiles
    circle: tile(0),
    crate: tile(2),
    player: tile(3),
    enemy: tile(5),
    coin: tile(6),

    // small tiles
    gun: tile(2, 8),
    grenade: tile(3, 8),
  };

  // enable touch gamepad on touch devices
  LittleJS.setTouchGamepadEnable(true);

  // setup level
  //buildLevel();

  // init game
  LittleJS.setGravity(0);
  LittleJS.setObjectDefaultDamping(0.99);
  LittleJS.setObjectDefaultAngleDamping(0.99);
  LittleJS.setCameraScale(4 * 16);
  LittleJS.setCameraPos(getCameraTarget());

  // create tile collision and visible tile layer
  const tileCollisionSize = vec2(32, 16);
  LittleJS.initTileCollision(tileCollisionSize);
  const pos = vec2();
  const tileLayer = new LittleJS.TileLayer(pos, tileCollisionSize);

  // get level data from the tiles image
  const mainContext = LittleJS.mainContext;
  const tileImage = LittleJS.textureInfos[0].image;
  mainContext.drawImage(tileImage, 0, 0);
  const imageData = mainContext.getImageData(
    0,
    0,
    tileImage.width,
    tileImage.height
  ).data;
  for (pos.x = tileCollisionSize.x; pos.x--; )
    for (pos.y = tileCollisionSize.y; pos.y--; ) {
      // check if this pixel is set
      const i = pos.x + tileImage.width * (15 + tileCollisionSize.y - pos.y);
      if (!imageData[4 * i]) continue;

      // set tile data
      const tileIndex = 1;
      const direction = LittleJS.randInt(4);
      const mirror = !LittleJS.randInt(2);
      const color = LittleJS.randColor();
      const data = new LittleJS.TileLayerData(
        tileIndex,
        direction,
        mirror,
        color
      );
      tileLayer.setData(pos, data);
      LittleJS.setTileCollisionData(pos, 1);
    }

  // draw tile layer with new data
  tileLayer.redraw();

  // move camera to center of collision
  LittleJS.setCameraPos(tileCollisionSize.scale(0.5));
  LittleJS.setCameraScale(48);

  // enable gravity
  LittleJS.setGravity(0); //-.01);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  if (LittleJS.mouseWasPressed(0)) {
    // play sound when mouse is pressed
    sound_click.play(LittleJS.mousePos);

    // unlock medals
    medal_example.unlock();
  }

  // move particles to mouse location if on screen
  //if (LittleJS.mousePosScreen.x)
  //particleEmitter.pos = LittleJS.mousePos;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {}

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
  // draw a grey square in the background without using webgl
  LittleJS.drawRect(vec2(16, 8), vec2(20, 14), hsl(0, 0, 0.6), 0, false);

  // draw the logo as a tile
  LittleJS.drawTile(vec2(21, 5), vec2(4.5), tile(3, 128));
}

function timeFormat(timeIn) {
    return "10:38 PM"
    //return timeIn.hourValue + ":"+ timeIn.minuteValue + " " + timeIn.dayPartValue;
}

function dateFormat(dateIn) {
    return "09/15/2024"
    //return timeIn.hourValue + ":"+ timeIn.minuteValue + " " + timeIn.dayPartValue;
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  // draw to overlay canvas for hud rendering
  LittleJS.drawTextScreen(
    "Asbury's Reef",
    vec2(LittleJS.mainCanvasSize.x / 2, 80),
    80
  );
  // selected char
  // selected property
  // chat window
  // menu
  // draw to overlay canvas for hud rendering// draw to overlay canvas for hud rendering
  const drawText = (text, x, y, size = 40) => {
    LittleJS.overlayContext.textAlign = "center";
    LittleJS.overlayContext.textBaseline = "top";
    LittleJS.overlayContext.font = size + "px arial";
    LittleJS.overlayContext.fillStyle = "#fff";
    LittleJS.overlayContext.lineWidth = 3;
    LittleJS.overlayContext.strokeText(text, x, y);
    LittleJS.overlayContext.fillText(text, x, y);
  };
  drawText("Date: " + dateFormat(GLOBALDATETIME.date), (LittleJS.overlayCanvas.width * 1) / 4, 20);
  drawText("Time: " + timeFormat(GLOBALDATETIME.time), (LittleJS.overlayCanvas.width * 3) / 4, 20);
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
LittleJS.engineInit(
  gameInit,
  gameUpdate,
  gameUpdatePost,
  gameRender,
  gameRenderPost
);
