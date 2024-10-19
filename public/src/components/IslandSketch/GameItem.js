class GameItem {
    constructor(id, type, name, details) {
      this.id = id || -1;
      this.type = type || 1;
      this.name = name || "no name";
      this.details = details || {"props":{
        "weight":1
      }};
    }
    getID(){
        return this.id;
    }
    getType(){
        return this.type;
    }
    getName(){
        return this.name;
    }
    getDetails(){
        return this.details;
    }
    getProperties(){
        return this.getDetails()['props'];
    }
    getWeight(){
        return this.getProperties()['weight'];
    }
  }
  
  export default GameItem;