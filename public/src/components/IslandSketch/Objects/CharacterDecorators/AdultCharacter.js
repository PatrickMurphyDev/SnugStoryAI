import CharacterDecorator from "../CharacterDecorator";
import CharacterEntity from "../../Entities/CharacterEntity";
class AdultCharacter extends CharacterDecorator {
    getDescription() {
      return `Adult ${super.getDescription()}`;
    }
  
    socialize(character) {
      super.createTask('socialize', (self) => {
        console.log(`${self.name} is socializing with ${character.name}`);
      });
    }
  
    reproduce(partner) {
      super.createTask('reproduce', (self) => {
        console.log(`${self.name} is reproducing with ${partner.name}`);
        const child = new CharacterEntity(`Child of ${self.name} and ${partner.name}`, 0, 'unknown');
        self.children.push(child);
        partner.children.push(child);
      }, 'personal');
    }
  }

export default AdultCharacter;