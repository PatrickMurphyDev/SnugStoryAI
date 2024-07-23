class CharacterFeature {
    constructor() {
      this.properties = {};
      this.eventHandlers = {};
    }
  
    setProperty(key, value) {
      this.properties[key] = value;
      this.triggerEvent(key, value);
    }
  
    getProperty(key) {
      return this.properties[key];
    }
  
    on(event, handler) {
      if (!this.eventHandlers[event]) {
        this.eventHandlers[event] = [];
      }
      this.eventHandlers[event].push(handler);
    }
  
    triggerEvent(event, data) {
      if (this.eventHandlers[event]) {
        this.eventHandlers[event].forEach(handler => handler(data));
      }
    }
  
    update() {
      // This method should be overridden by subclasses
      throw new Error("Update method not implemented");
    }
  }
  
  export default CharacterFeature;
  