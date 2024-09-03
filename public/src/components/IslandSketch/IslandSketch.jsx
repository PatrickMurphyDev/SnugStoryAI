import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import SimulationTime from "../../utils/SimulationTime";
import SimulationTimeControls from "../SimulationTimeControls";
import { lotPos, resLotPos, Residents } from "../../utils/MapPositions";
import LotEntity from "./Entities/LotEntity";
import CharacterEntity from "./Entities/CharacterEntity";
import { IslandTemplate } from "../../utils/IslandTemplateTile";
import IslandTemplateJSON from "../../utils/IslandTemplateTiled.json";

const DefaultLotProperties = {
  size: { width: 32, height: 32 },
  zoneType: "Commercial",
  price: 100000,
  fillColor: "#000000",
};

/**
 * getLayerIndexByName
 * Returns the index of a layer in the IslandTemplateJSON by its name.
 * @param {string} name - The name of the layer to search for.
 * @returns {number} - The index of the layer if found, otherwise undefined.
 */
const getLayerIndexByName = (name) => {
  return IslandTemplateJSON.layers
    .map((v, i) => (v.name === name ? i : -1))
    .filter((i) => i !== -1)[0];
};

const simTime = SimulationTime.getInstance();
const buildingsLayerIndex = getLayerIndexByName("Buildings");
const residentsLayerIndex = getLayerIndexByName("Residents");

