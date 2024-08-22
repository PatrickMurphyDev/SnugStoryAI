import FiniteStateMachine from '../FiniteStateMachine';
import CharacterEntity from '../Entities/CharacterEntity';
import SimulationTime from '../../utils/SimulationTime';
import { states, stateDetails } from '../states';

describe('Time-Based FSM and Character Updates', () => {
  let fsm, character, simulationTime, mockMap, mockGrid;

  beforeEach(() => {
    fsm = new FiniteStateMachine();
    simulationTime = SimulationTime.getInstance();
    mockMap = { mapWidth: 10, mapHeight: 10, tiles: Array(10).fill(Array(10).fill(0)) };
    mockGrid = Array(10).fill(Array(10).fill(1));
    character = new CharacterEntity('Test', 30, 'Female', [], 'A character', {}, { location: { x: 0, y: 0 } }, { location: { x: 9, y: 9 } }, null, 1, mockGrid);

    fsm.initializeState(states.SLEEPING);
  });

  test('Character should wake up and move after a time-based state change', () => {
    simulationTime.updateTime(stateDetails[states.SLEEPING].duration.default);
    fsm.handleTimeUpdate(stateDetails[states.SLEEPING].duration.default);
    character.moveTo({ x: 5, y: 5 });

    expect(fsm.currentState).toBe(states.WAKING);
    expect(character.currentFSMState).toBe(states.LEAVING);
  });

  test('FSM should transition states correctly over time', () => {
    simulationTime.updateTime(stateDetails[states.SLEEPING].duration.default);
    fsm.handleTimeUpdate(stateDetails[states.SLEEPING].duration.default);

    expect(fsm.currentState).toBe(states.WAKING);

    simulationTime.updateTime(stateDetails[states.WAKING].duration.default);
    fsm.handleTimeUpdate(stateDetails[states.WAKING].duration.default);

    expect(fsm.currentState).toBe(states.SHOWERING); // Next state should be SHOWERING
  });
});
