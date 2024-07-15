class CharacterAttributes {
    constructor(skills, attributes) {
      this.skills = skills || [];
      this.attributes = attributes || {};
      this.relationships = {
        friends: [],
        disliked: [],
        romantic: [],
        romanticHistory: [],
      };
    }
  
    addSkill(skill) {
      this.skills.push(skill);
    }
  
    addAttribute(key, value) {
      this.attributes[key] = value;
    }
  
    addRelationship(type, character) {
      if (this.relationships[type]) {
        this.relationships[type].push(character);
      }
    }
  }
  
  export default CharacterAttributes;