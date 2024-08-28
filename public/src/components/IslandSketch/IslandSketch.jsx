import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';
import SimulationTime from '../../utils/SimulationTime';
import SimulationTimeControls from '../SimulationTimeControls';
import { lotPos, resLotPos, Residents } from '../../utils/MapPositions';
import LotEntity from './Entities/LotEntity'; // Import LotEntity
import CharacterEntity from './Entities/CharacterEntity';
import { IslandTemplate } from '../../utils/IslandTemplateTile';

const simTime = SimulationTime.getInstance();


const IslandSketch = ({ onCharacterSelect, onPropertySelect, charList, setCharList, sizeVector = {x:800, y:600} }) => {  
  // UI Display Variables
  const [scal, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bgImage, setBgImage] = useState();  
  const [charImages, setCharacterImages] = useState([]);

  // World Entities
  //const [villagers, setVillagers] = useState([]);
  const villagers = charList;
  const setVillagers = (nList)=>setCharList(nList);
  const [lots, setLots] = useState([]);
  if(IslandTemplate.Image.size){
    sizeVector = IslandTemplate.Image.size;
  }

  const setPanX = (newX) => setOffset((prevOffset)=>({'x': newX, 'y': prevOffset.y}));
  const setPanY = (newY) => setOffset((prevOffset)=>({'x': prevOffset.x, 'y':newY}));

  const handleKeyDown = (event) => {
    switch (event.key) {
      case '+':
        setZoom((prevZoom) => Math.min(prevZoom * 1.1, 5)); // Maximum zoom level
        break;
      case '-':
        setZoom((prevZoom) => Math.max(prevZoom / 1.1, 0.5)); // Minimum zoom level
        break;
      case 'a':
      case 'ArrowLeft':
        setPanX((prevPanX) => prevPanX + 1); // Move view left
        break;
      case 'd':
      case 'ArrowRight':
        setPanX((prevPanX) => prevPanX - 1); // Move view right
        break;
      case 'w':
      case 'ArrowUp':
        setPanY((prevPanY) => prevPanY + 1); // Move view up
        break;
      case 's':
      case 'ArrowDown':
        setPanY((prevPanY) => prevPanY - 1); // Move view down
        break;
      default:
        break;
    }
  };

  /*useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);*/

  useEffect(() => {
    /*simTime.onTimeUpdate((data) => {
      //console.log(`Main Sketch | Time 24-hour: ${data.time24}, Time 12-hour: ${data.time12}, Date: ${data.date}`);
      /8/setMinute(data.currentTimeOfDay);
    });*/

    // Initialize lots
    const initializeLots = () => {
      const lotEntities = lotPos.map((pos, index) => new LotEntity(index + 1, pos.name || `Lot ${index + 1}`, pos.x, pos.y, pos.size, "Commercial", pos.price, pos.fillColor, []));
      const resLotEntities = resLotPos.map((pos, index) => new LotEntity(index + 1 + lotEntities.length, pos.name || `Res ${index + 1}`, pos.x, pos.y, pos.size, "Residential", pos.price, pos.fillColor, []));
      setLots([...lotEntities, ...resLotEntities]);
    };
    initializeLots();
  }, [charImages]);

  useEffect(()=>{
    const initalizeCharacters = () => {
      for(var e in villagers){
        villagers[e].remove();
      }
      setVillagers([]);
      const characterTempList = Residents.map((v,i,a)=>{
        console.log("initChar: " + v.name);
        const residenceLot = lots.find(lot => lot.zone === 'Residential' && Math.random()>(0.2+(lot.occupied ? 0.3 : 0.0)));//lots[Math.floor(Math.random()*lots.length)];
        const employmentLot = lots.find(lot2 => lot2.zone !== 'Residential' && !lot2.occupied && Math.random()>0.6); // Find an unoccupied commercial lot
    
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
          employmentLot,  // Pass employment lot
          charImages[v.name] || "",
          v.img
        );
      });
      setVillagers(characterTempList);
    } 
    if(lots){
      initalizeCharacters();
      simTime.start();
    }
    //return (() =>{}) //simTime.dispose();
  }, [lots]);
// Dictionary to store images with character names as keys

  const preload = (p5)=>{
    let characterImages = {}; 
    setBgImage(p5.loadImage(IslandTemplate.Image.source));

    Residents.forEach(resident => {
      characterImages[resident.name] = p5.loadImage(`images/${resident.img}`);
    });

    setCharacterImages(characterImages);
  }

  const setup = (p5, canvasParentRef) => {
    // set init offset
    setOffset(p5.createVector(0, 0));

    // set mouse zoom
    window.addEventListener('wheel', (e) => {
      const s = 1 - e.deltaY / 1000;
      setZoom(prevScal => prevScal * s);
      const mouse = p5.createVector(p5.mouseX, p5.mouseY);
      setOffset(prevOffset => p5.createVector(prevOffset.x, prevOffset.y).sub(mouse).mult(s).add(mouse));
    });

    window.addEventListener('mouseup', (e) => {
      console.log("{x:"+p5.mouseX+", y:"+p5.mouseY+"}");
    });
    
    p5.createCanvas(800, 600).parent(canvasParentRef);
  };

  const draw = (p5) => {
    const transparency = '60';
    p5.background('#000'); 
    p5.translate(offset.x, offset.y);
    p5.scale(scal);
    if(simTime.currentTimeOfDay <= 400 || simTime.currentTimeOfDay >=1040 ){
      let lerpTimeOffset = simTime.currentTimeOfDay < 500 ? 0 : 1040;
      let lerpVal = (simTime.currentTimeOfDay-lerpTimeOffset)/400;
      if(simTime.currentTimeOfDay >= 1040){
        lerpVal = 1-lerpVal;
      }
      p5.tint(p5.lerp(100,255,lerpVal), 255)
    }
    p5.image(bgImage, 0, 0, sizeVector.x, sizeVector.y);
    p5.noTint();
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
        preload={preload}
        setup={setup}
        draw={draw}
        keyPressed={handleKeyDown}
      />
    </>
  );
}

export default IslandSketch;
