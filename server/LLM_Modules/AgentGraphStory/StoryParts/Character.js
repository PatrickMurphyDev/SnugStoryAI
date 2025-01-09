// Classes to define the Game Characters and allow for Structured Output

export class Character {
    /**
     * @param {string} role - Primary role of the character in the story
     * @param {string} name - Name of the character
     * @param {string} backstory - Backstory of the character focus, concerns, and motives
     */
    constructor(role, name, backstory) {
      this.role = role;
      this.name = name;
      this.backstory = backstory;
    }
  
    get persona() {
      return `Name: ${this.name}\nRole: ${this.role}\nBackstory: ${this.backstory}\n`;
    }
  }
  
  