class Task {
    constructor(name, execute, taskType = "personal") {
      this.name = name;
      this.execute = execute;
      this.isComplete = false;
      this.isStarted = false;
      this.isPaused = false;
      this.workMinutesRemaining = 0;
      this.workHistory = [];
      this.taskType = taskType; // "personal" or "public"
    }
  
    start(character) {
      if (!this.isStarted) {
        this.isStarted = true;
        this.workHistory.push({
          character_id: character.name,
          startWorkDateTime: new Date(),
          stopWorkDateTime: null,
          workMinutes: 0,
          isTaskCompleted: false,
          pauseReason: null,
        });
      }
    }
  
    pause(pauseReason) {
      if (this.isStarted && !this.isPaused) {
        this.isPaused = true;
        const currentWork = this.workHistory[this.workHistory.length - 1];
        currentWork.stopWorkDateTime = new Date();
        currentWork.workMinutes = Math.ceil((currentWork.stopWorkDateTime - currentWork.startWorkDateTime) / 60000);
        currentWork.isTaskCompleted = this.isComplete;
        currentWork.pauseReason = pauseReason;
      }
    }
  
    resume(character) {
      if (this.isStarted && this.isPaused) {
        this.isPaused = false;
        this.workHistory.push({
          character_id: character.name,
          startWorkDateTime: new Date(),
          stopWorkDateTime: null,
          workMinutes: 0,
          isTaskCompleted: false,
          pauseReason: null,
        });
      }
    }
  
    complete() {
      this.isComplete = true;
      if (this.isStarted && !this.isPaused) {
        const currentWork = this.workHistory[this.workHistory.length - 1];
        currentWork.stopWorkDateTime = new Date();
        currentWork.workMinutes = Math.ceil((currentWork.stopWorkDateTime - currentWork.startWorkDateTime) / 60000);
        currentWork.isTaskCompleted = true;
      }
    }
  }

  export default Task;