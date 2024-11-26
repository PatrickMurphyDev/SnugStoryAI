import CharacterDecorator from "../CharacterDecorator";
class GatherCharacter extends CharacterDecorator {
    constructor(c){
      super(c);
      super.learnNewTask("gather",[{'resource':"resourceString"}]);
    }

    getDescription() {
      return `Gatherer ${super.getDescription()}`;
    }
    

    // Specific task methods
    gather(resource) {
      super.createTask('gather', (character) => {
        console.log(`${character.name} is gathering ${resource}`);
      });
    }
  }

export default GatherCharacter;
