import IStateTransitionStrategy from './IStateTransitionStrategy';
import { stateDetails } from './stateDetails';

export default class LinearTransitionStrategy extends IStateTransitionStrategy {
  transition(currentState) {
    return stateDetails[currentState].nextState;
  }
}