import EventEmitter from "events";

const states = {
  SLEEPING: "sleeping",
  WAKING: "waking",
  SHOWERING: "showering",
  CHANGING_CLOTHES: "changing_clothes",
  DRINKING_COFFEE: "drinking_coffee",
  EATING_BREAKFAST: "eating_breakfast",
  LEAVING_FOR_WORK: "leaving_for_work",
  WALKING_TO_WORK: "walking_to_work",
  ARRIVING_AT_WORK: "arriving_at_work",
  WORKING: "working",
  TAKING_BREAK: "taking_break",
  LUNCH: "lunch",
  GOING_HOME: "going_home",
  EATING_DINNER: "eating_dinner",
  WATCHING_TV: "watching_tv",
  GOING_TO_BED: "going_to_bed",
};

const stateDurations = {
  SLEEPING: 480,
  WAKING: 5,
  SHOWERING: 10,
  CHANGING_CLOTHES: 5,
  DRINKING_COFFEE: 10,
  EATING_BREAKFAST: 20,
  LEAVING_FOR_WORK: 5,
  WALKING_TO_WORK: 15,
  ARRIVING_AT_WORK: 5,
  WORKING: 120,
  TAKING_BREAK: 15,
  LUNCH: 30,
  GOING_HOME: 15,
  EATING_DINNER: 30,
  WATCHING_TV: 120,
  GOING_TO_BED: 10,
};

class FiniteStateMachine extends EventEmitter {
  constructor(initialState) {
    super();
    this.currState = initialState;
    this.work_breaks = 0;
    this.work_lunch = 0;
    this.elapsedTime = 0; // Track the elapsed time in the current state
  }

  handleTimeUpdate(minElapsed, newDatetime, prevDateTime) {
    this.elapsedTime += minElapsed;
    const durrKey = this.currState.toString().toUpperCase();

    const duration = stateDurations[durrKey];

    console.log(minElapsed, this.elapsedTime, duration);
    if (this.elapsedTime >= duration) {
      console.log("switch");
      this.autoTransition();
    }
  }

  // Function to subscribe to state updates
  onStateUpdate(listener) {
    this.on("stateUpdate", listener);
  }

  transitionToNextState(nextState) {
    console.log(`Transitioning from ${this.currState} to ${nextState}`);
    this.emit('stateUpdate', {"prevState":this.currState, "newState": nextState});
    this.currState = nextState;
    this.elapsedTime = 0; // Reset elapsed time
  }

  autoTransition() {
    switch (this.currState) {
      case states.SLEEPING:
        this.transitionToNextState(states.WAKING);
        break;
      case states.WAKING:
        this.transitionToNextState(states.SHOWERING);
        break;
      case states.SHOWERING:
        this.transitionToNextState(states.CHANGING_CLOTHES);
        break;
      case states.CHANGING_CLOTHES:
        this.transitionToNextState(states.DRINKING_COFFEE);
        break;
      case states.DRINKING_COFFEE:
        this.transitionToNextState(states.EATING_BREAKFAST);
        break;
      case states.EATING_BREAKFAST:
        this.transitionToNextState(states.LEAVING_FOR_WORK);
        break;
      case states.LEAVING_FOR_WORK:
        this.transitionToNextState(states.WALKING_TO_WORK);
        break;
      case states.WALKING_TO_WORK:
        this.transitionToNextState(states.ARRIVING_AT_WORK);
        break;
      case states.ARRIVING_AT_WORK:
        this.work_breaks = 0;
        this.transitionToNextState(states.WORKING);
        break;
      case states.WORKING:
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
        break;
      case states.TAKING_BREAK:
        this.transitionToNextState(states.WORKING);
        break;
      case states.LUNCH:
        this.work_lunch++;
        this.transitionToNextState(states.WORKING);
        break;
      case states.GOING_HOME:
        this.transitionToNextState(states.EATING_DINNER);
        break;
      case states.EATING_DINNER:
        this.transitionToNextState(states.WATCHING_TV);
        break;
      case states.WATCHING_TV:
        this.transitionToNextState(states.GOING_TO_BED);
        break;
      case states.GOING_TO_BED:
        this.transitionToNextState(states.SLEEPING);
        break;
      default:
        console.error(`Invalid state: ${this.currState}`);
        break;
    }
  }

  getState() {
    return this.currState;
  }
}

export { FiniteStateMachine, states, stateDurations };
