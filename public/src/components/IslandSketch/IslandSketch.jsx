import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';
import SimulationTime from '../../utils/SimulationTime';
import SimulationTimeControls from '../SimulationTimeControls';
import { lotPos, resLotPos } from '../../utils/MapPositions';
import LotEntity from './Entities/LotEntity'; // Import LotEntity

const simTime = new SimulationTime();

export default function IslandSketch() {
  const [villagers, setVillagers] = useState([]);
  const [minute, setMinute] = useState(0);
  const [scal, setScal] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bgImage, setBgImage] = useState();  
  const [lots, setLots] = useState([]); // State for lots
  const [selectedLot, setSelectedLot] = useState(null);


  useEffect(() => {
    simTime.onTimeUpdate((data) => {
      console.log(
        `Time 24-hour: ${data.time24}, Time 12-hour: ${data.time12}, Date: ${data.date}`
      );
      setMinute(data.currentTimeOfDay);
      //console.log(minute, data.currentTimeOfDay);
    });
    simTime.start();

    // Initialize lots
    const initializeLots = () => {
      const lotEntities = lotPos.map((pos, index) => new LotEntity(index + 1, pos.name || `Lot ${index + 1}`, pos.x, pos.y, pos.size, pos.zone, pos.price, pos.fillColor, pos.characters));
      const resLotEntities = resLotPos.map((pos, index) => new LotEntity(index + 1 + lotEntities.length, pos.name || `Res ${index + 1}`, pos.x, pos.y, pos.size, pos.zone, pos.price, pos.fillColor, pos.characters));
      setLots([...lotEntities, ...resLotEntities]);
    };

    initializeLots();

    return () => simTime.dispose();
  }, []);

  const setup = (p5, canvasParentRef) => {
    setBgImage(p5.loadImage("images/islandBackgroundNew.png"));
    p5.createCanvas(800, 600).parent(canvasParentRef);

    // set init offset
    setOffset(p5.createVector(0, 0));

    // set mouse zoom
    window.addEventListener('wheel', (e) => {
      const s = 1 - e.deltaY / 1000;
      setScal(prevScal => prevScal * s);
      const mouse = p5.createVector(p5.mouseX, p5.mouseY);
      setOffset(prevOffset => p5.createVector(prevOffset.x, prevOffset.y).sub(mouse).mult(s).add(mouse));
    });

    window.addEventListener('mouseup', (e) => {
      console.log(e);
    });
  };

  const draw = (p5) => {
    const transparency = '60';
    p5.translate(offset.x, offset.y);
    p5.scale(scal);
    p5.image(bgImage, 0, 0, 800, 600);
    p5.stroke(`#ffffff${transparency}`);
    p5.fill(`#000000${transparency}`);

    lots.forEach(lot => {
      if (p5.dist(lot.location.x / 2, lot.location.y / 2, (p5.mouseX - offset.x) / scal, (p5.mouseY - offset.y) / scal) <= 15.0) {
        lot.setHover(true);
        if(p5.mouseIsPressed){
          lot.setClick(true);
          
          console.log("lot selected", lot);
          setSelectedLot(lot);
        }
      }
      lot.draw(p5, transparency, offset, scal);
    });

    // set offset vector if mouse dragged
    if (p5.mouseIsPressed) {
      let tmpOffset = { x: offset.x + 0, y: offset.y + 0 };
      tmpOffset.x -= p5.pmouseX - p5.mouseX;
      tmpOffset.y -= p5.pmouseY - p5.mouseY;

      setOffset(p5.createVector(tmpOffset.x, tmpOffset.y));
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
