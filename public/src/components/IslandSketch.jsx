import React from "react";
import Sketch from "react-p5";
import SimulationTime from '../utils/SimulationTime';

import {lotPos, resLotPos} from '../utils/MapPositions';
import Controls from '../utils/MapControls';

const simTime = new SimulationTime();

export default function IslandSketch() {
  let bg;
  
  let scal = 1;

  let offset;
  const controls = {
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
    pLib: {},
  };

  const setup = (p5, canvasParentRef) => {
    controls.pLib = p5;
    bg = p5.loadImage("images/IslandBackground.png");
    p5.createCanvas(800, 600).parent(canvasParentRef);
    offset = p5.createVector(0, 0);

        
    simTime.onTimeUpdate((data) => {
      console.log(`Time 24-hour: ${data.time24}, Time 12-hour: ${data.time12}, Date: ${data.date}`);
    });
    simTime.start();

// Change rate of time after 10 seconds
setTimeout(() => {
  simTime.setRateOfTime(2); // 2x speed
}, 10000);

// Pause after 20 seconds
setTimeout(() => {
  simTime.pause();
}, 20000);



  window.addEventListener("wheel", e => {
    const s = 1 - (e.deltaY / 1000);
    scal *= s;

    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    
    offset
      .sub(mouse)
      .mult(s)
      .add(mouse)

  });
    //p5.mouseWheel = e => Controls.zoom(controls).worldZoom(e);
  };

  const draw = (p5) => {
    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    const relativeMouse = mouse.copy().sub(offset);

    const transparency = "60";
    //p5.translate(controls.view.x, controls.view.y);
    p5.translate(offset.x, offset.y);
    p5.scale(scal);
    
    //p5.scale(controls.view.zoom);
    p5.image(bg, 0, 0, 800, 600);
    p5.stroke(`#ffffff${transparency}`);
    p5.fill(`#000000${transparency}`);

    drawLots(p5, lotPos, transparency, true);
    drawLots(p5, resLotPos, transparency, false);

  if (p5.mouseIsPressed) {
    offset.x -= p5.pmouseX - p5.mouseX;
    offset.y -= p5.pmouseY - p5.mouseY;
  }
  };

  const drawCharHere = (p5, pos) => {
    pos.characters.forEach((char, index) => {
      p5.fill('red');
      p5.ellipse(pos.x/2 + (index+1)*9,pos.y/2+4,7,7);
    })
  }

  const drawLots = (p5, positions, transparency, isLot) => {
    positions.forEach((pos, index) => {
      let fillColor = isLot ? "#000000" : "#00aa00";
      if(pos.characters){
        drawCharHere(p5, pos);
        p5.fill(fillColor+transparency);
      }
      if (pos.fillColor) {
        fillColor = pos.fillColor;
        p5.fill(`${fillColor}${transparency}`);
      }
      
      p5.ellipse(pos.x / 2, pos.y / 2, 10, 10);
      
      if (p5.dist(pos.x / 2, pos.y / 2, p5.mouseX, p5.mouseY) <= 15.0) {
        p5.fill(`${fillColor}ff`);
        p5.stroke("#ffffffaa");
        const label = pos.name || `${isLot ? "Lot" : "Res"} ${index + 1}`;
        p5.text(label, pos.x / 2, pos.y / 2);
      }
      p5.fill(isLot ? `#000000${transparency}` : `#00aa00${transparency}`);
      p5.stroke(`#ffffff${transparency}`);
    });
  };

  let clickCount = 0;
  const lotPosList = [];

  const mousePressed = (e) => {
    //Controls.move(controls).mousePressed(e);
    //window.mouseDragged = e => Controls.move(controls).mouseDragged(e);
    //window.mouseReleased = e => Controls.move(controls).mouseReleased(e);
    /**if (clickCount++ % 2 === 0) {
      console.log({ x: e.mouseX * 2, y: e.mouseY * 2 });
      lotPosList.push({ x: e.mouseX * 2, y: e.mouseY * 2 });
      lotPos.push({ x: e.mouseX * 2, y: e.mouseY * 2 });
    } */
  };

  return <><Sketch setup={setup} draw={draw} mousePressed={e => Controls.move(controls).mousePressed(e)} mouseDragged={e => Controls.move(controls).mouseDragged(e)} mouseReleased={e => Controls.move(controls).mouseReleased(e)} />
  <div><input type="range" min="1" max="1440" value={simTime.currentTimeOfDay} /></div></>;
}
