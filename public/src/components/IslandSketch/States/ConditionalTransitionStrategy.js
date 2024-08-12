// ConditionalTransitionStrategy.js
import IStateTransitionStrategy from './IStateTransitionStrategy';
import { states, stateDetails } from './states';

export default class ConditionalTransitionStrategy extends IStateTransitionStrategy {
  transition(currentState, fsmContext) {
    if (currentState === states.WORKING) {
      if (fsmContext.work_breaks === 0) {
        fsmContext.work_breaks++;
        return states.TAKING_BREAK;
      } else if (fsmContext.work_lunch === 0) {
        fsmContext.work_lunch++;
        return states.LUNCH;
      } else if (fsmContext.work_breaks >= 2) {
        return states.GOING_HOME;
      }
    }
    return stateDetails[currentState].nextState;
  }
}
