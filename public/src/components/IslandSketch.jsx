// Example p5.js sketch in React
import React from "react";
import Sketch from "react-p5";

export default function IslandSketch() {
  let bg;
  const controls = {
    view: {x: 0, y: 0, zoom: 1},
    viewPos: { prevX: null,  prevY: null,  isDragging: false },
    pLib: {}
  }
  let resLotPos = [
    { "x": 210, "y": 736 },
    { "x": 267, "y": 686 },
    { "x": 322, "y": 611 },
    { "x": 387, "y": 552 },
    { "x": 459, "y": 504 },
    { "x": 552, "y": 446 },
    { "x": 619, "y": 411 },
    { "x": 694, "y": 392 },
    { "x": 755, "y": 386 },
    { "x": 805, "y": 379 },
    { "x": 998, "y": 771 },
    { "x": 1059, "y": 742 },
    { "x": 1106, "y": 733 },
    { "x": 1176, "y": 720 },
    { "x": 314, "y": 771 },
    { "x": 790, "y": 936, name:"Keeper's" },
  ];
  let lotPos = [
    { x: 700, y: 650, name: "Town Hall", fillColor: '#aabbff'},
    { x: 680, y: 765, name: "Fire Dept.", fillColor: '#aa0000'},
    { x: 750, y: 800, name: "Police Dept.", fillColor: '#0000aa'},
    { x: 615, y: 845, name: "Harbor Master", fillColor: '#008888' },
    { x: 560, y: 800 },
    { x: 490, y: 755 },
    { x: 530, y: 710 },
    { x: 600, y: 740 },
    { x: 648, y: 678 },
    { x: 710, y: 718 },
    { x: 758, y: 570 },
    { x: 804, y: 600 },
    { x: 816, y: 842 },
    { x: 488, y: 610 },
    { x: 620, y: 528 },
    { x: 854, y: 930, name: 'Lighthouse' },
    { x: 906, y: 448 },
    { x: 1018, y: 502 },
    { x: 1170, y: 562 },
  ];
  const setup = (p5, canvasParentRef) => {
    controls.pLib = p5;
    bg = p5.loadImage("images/IslandBackground.png");
    p5.createCanvas(800, 600).parent(canvasParentRef);
    //p5.mouseWheel = e => Controls.zoom(controls).worldZoom(e);
  };
  /*
    p5.mousePressed = e => Controls.move(controls).mousePressed(e);
    p5.mouseDragged = e => Controls.move(controls).mouseDragged(e);
    p5.mouseReleased = e => Controls.move(controls).mouseReleased(e); */


//window.mousePressed = e => Controls.move(controls).mousePressed(e)
//window.mouseDragged = e => Controls.move(controls).mouseDragged(e);
//window.mouseReleased = e => Controls.move(controls).mouseReleased(e)

  const draw = (p5) => {
    const transpar = '44';
    p5.translate(controls.view.x, controls.view.y);
    p5.scale(controls.view.zoom);
    p5.image(bg,0,0,800,600);
    p5.stroke("#ffffff"+transpar);
    p5.fill("#000000"+transpar);

    for (var i = 0; i < lotPos.length; i++) {
      let fillColtemp = '#000000';
      if(lotPos[i].hasOwnProperty("fillColor")){
        p5.fill(lotPos[i].fillColor+transpar);
        fillColtemp = lotPos[i].fillColor;
      }
      if(p5.dist(lotPos[i].x/2, lotPos[i].y/2, p5.mouseX, p5.mouseY) <= 15.0){
        p5.fill(fillColtemp+'ff');
        p5.stroke("#ffffffff");
      }
      p5.ellipse(lotPos[i].x / 2, lotPos[i].y / 2, 10, 10);
      let txt = "Lot " + (i + 1);
      if(lotPos[i].hasOwnProperty("name")){
        txt = lotPos[i].name;
      }
      p5.text(txt, lotPos[i].x / 2, lotPos[i].y / 2);
      p5.fill('#000000'+transpar);
      p5.stroke("#ffffff"+transpar);
    }

    p5.fill('#00aa00'+transpar);

    for (var k = 0; k < resLotPos.length; k++) {
      if(p5.dist(resLotPos[k].x/2, resLotPos[k].y/2, p5.mouseX, p5.mouseY) <= 15.0){
        p5.fill('#00aa00ff');
        p5.stroke("#ffffffff");
      }
      let txt = "Res " + (k + 1);
      if(resLotPos[k].hasOwnProperty("name")){
        txt = resLotPos[k].name;
      }
      p5.ellipse(resLotPos[k].x / 2, resLotPos[k].y / 2, 10, 10);
      p5.text(txt, resLotPos[k].x / 2, resLotPos[k].y / 2);
      p5.fill('#00aa00'+transpar);
      p5.stroke("#ffffff"+transpar);
    }
  };

  let ijk = 0;
  let lotPosList = [];
  const mp = (e) => {
    if (ijk++ % 2 === 0) {
      console.log({ x: e.mouseX*2, y: e.mouseY*2 });
      lotPosList.push({ x: e.mouseX * 2, y: e.mouseY * 2 });
      lotPos.push({ x: e.mouseX * 2, y: e.mouseY * 2 });
    }
  };

  return <Sketch setup={setup} draw={draw} mousePressed={mp} />;
}



class Controls {
  static move(controls) {
    function mousePressed(e) {
      controls.viewPos.isDragging = true;
      controls.viewPos.prevX = e.clientX;
      controls.viewPos.prevY = e.clientY;
    }

    function mouseDragged(e) {
      const {prevX, prevY, isDragging} = controls.viewPos;
      if(!isDragging) return;

      const pos = {x: e.clientX, y: e.clientY};
      const dx = pos.x - prevX;
      const dy = pos.y - prevY;

      if(prevX || prevY) {
        controls.view.x += dx;
        controls.view.y += dy;
        controls.viewPos.prevX = pos.x;
        controls.viewPos.prevY = pos.y;
      }
    }

    function mouseReleased(e) {
      controls.viewPos.isDragging = false;
      controls.viewPos.prevX = null;
      controls.viewPos.prevY = null;
    }
 
    return {
      mousePressed, 
      mouseDragged, 
      mouseReleased
    }
  }

  static zoom(controls) {
    // function calcPos(x, y, zoom) {
    //   const newX = width - (width * zoom - x);
    //   const newY = height - (height * zoom - y);
    //   return {x: newX, y: newY}
    // }

    function worldZoom(e) {
      const {x, y, deltaY} = e;
      const direction = deltaY > 0 ? -1 : 1;
      const factor = 0.05;
      const zoom = 1 * direction * factor;

      const wx = (x-controls.view.x)/(controls.pLib.width*controls.view.zoom);
      const wy = (y-controls.view.y)/(controls.pLib.height*controls.view.zoom);
      
      controls.view.x -= wx*controls.pLib.width*zoom;
      controls.view.y -= wy*controls.pLib.height*zoom;
      controls.view.zoom += zoom;
    }

    return {worldZoom}
  }
}