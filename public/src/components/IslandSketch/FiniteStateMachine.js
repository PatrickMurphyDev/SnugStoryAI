// FiniteStateMachine.js
import EventEmitter from "events";
import { stateDetails, states } from "./states";

export class FiniteStateMachine extends EventEmitter {
  constructor(initialState, name = "noname") {
    super();
    this.currentState = initialState;
    this.currentStateDetails = stateDetails[this.currentState.toUpperCase()];
    this.nextState = this.currentStateDetails.nextState;
    this.currentStateDuration = 100;
    this.nameChar = name;
    this.updateStateDetails();
    this.timeElapsed = 0;
    this.work_breaks = 0;
    this.work_lunch = 0;
  }

  updateStateDetails(){
    this.currentStateDetails = stateDetails[this.currentState.toUpperCase()];
    this.currentStateDuration = (parseInt(this.currentStateDetails.duration.min) + Math.random() * parseInt(this.currentStateDetails.duration.max - this.currentStateDetails.duration.min)) || this.currentStateDetails.duration.default;

    //console.log(this.nameChar + " " + this.currentStateDuration);
  }

  handleTimeUpdate(minElapsed, date) {
    this.timeElapsed += minElapsed;
    if (this.timeElapsed >= (this.currentStateDuration)) {
      this.autoTransition();
      //this.transitionToNextState();
    }
  }

  transitionToNextState(nextState) {
    // Logic for transitioning to the next state
    this.emit("stateUpdate", {
      prevState: this.currentState,
      newState: nextState,
    });
    this.currentState = nextState;
    this.timeElapsed = 0;
    this.updateStateDetails();
  }

  addStateUpdateListener(listener) {
    // Logic to handle state updates
    //console.log('call onStateUpdate');
    this.on("stateUpdate", listener);
  }

  autoTransition() {
    this.currentStateDetails = stateDetails[this.currentState.toUpperCase()];
    this.nextState = this.currentStateDetails.nextState;

    if (this.nextState) {
      if (this.currentState === states.WORKING) {
        if (
          this.work_breaks === 0 ||
          (this.work_lunch > 0 && this.work_breaks === 1)
        ) {
          // if havent taken any breaks, or alraeady taken lunch but not a second break: Take Break
          this.work_breaks++;
          this.transitionToNextState(states.TAKING_BREAK); // Or lunch, based on a condition
        } else if (this.work_lunch === 0 && this.work_breaks === 1) {
          this.work_lunch++;
          this.transitionToNextState(states.LUNCH);
        } else if (this.work_breaks >= 2) {
          this.transitionToNextState(states.GOING_HOME);
        }
      } else if (this.currentState === states.ARRIVING_AT_WORK) {
        this.work_breaks = 0;
        this.work_lunch = 0;
        this.transitionToNextState(states.WORKING);
      } else if (this.currentState === states.LUNCH) {
        this.work_lunch++;
        this.transitionToNextState(states.WORKING);
      } else {
        this.transitionToNextState(this.nextState);
      }
    } else {
      console.error(`No next state defined for ${this.currentState}`);
    }
  }

  getState() {
    return this.currState;
  }
}
