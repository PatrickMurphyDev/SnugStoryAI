import FiniteStateMachine from '../FiniteStateMachine';
import CharacterEntity from '../Entities/CharacterEntity';
import { states, stateDetails } from '../states';

describe('FSM and CharacterEntity Integration', () => {
  let fsm, character, mockMap, mockGrid;

  beforeEach(() => {
    fsm = new FiniteStateMachine();
    mockMap = { mapWidth: 10, mapHeight: 10, tiles: Array(10).fill(Array(10).fill(0)) };
    mockGrid = Array(10).fill(Array(10).fill(1));
    character = new CharacterEntity('Test', 30, 'Female', [], 'A character', {}, { location: { x: 0, y: 0 } }, { location: { x: 9, y: 9 } }, null, 1, mockGrid);

    fsm.initializeState(states.SLEEPING);
  });

  test('FSM should trigger character movement on state transition', () => {
    character.moveTo({ x: 5, y: 5 });
    fsm.handleTimeUpdate(stateDetails[states.SLEEPING].duration.default);

    expect(fsm.currentState).toBe(states.WAKING);
    expect(character.currentFSMState).toBe(states.LEAVING);
  });

  test('Character should transition states based on FSM updates', () => {
    fsm.handleTimeUpdate(stateDetails[states.SLEEPING].duration.default);
    character.moveTo({ x: 5, y: 5 });

    character.update();
    expect(character.currentFSMState).toBe(states.LEAVING);

    character.update();
    expect(character.currentFSMState).toBe(states.TRAVELING);
  });
});
