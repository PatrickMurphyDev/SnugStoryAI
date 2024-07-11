import React, { useState, useEffect } from 'react';
import Sketch from "react-p5";
import SimulationTime from "../../utils/SimulationTime";
import CharacterEntity from './Entities/CharacterEntity';
import { lotPos, resLotPos } from "../../utils/MapPositions";
import SimulationTimeControls from '../SimulationTimeControls';

const simTime = new SimulationTime();

export default function IslandSketch() {
  const [villagers, setVillagers] = useState([]);
  const [minute, setMinute] = useState(0);
  const [scal, setScal] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    simTime.onTimeUpdate((data) => {
      console.log(
        `Time 24-hour: ${data.time24}, Time 12-hour: ${data.time12}, Date: ${data.date}`
      );
      setMinute(data.currentTimeOfDay);
      //console.log(minute, data.currentTimeOfDay);
    });
    simTime.start();
    
    return () => simTime.dispose();
  }, []);

  

  const drawCharHere = (p5, pos) => {
    pos.characters.forEach((char, index) => {
      p5.fill("red");
      p5.ellipse(pos.x / 2 + (index + 1) * 9, pos.y / 2 + 4, 7, 7);
      if (p5.dist(pos.x / 2 + (index + 1) * 9, pos.y / 2 + 4, (p5.mouseX - offset.x) / scal, (p5.mouseY - offset.y) / scal) <= 10.0) {
        p5.text(char, pos.x / 2 + (index + 1) * 9, pos.y / 2 + 4);
      }
      setVillagers(Array.from(villagers).push(new CharacterEntity(char, 18, 'female')));//, new CharacterEntity('Bob', 20, 'male')
    });
  };

  const drawLots = (p5, positions, transparency, isNonResidential, offset) => {
    positions.forEach((pos, index) => {
      let ps = p5.createVector(pos.x / 2, pos.y / 2);
      let fillColor = isNonResidential ? "#000000" : "#00aa00";
      if (pos.characters) {
        drawCharHere(p5, pos);
        p5.fill(fillColor + transparency);
      }
      if (pos.fillColor) {
        fillColor = pos.fillColor;
        p5.fill(`${fillColor}${transparency}`);
      }

      p5.ellipse(ps.x, ps.y, 10, 10);

      if (p5.dist(ps.x, ps.y, (p5.mouseX - offset.x) / scal, (p5.mouseY - offset.y) / scal) <= 15.0) {
        p5.fill(`${fillColor}ff`);
        p5.stroke("#ffffffaa");
        const label = pos.name || `${isNonResidential ? "Lot" : "Res"} ${index + 1}`;
        p5.text(label, ps.x, ps.y);
      }
      p5.fill(isNonResidential ? `#000000${transparency}` : `#00aa00${transparency}`);
      p5.stroke(`#ffffff${transparency}`);
    });
  };

  const setup = (p5, canvasParentRef) => {
    setBgImage(p5.loadImage("images/islandBackgroundNew.png"));
    p5.createCanvas(800, 600).parent(canvasParentRef);

    // set init offset
    setOffset(p5.createVector(0, 0));

    // set mouse zoom
    window.addEventListener("wheel", (e) => {
      const s = 1 - e.deltaY / 1000;
      setScal(prevScal => prevScal * s);
      const mouse = p5.createVector(p5.mouseX, p5.mouseY);
      setOffset(prevOffset => p5.createVector(prevOffset.x, prevOffset.y).sub(mouse).mult(s).add(mouse));
    });
  };

  const draw = (p5) => {
//    const mouse = p5.createVector(p5.mouseX, p5.mouseY);

    const transparency = "60";
    p5.translate(offset.x, offset.y);
    p5.scale(scal);
    p5.image(bgImage, 0, 0, 800, 600);
    p5.stroke(`#ffffff${transparency}`);
    p5.fill(`#000000${transparency}`);

    drawLots(p5, lotPos, transparency, true, offset);
    drawLots(p5, resLotPos, transparency, false, offset);

    if (p5.mouseIsPressed) {
      setOffset(prevOffset => p5.createVector(prevOffset.x - (p5.pmouseX - p5.mouseX), prevOffset.y - (p5.pmouseY - p5.mouseY)));
    }
  };

  return (
    <>
      <SimulationTimeControls simTime={simTime} />
      <Sketch
        setup={setup}
        draw={draw}
      />
    </>
  );
}
