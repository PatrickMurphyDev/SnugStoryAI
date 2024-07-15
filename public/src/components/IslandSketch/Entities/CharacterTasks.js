import Task from './Task';

class CharacterTasks {
  constructor() {
    this.tasks = [];
    this.knownTaskMap = { rest: (c) => c.rest(), eat: (c) => c.eat(), drink: (c) => c.drink() };
  }

  addTask(task) {
    this.tasks.push(task);
  }

  queueTask(task) {
    let tmp = this.tasks.shift();
    this.tasks.unshift(task);
    this.unshift(tmp);
  }

  interruptTask(task) {
    this.tasks[0].pause('New Task ' + task.name);
    this.tasks.unshift(task);
    task.start(this);
  }

  completeTask() {
    const task = this.tasks.shift();
    task.complete();
  }

  updateTasks(character) {
    if (this.tasks.length > 0) {
      const task = this.tasks[0];
      task.execute(character);
      if (task.isComplete) {
        this.completeTask();
      }
    } else {
      character.state = 'idle';
    }
  }
}

export default CharacterTasks;