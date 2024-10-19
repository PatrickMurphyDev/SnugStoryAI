class CharacterInventory {
    constructor(items) {
      this.items = items || [];
    }
  
    addItem(i) {
      this.items.push(i);
    }

    getItems(){
        return this.items;
    }
  }
  
  export default CharacterInventory;