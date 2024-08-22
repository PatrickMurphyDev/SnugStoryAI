import FiniteStateMachine from './FiniteStateMachine';
import { states, stateDetails } from '../states';

describe('FiniteStateMachine', () => {
  let fsm;

  beforeEach(() => {
    fsm = new FiniteStateMachine();
    fsm.initializeState(states.SLEEPING);
  });

  test('should transition from sleeping to waking', () => {
    fsm.handleTimeUpdate(stateDetails[states.SLEEPING].duration.default);
    expect(fsm.currentState).toBe(states.WAKING);
  });

  test('should calculate time correctly', () => {
    fsm.handleTimeUpdate(10); // Simulate 10 minutes passing
    expect(fsm.timeElapsed).toBe(10);
  });

  test('should not transition to an invalid state', () => {
    fsm.currentState = states.SLEEPING;
    fsm.autoTransition = jest.fn(() => states.GOING_TO_BED); // Invalid transition
    fsm.handleTimeUpdate(stateDetails[states.SLEEPING].duration.default);
    
    expect(fsm.currentState).toBe(states.WAKING); // Should ignore invalid transition
  });

  test('should reset timeElapsed on state change', () => {
    fsm.handleTimeUpdate(stateDetails[states.SLEEPING].duration.default);
    expect(fsm.timeElapsed).toBe(0); // timeElapsed should reset on state change
  });

  test('should handle state initialization correctly', () => {
    fsm.initializeState(states.WAKING);
    expect(fsm.currentState).toBe(states.WAKING);
    expect(fsm.timeElapsed).toBe(0);
  });
});
