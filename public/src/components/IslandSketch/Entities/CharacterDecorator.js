class CharacterDecorator {
    constructor(character) {
      this.character = character;
      this.newTasksLearned = {};
    }
  
    getDescription() {
      return this.character.getDescription();
    }

    getKnownTasksMap(){
        return {...this.character.getKnownTasksMap(), ...this.newTasksLearned};
    }

    learnNewTask(title, params){
        this.newTasksLearned[title] = params;
    }
  }

  export default CharacterDecorator;