const IslandSketch = ({
  onCharacterSelect,
  onPropertySelect,
  charList,
  setCharList,
  sizeVector = { x: 800, y: 600 },
}) => {
  const [scal, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bgImage, setBgImage] = useState();
  const [charImages, setCharacterImages] = useState([]);
  const villagers = charList;
  const setVillagers = (nList) => setCharList(nList);
  const [lots, setLots] = useState([]);

  sizeVector = IslandTemplate.Image.size || sizeVector;

  useEffect(() => {
    initializeLots();
  }, [charImages]);

  useEffect(() => {
    initializeCharacters();
  }, [lots]);

  /**
   * convertPropertiesToLotDetails
   * Converts an array of properties into an object of lot details.
   * @param {Array} properties - Array of property objects.
   * @returns {Object} - An object containing lot details mapped from properties.
   */
  const convertPropertiesToLotDetails = (properties) => {
    let retDetails = {};
    properties.forEach((element) => {
      retDetails[element.name] = element.value;
    });
    return retDetails;
  };

  /**
   * initializeLots
   * Initializes the lots array with LotEntity objects based on data from IslandTemplateJSON.
   * No input parameters. Sets state directly.
   * @returns {void}
   */
  const initializeLots = () => {
    const lotEntities = IslandTemplateJSON.layers[
      buildingsLayerIndex
    ].objects.map(
      (pos, index) =>
        new LotEntity(
          index + 1,
          pos.name || `Lot ${index + 1}`,
          pos.x * 2,
          pos.y * 2,
          pos.properties
            ? convertPropertiesToLotDetails(pos.properties)
            : DefaultLotProperties,
          []
        )
    );
    setLots([...lotEntities]);
  };

  /**
   * initializeCharacters
   * Initializes the characters in the game by creating CharacterEntity instances.
   * Sets state directly and uses global variables such as villagers and charImages.
   * @returns {void}
   */
  const initializeCharacters = () => {
    for (var e in villagers) {
      villagers[e].remove();
    }
    setVillagers([]);
    const characterTempList = Residents.map((v) => createCharacterEntity(v));
    setVillagers(characterTempList);
    simTime.start();
  };

  /**
   * createCharacterEntity
   * Creates a CharacterEntity object with assigned residence and employment lots.
   * @param {Object} resident - Object containing character data (e.g., name, age, gender, etc.)
   * @returns {CharacterEntity} - A new CharacterEntity instance.
   */
  const createCharacterEntity = (resident) => {
    const residenceLot = findRandomResidentialLot();
    const employmentLot = findRandomCommercialLot();

    if (residenceLot) residenceLot.occupied = true;
    if (employmentLot) employmentLot.occupied = true;

    return new CharacterEntity(
      resident.name,
      resident.age,
      resident.gender,
      resident.skills,
      resident.bio,
      resident.attributes,
      residenceLot,
      employmentLot,
      charImages[resident.name] || "",
      resident.img
    );
  };

  /**
   * findRandomResidentialLot
   * Finds an unoccupied residential lot randomly from the lots array.
   * No input parameters. Uses global state 'lots'.
   * @returns {Object} - An unoccupied residential lot or undefined.
   */
  const findRandomResidentialLot = () => {
    return lots.find(
      (lot) =>
        lot.lotDetails.zoneType === "Residential" &&
        Math.random() > 0.2 + (lot.occupied ? 0.3 : 0.0)
    );
  };

  /**
   * findRandomCommercialLot
   * Finds an unoccupied commercial lot randomly from the lots array.
   * No input parameters. Uses global state 'lots'.
   * @returns {Object} - An unoccupied commercial lot or undefined.
   */
  const findRandomCommercialLot = () => {
    return lots.find(
      (lot) =>
        lot.lotDetails.zoneType !== "Residential" &&
        !lot.occupied &&
        Math.random() > 0.6
    );
  };

  /**
   * preload
   * Preloads images for the background and character sprites.
   * @param {Object} p5 - The p5 instance used for loading images.
   * @returns {void}
   */
  const preload = (p5) => {
    let characterImages = {};
    setBgImage(p5.loadImage(IslandTemplate.Image.source));
    Residents.forEach((resident) => {
      characterImages[resident.name] = p5.loadImage(`images/${resident.img}`);
    });
    setCharacterImages(characterImages);
  };

  /**
   * setup
   * Sets up the p5 canvas and initializes event listeners.
   * @param {Object} p5 - The p5 instance used for creating the canvas and setting initial states.
   * @param {Object} canvasParentRef - Reference to the parent container of the canvas.
   * @returns {void}
   */
  const setup = (p5, canvasParentRef) => {
    setOffset(p5.createVector(0, 0));
    initializeEventListeners(p5);
    p5.createCanvas(800, 600).parent(canvasParentRef);
  };

  /**
   * handleZoom
   * Handles the zoom interaction for the p5 canvas.
   * @param {Object} e - The event object from the wheel event.
   * @param {Object} p5 - The p5 instance used for adjusting the zoom.
   * @returns {void}
   */
  const handleZoom = (e, p5) => {
    const s = 1 - e.deltaY / 1000;
    setZoom((prevScal) => prevScal * s);
    const mouse = p5.createVector(p5.mouseX, p5.mouseY);
    setOffset((prevOffset) =>
      p5.createVector(prevOffset.x, prevOffset.y).sub(mouse).mult(s).add(mouse)
    );
  };

  /**
   * initializeEventListeners
   * Adds event listeners for mouse interactions (zoom and mouseup events).
   * @param {Object} p5 - The p5 instance used for event handling.
   * @returns {void}
   */
  const initializeEventListeners = (p5) => {
    window.addEventListener("wheel", (e) => handleZoom(e, p5));
    window.addEventListener("mouseup", (e) =>
      console.log(`{x:${p5.mouseX}, y:${p5.mouseY}}`)
    );
  };

  /**
   * draw
   * Draws the frame for the p5 sketch, including background and entities.
   * @param {Object} p5 - The p5 instance used for drawing.
   * @returns {void}
   */
  const draw = (p5) => {
    renderBackground(p5);
    renderEntities(p5);
    handleMouseInteraction(p5);
  };

  /**
   * renderBackground
   * Renders the background of the p5 canvas.
   * @param {Object} p5 - The p5 instance used for rendering.
   * @returns {void}
   */
  const renderBackground = (p5) => {
    p5.background("#20D6C7");
    p5.translate(offset.x, offset.y);
    p5.scale(scal);
    p5.image(bgImage, 0, 0, sizeVector.x, sizeVector.y);
    p5.noTint();
  };

  /**
   * renderEntities
   * Draws all the game entities (villagers and lots) on the p5 canvas.
   * @param {Object} p5 - The p5 instance used for drawing.
   * @returns {void}
   */
  const renderEntities = (p5) => {
    villagers.forEach((villager) => {
      villager.update();
      villager.draw(p5);
    });
    lots.forEach((lot) => {
      lot.update();
      if (isMouseOverLot(p5, lot)) {
        handleLotInteraction(p5, lot);
      }
      lot.draw(p5, offset);
    });
  };

  /**
   * isMouseOverLot
   * Checks if the mouse is currently over a lot.
   * @param {Object} p5 - The p5 instance used for calculating distances.
   * @param {Object} lot - The lot object to check.
   * @returns {boolean} - True if the mouse is over the lot, otherwise false.
   */
  const isMouseOverLot = (p5, lot) => {
    return (
      p5.dist(
        lot.location.x / 2,
        lot.location.y / 2,
        (p5.mouseX - offset.x) / scal,
        (p5.mouseY - offset.y) / scal
      ) <= 15.0
    );
  };

  /**
   * handleLotInteraction
   * Handles interaction logic when the mouse is over a lot.
   * @param {Object} p5 - The p5 instance used for event handling.
   * @param {Object} lot - The lot object being interacted with.
   * @returns {void}
   */
  const handleLotInteraction = (p5, lot) => {
    lot.setHover(true);
    if (p5.mouseIsPressed) {
      lot.setClick(true);
      onPropertySelect(lot);
    }
  };

  /**
   * handleMouseInteraction
   * Adjusts the canvas offset based on mouse dragging.
   * @param {Object} p5 - The p5 instance used for handling mouse input.
   * @returns {void}
   */
  const handleMouseInteraction = (p5) => {
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
      <Sketch preload={preload} setup={setup} draw={draw} />
    </>
  );
};

export default IslandSketch;
