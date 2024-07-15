class CharacterState {
    constructor() {
      this.state = 'idle';
      this.location = { lot: -1, coords: { x: 0, y: 0 } };
    }
  
    setState(state) {
      this.state = state;
    }
  
    setLocation(location) {
      this.location = location;
    }
  }
  
  export default CharacterState;