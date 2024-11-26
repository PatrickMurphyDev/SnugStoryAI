/* eslint-disable no-undef */
import PathingEntity from './PathingEntity';
import CharacterInfo from "../CharacterFeatures/CharacterInfo";
import CharacterAttributes from "../CharacterFeatures/CharacterAttributes";
import CharacterNeeds from "../CharacterFeatures/CharacterNeeds";
import CharacterTasks from "../CharacterFeatures/CharacterTasks";
import { FiniteStateMachine } from "../FiniteStateMachine";
import { stateDetails, states } from "../ConfigurationData/states";
import SimulationTime from "../../../utils/SimulationTime";
import CharacterInventory from '../CharacterFeatures/CharacterInventory';
import { ItemsEnum } from '../ConfigurationData/ItemsEnum';

const simTime = SimulationTime.getInstance({ currentTimeOfDay: 600 }); // start 10 am

class CharacterEntity extends PathingEntity {
  constructor(
    location,
    name,
    nameObj,
    age,
    gender,
    skills,
    bio,
    attributes,
    residenceLot = { location: { x: 0, y: 0 } },
    employmentLot = { location: { x: 0, y: 0 } },
    pImg = undefined,
    imgSrc = ""
  ) {
    super("character", Math.floor(Math.random() * 1000), { x: location.x, y: location.y }, { width: 32, height: 32 }, "map", 1, []);
    this.nameObj = nameObj || {first:"First",last:"Last"};
    this.setKey(this.nameObj.first+this.nameObj.last);
    this.initCharacterInfo(name, age, gender, bio, skills, attributes, residenceLot, employmentLot, pImg, imgSrc);
    this.setupTimeUpdateHandler();
  }

  // Initializes character attributes
  initCharacterInfo(name, age, gender, bio, skills, attributes, residenceLot, employmentLot, pImg, imgSrc) {
    this.info = new CharacterInfo(name, age, gender, bio);
    this.attributes = new CharacterAttributes(skills, attributes);
    let itemsKeys = Object.keys(ItemsEnum);
    this.inventory = new CharacterInventory(Math.floor(Math.random()*2000));
    this.inventory.addItem(ItemsEnum[itemsKeys[Math.floor(Math.random()*itemsKeys.length)]]);
    this.inventory.addItem(ItemsEnum[itemsKeys[Math.floor(Math.random()*itemsKeys.length)]]);
    this.inventory.addItem(ItemsEnum[itemsKeys[Math.floor(Math.random()*itemsKeys.length)]]);
    this.inventory.addItem(ItemsEnum[itemsKeys[Math.floor(Math.random()*itemsKeys.length)]]);
    this.inventory.addItem(ItemsEnum[itemsKeys[Math.floor(Math.random()*itemsKeys.length)]]);
    this.inventory.addItem(ItemsEnum[itemsKeys[Math.floor(Math.random()*itemsKeys.length)]]);
    this.inventory.addItem(ItemsEnum.Item8,50);

    this.needs = new CharacterNeeds();
    this.tasks = new CharacterTasks();
    this.dailyRoutine = new FiniteStateMachine(states.SLEEPING, name);
    this.residenceLot = residenceLot;
    this.employmentLot = employmentLot;

    this.profileImage = pImg;
    this.img = `/images/${imgSrc}`;
  }

  // Sets up the time update handler
  setupTimeUpdateHandler() {
    this.onTimeUpdateHandlerFn = (data) => {
      this.dailyRoutine.handleTimeUpdate(data.minElapsed, data.date);
      if (this.needsToMove()) {
        this.updateLocation(this.getTargetLot());
      }
    };
    simTime.onTimeUpdate(this.onTimeUpdateHandlerFn);
  }

  // Determines if character has reached destination
  hasReachedDestination() {
    return this.currentTargetIndex >= this.path.length && !this.currentTarget;
  }

  // Initiates movement to a goal
  moveTo(goal) {
    this.setPath(goal);
  }

   // Removes the time update handler
   remove() {
    simTime.clearTimeUpdate(this.onTimeUpdateHandlerFn);
  }

  setKey(k){
    this.key = k;
  }

  getKey(){
    return this.key;
  }

  getInventory(){
    return this.inventory;
  }

  // Retrieves the character's current state
  getCurrentState() {
    return this.dailyRoutine.currentState;
  }
  
  // Returns the color based on the character's state
  getCurrentColor() {
    return this.dailyRoutine.currentState === states.SLEEPING ? "#aa33aa" : "#ff0000";
  }

  // Updates the character's location
  updateLocation(newLocation) {
    this.location = { ...newLocation.location };
  }

  // Checks if character needs to move
  needsToMove() {
    return stateDetails[this.dailyRoutine.currentState.toUpperCase()].moveDetails.requiresMove;
  }

  // Gets target lot based on character's current state
  getTargetLot() {
    const targetLotMap = {
      [states.LEAVING_FOR_WORK]: this.employmentLot,
      [states.WALKING_TO_WORK]: this.employmentLot,
      [states.SLEEPING]: this.residenceLot,
      [states.GOING_HOME]: this.residenceLot,
    };
    return targetLotMap[this.dailyRoutine.currentState] || this.residenceLot;
  }

  // Updates character's state and needs
  update(p5, fsmState, x, y) {
    if (fsmState && fsmState.moveDetails.requiresMove && fsmState.moveDetails.isTraveling) {
      super.update(2); // TODO: Replace with dynamic simTime value
    }
    this.needs.updateNeeds();
    this.tasks.updateTasks(this);
  }

  // Draws character on canvas
  draw(p5, transparency, offset, scale) {
    this.drawCharacter(p5);
    this.drawName(p5);
  }

  // Draws the character's shape or image
  drawCharacter(p5) {
    const ps = p5.createVector(this.location.x, this.location.y);
    p5.fill(this.getCurrentColor());
    p5.ellipse(ps.x + 12, ps.y + 5, 25, 25);
    if (this.profileImage) {
      p5.image(this.profileImage, ps.x, ps.y, 35, 35);
    }
  }

  // Draws the character's name
  drawName(p5) {
    const ps = p5.createVector(this.location.x, this.location.y);
    p5.text(this.info.name, ps.x + 11, ps.y + 30);
  }
}

export default CharacterEntity;
