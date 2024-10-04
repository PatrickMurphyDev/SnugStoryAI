/* eslint-disable no-undef */
import PathingEntity from './PathingEntity';
import CharacterInfo from "../CharacterFeatures/CharacterInfo";
import CharacterAttributes from "../CharacterFeatures/CharacterAttributes";
import CharacterNeeds from "../CharacterFeatures/CharacterNeeds";
import CharacterTasks from "../CharacterFeatures/CharacterTasks";
import { FiniteStateMachine } from "../FiniteStateMachine";
import { stateDetails } from "../states";
import { states } from "../states";
import SimulationTime from "../../../utils/SimulationTime";


const simTime = SimulationTime.getInstance();

class CharacterEntity extends PathingEntity {
  constructor(
    location,
    name,
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
    super(
      "character", // entity
      Math.floor(Math.random() * 1000), // ID
      {x: location.x, y: location.y}, // TODO look into *2
      { width: 32, height: 32 }
    );
    this.info = new CharacterInfo(name, age, gender, bio);
    this.attributes = new CharacterAttributes(skills, attributes);
    this.needs = new CharacterNeeds();
    this.tasks = new CharacterTasks();
    this.dailyRoutine = new FiniteStateMachine(states.SLEEPING, name);
    this.residenceLot = residenceLot;
    this.employmentLot = employmentLot;
    this.profileImage = pImg;
    this.img = "/images/"+imgSrc;

    
    this.onTimeUpdateHandlerFn = (data) => {
      this.dailyRoutine.handleTimeUpdate(data.minElapsed, data.date);

      if (this.needsToMove()) {
        const lot = this.determineNewLot();
        this.updateLocation(lot);
      }
    };

    simTime.onTimeUpdate(this.onTimeUpdateHandlerFn);

    this.dailyRoutine.addStateUpdateListener((data) => {     
      console.log(`${this.info.name} Transitioning from STATE|${data.prevState} to STATE|${data.newState}`);
    });
  }
  hasReachedDestination() {
    return this.currentTargetIndex >= this.path.length && !this.currentTarget;
  }
  moveTo(goal) {
    this.setPath(goal);
  }

  getCurrentState(){
    return this.dailyRoutine.currentState;
  }

  remove(){
    simTime.clearTimeUpdate(this.onTimeUpdateHandlerFn);
  }
  update(p5,fsmState,x,y,) {
    if (fsmState && fsmState.moveDetails.requiresMove && fsmState.moveDetails.isTraveling) {
      super.update(2); // TODO: FIX PLACE HOLDER MINUTES should be set by simTime not 2
    }
    this.needs.updateNeeds();
    this.tasks.updateTasks(this);
  }

  draw(p5, transparency, offset, scale) {
    //super.draw(p5, transparency, offset, scale);
    const ps = p5.createVector(this.location.x, this.location.y);
    
      // Fallback if image not found
      p5.fill("#ff0000");
    if (this.dailyRoutine.currentState === states.SLEEPING) {
      p5.fill("#aa33aa");
    }
    //p5.image(this.profileImage, ps.x + 12, ps.y + 5)
    p5.ellipse(ps.x + 12, ps.y + 5, 25, 25);
    if (this.profileImage) {
      p5.image(this.profileImage, ps.x, ps.y, 35,35); // Draw the character's image
    }
   p5.text(this.info.name,ps.x+11,ps.y+30)
  }

  // Method to update location
  updateLocation(lot) {
    //this.setPath({x:Math.floor(lot.location.x/32), y:Math.floor(lot.location.y/32)});
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
    if (
      currentState === states.LEAVING_FOR_WORK ||
      currentState === states.WALKING_TO_WORK
    ) {
      return this.employmentLot;
    } else if (
      currentState === states.SLEEPING ||
      currentState === states.GOING_HOME
    ) {
      return this.residenceLot;
    }
    // Add more conditions as needed
    return this.residenceLot; // Default to residence
  }
}

export default CharacterEntity;
