class Task {
    constructor(name, execute, mins = 60, taskType = "personal") {
      this.name = name;
      this.executeFN = execute;
      this.isComplete = false;
      this.isStarted = false;
      this.isPaused = false;
      this.workMinutesRemaining = mins;
      this.taskType = taskType; // "personal" or "public"
    }
  
    start(character) {
      this.isStarted = true;
    }
  
    pause() {
      if (this.isStarted && !this.isPaused) {
        this.isPaused = true;
      }
    }
  
    resume(character) {
      if (this.isStarted && this.isPaused) {
        this.isPaused = false;
      }
    }

    completePart(minsElapsed){
      this.workMinutesRemaining -= minsElapsed;
      if(this.workMinutesRemaining <= 0){
        this.workMinutesRemaining = 0;
        this.complete();
      }
    }

    complete() {
      if (this.isStarted && !this.isPaused && this.workMinutesRemaining === 0) {
        this.isComplete = true;
        this.executeFN();
      }
    }
  }

  export default Task;