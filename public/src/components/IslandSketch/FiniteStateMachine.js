const states = {
    SLEEPING: 'sleeping',
    WAKING: 'waking',
    SHOWERING: 'showering',
    CHANGING_CLOTHES: 'changing_clothes',
    DRINKING_COFFEE: 'drinking_coffee',
    EATING_BREAKFAST: 'eating_breakfast',
    LEAVING_FOR_WORK: 'leaving_for_work',
    WALKING_TO_WORK: 'walking_to_work',
    ARRIVING_AT_WORK: 'arriving_at_work',
    WORKING: 'working',
    TAKING_BREAK: 'taking_break',
    LUNCH: 'lunch',
    GOING_HOME: 'going_home',
    EATING_DINNER: 'eating_dinner',
    WATCHING_TV: 'watching_tv',
    GOING_TO_BED: 'going_to_bed'
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
    WORKING: 240,
    TAKING_BREAK: 15,
    LUNCH: 30,
    GOING_HOME: 15,
    EATING_DINNER: 30,
    WATCHING_TV: 120,
    GOING_TO_BED: 10
};

class FiniteStateMachine {
    constructor(initialState) {
        this.state = initialState;
        this.elapsedTime = 0; // Track the elapsed time in the current state
    }

    onTimeUpdate(minElapsed,newDatetime, prevDateTime) {
        this.elapsedTime += minElapsed;
        const duration = stateDurations[this.state];

        if (this.elapsedTime >= duration) {
            this.autoTransition();
        }
    }

    transitionToNextState(nextState) {
        console.log(`Transitioning from ${this.state} to ${nextState}`);
        this.state = nextState;
        this.elapsedTime = 0; // Reset elapsed time
    }

    autoTransition() {
        switch (this.state) {
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
                this.transitionToNextState(states.WORKING);
                break;
            case states.WORKING:
                this.transitionToNextState(states.TAKING_BREAK); // Or lunch, based on a condition
                break;
            case states.TAKING_BREAK:
                this.transitionToNextState(states.WORKING);
                break;
            case states.LUNCH:
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
                console.error(`Invalid state: ${this.state}`);
                break;
        }
    }

    getState() {
        return this.state;
    }
}

export {FiniteStateMachine, states, stateDurations};