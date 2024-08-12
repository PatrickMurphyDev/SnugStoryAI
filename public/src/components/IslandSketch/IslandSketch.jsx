import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';
import SimulationTime from '../../utils/SimulationTime';
import SimulationTimeControls from '../SimulationTimeControls';
import { lotPos, resLotPos, Residents } from '../../utils/MapPositions';
import LotEntity from './Entities/LotEntity'; // Import LotEntity
import CharacterEntity from './Entities/CharacterEntity';

const simTime = SimulationTime.getInstance();

const IslandSketch = ({ onCharacterSelect, onPropertySelect, sizeVector = {x:800, y:600} }) => {  
  // UI Display Variables
  const [scal, setScal] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bgImage, setBgImage] = useState();  

  // World Entities
  const [villagers, setVillagers] = useState([]);
  const [lots, setLots] = useState([]);

  useEffect(() => {
    /*simTime.onTimeUpdate((data) => {
      //console.log(`Main Sketch | Time 24-hour: ${data.time24}, Time 12-hour: ${data.time12}, Date: ${data.date}`);
      /8/setMinute(data.currentTimeOfDay);
    });*/

    // Initialize lots
    const initializeLots = () => {
      const lotEntities = lotPos.map((pos, index) => new LotEntity(index + 1, pos.name || `Lot ${index + 1}`, pos.x, pos.y, pos.size, pos.zone, pos.price, pos.fillColor, []));
      const resLotEntities = resLotPos.map((pos, index) => new LotEntity(index + 1 + lotEntities.length, pos.name || `Res ${index + 1}`, pos.x, pos.y, pos.size, pos.zone, pos.price, pos.fillColor, []));
      setLots([...lotEntities, ...resLotEntities]);
    };

    const initalizeCharacters = () => {
      const characterTempList = Residents.map((v,i,a)=>{
        const residenceLot = lots.find(lot => lot.zone === 'residential' && !lot.occupied); // Find an unoccupied residential lot
        const employmentLot = lots.find(lot => lot.zone === 'commercial' && !lot.occupied); // Find an unoccupied commercial lot
    
        // Mark the lots as occupied
        if (residenceLot) residenceLot.occupied = true;
        if (employmentLot) employmentLot.occupied = true;
    
        // Create the character with assigned lots
        return new CharacterEntity(
          v.name,
          v.age,
          v.gender,
          v.skills,
          v.bio,
          v.attributes,
          residenceLot,  // Pass residence lot
          employmentLot  // Pass employment lot
        );
      });
      setVillagers(characterTempList);
    } 

    initializeLots();
    initalizeCharacters();
    simTime.start();
    return () => simTime.dispose();
  }, []);

  const setup = (p5, canvasParentRef) => {
    setBgImage(p5.loadImage("images/islandBackgroundNew.png"));
    p5.createCanvas(sizeVector.x, sizeVector.y).parent(canvasParentRef);

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
    p5.background('#000'); 
    p5.translate(offset.x, offset.y);
    p5.scale(scal);
    p5.image(bgImage, 0, 0, 800, 600);
    p5.stroke(`#ffffff${transparency}`);
    p5.fill(`#000000${transparency}`);

    villagers.forEach(villager => {
      villager.update();
      villager.draw(p5, transparency, offset, scal);
    })
    lots.forEach(lot => {
      lot.update();

      if (p5.dist(lot.location.x / 2, lot.location.y / 2, (p5.mouseX - offset.x) / scal, (p5.mouseY - offset.y) / scal) <= 15.0) {
        lot.setHover(true);
        if(p5.mouseIsPressed){
          lot.setClick(true);
          
          console.log("lot selected", lot);
          
          onPropertySelect(lot);
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

export default IslandSketch