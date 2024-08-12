// FiniteStateMachine.js
import EventEmitter from "events";
import { stateDetails, states } from "./states";

export class FiniteStateMachine extends EventEmitter {
  constructor(initialState) {
    super();
    this.currentState = initialState;
    const currentStateDetails = stateDetails[this.currentState.toUpperCase()];
    this.currentStateDuration = (currentStateDetails.duration.min + Math.random()*(currentStateDetails.duration.max - currentStateDetails.duration.min)) || currentStateDetails.duration.default;
    this.timeElapsed = 0;
    this.work_breaks = 0;
    this.work_lunch = 0;
  }

  handleTimeUpdate(minElapsed, date) {
   
    this.timeElapsed += minElapsed;

    if (this.timeElapsed >= (this.currentStateDuration)) {
      console.log("switch");
      this.autoTransition();
      //this.transitionToNextState();
    }
  }

  transitionToNextState(nextState) {
    // Logic for transitioning to the next state
    console.log(`Transitioning from ${this.currentState} to the next state`);
    this.emit("stateUpdate", {
      prevState: this.currentState,
      newState: nextState,
    });
    this.currentState = nextState;
    this.timeElapsed = 0;
  }

  onStateUpdate(listener) {
    // Logic to handle state updates
    // This is a placeholder and should be implemented according to your requirements
    this.on("stateUpdate", listener);
    //callback(this.currentState);
  }

  autoTransition() {
    const currentStateDetails = stateDetails[this.currentState.toUpperCase()];
    const nextState = currentStateDetails.nextState;

    if (nextState) {
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
        this.transitionToNextState(nextState);
      }
    } else {
      console.error(`No next state defined for ${this.currentState}`);
    }
  }

  getState() {
    return this.currState;
  }
}
