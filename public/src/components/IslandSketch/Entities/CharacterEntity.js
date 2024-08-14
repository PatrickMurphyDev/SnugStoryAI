/* eslint-disable no-undef */
import Entity from './Entity';
import CharacterInfo from '../CharacterFeatures/CharacterInfo';
import Task from './Task';
import CharacterAttributes from '../CharacterFeatures/CharacterAttributes';
import CharacterNeeds from '../CharacterFeatures/CharacterNeeds';
import CharacterTasks from '../CharacterFeatures/CharacterTasks';
import { FiniteStateMachine } from '../FiniteStateMachine';
import { stateDetails } from "../states";
import { states } from "../states";
import SimulationTime from '../../../utils/SimulationTime';

const simTime = SimulationTime.getInstance();

class CharacterEntity extends Entity {
  constructor(name, age, gender, skills, bio, attributes, residenceLot = {location:{x:100,y:250}}, employmentLot = {location:{x:1,y:2}}) {
    super('character', Math.floor(Math.random() * 1000), { x: 0, y: 0 }, { width: 15, height: 15 });
    this.info = new CharacterInfo(name, age, gender, bio);
    this.attributes = new CharacterAttributes(skills, attributes);
    this.needs = new CharacterNeeds();
    this.tasks = new CharacterTasks();
    this.dailyRoutine = new FiniteStateMachine(states.SLEEPING);
    this.location = { x: residenceLot.location.x, y: residenceLot.location.y }; // Start at residence

    this.residenceLot = residenceLot;
    this.employmentLot = employmentLot;

    simTime.onTimeUpdate((data) => {
      this.dailyRoutine.handleTimeUpdate(data.minElapsed, data.date);

      if (this.needsToMove()) {
        const lot = this.determineNewLot();
        this.updateLocation(lot);
      }
    });

    this.dailyRoutine.onStateUpdate((data) => {
      console.log('char state update', data);
    });
  }

  update() {
    super.update();
    this.needs.updateNeeds();
    this.tasks.updateTasks(this);
  }

  draw(p5, transparency, offset, scale) {
    //super.draw(p5, transparency, offset, scale);
    const ps = p5.createVector(this.location.x / 2, this.location.y / 2);
    p5.fill('#ff0000');
    if(this.dailyRoutine.currentState === states.SLEEPING){
      p5.fill('#aa33aa')
    }
    p5.ellipse(ps.x+12,ps.y+5,15,15);
  }
  
  // Method to update location
  updateLocation(lot) {
    this.location.x = lot.location.x;
    this.location.y = lot.location.y;
  }

  // Determine if the character needs to move based on the current state
  needsToMove() {
    const currentState = this.dailyRoutine.currentState;
    return stateDetails[currentState.toUpperCase()].moveDetails.requiresMove;
  }

  // Determine the new lot based on the character's state
  determineNewLot() {
    const currentState = this.dailyRoutine.currentState;
    if (currentState === states.WORKING || currentState === states.LEAVING_FOR_WORK || currentState === states.WALKING_TO_WORK) {
      return this.employmentLot;
    } else if (currentState === states.SLEEPING || currentState === states.GOING_HOME) {
      return this.residenceLot;
    }
    // Add more conditions as needed
    return this.residenceLot; // Default to residence
  }

  // Example methods for rest, eat, and drink
  rest() {
    this.tasks.addTask(new Task('rest', (character) => {
      console.log(`${character.info.name} is resting`);
      character.needs.setEnergy(character.needs.getEnergy() + 20);
    }, 'personal'));
  }

  eat() {
    this.tasks.addTask(new Task('eat', (character) => {
      console.log(`${character.info.name} is eating`);
      character.needs.setHunger(character.needs.getHunger() - 30);
    }, 'personal'));
  }

  drink() {
    this.tasks.addTask(new Task('drink', (character) => {
      console.log(`${character.info.name} is drinking`);
      character.needs.setHunger(character.needs.getHunger() - 20);
    }, 'personal'));
  }
}

export default CharacterEntity;
