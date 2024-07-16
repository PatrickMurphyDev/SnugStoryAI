import Entity from './Entity';
import CharacterInfo from './CharacterInfo';
import Task from './Task';
import CharacterAttributes from './CharacterAttributes';
import CharacterNeeds from './CharacterNeeds';
import CharacterTasks from './CharacterTasks';
import CharacterState from './CharacterState';
import { FiniteStateMachine, states, stateDurations } from '../FiniteStateMachine';

class CharacterEntity extends Entity {
  constructor(name, age, gender, skills, bio, attributes) {
    super('character', Math.floor(Math.random() * 1000), { x: 0, y: 0 }, { width: 10, height: 10 });
    this.info = new CharacterInfo(name, age, gender, bio);
    this.attributes = new CharacterAttributes(skills, attributes);
    this.needs = new CharacterNeeds();
    this.tasks = new CharacterTasks();
    this.state = new CharacterState();
    this.dailyRoutine = new FiniteStateMachine(states.WAKING);
  }

  update() {
    super.update();
    this.needs.updateNeeds();
    this.tasks.updateTasks(this);
  }

  draw(p5, transparency, offset, scale) {
    super.draw(p5, transparency, offset, scale);
  }

  rest() {
    this.tasks.addTask(new Task('rest', (character) => {
      console.log(`${character.info.name} is resting`);
      character.needs.setEnergy(character.needs.getEnergy() + 20);
    }, 'personal'));
  }

  eat() {
    this.tasks.addTask(new Task('eat', (character) => {
      console.log(`${character.info.name} is eating`);
      character.needs.setHunger(character.needs.getHunger() - 30);
    }, 'personal'));
  }

  drink() {
    this.tasks.addTask(new Task('drink', (character) => {
      console.log(`${character.info.name} is drinking`);
      character.needs.setHunger(character.needs.getHunger() - 20);
    }, 'personal'));
  }
}

export default CharacterEntity;
