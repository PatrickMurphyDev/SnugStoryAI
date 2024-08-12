// IStateTransitionStrategy.js
export default class IStateTransitionStrategy {
    transition(currentState, stateDetails) {
      throw new Error("This method should be implemented by a concrete strategy");
    }
  }
  