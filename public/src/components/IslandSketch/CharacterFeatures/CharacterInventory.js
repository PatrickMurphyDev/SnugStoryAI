class CharacterInventory {
    constructor(items) {
      this.items = items || {};
      this._cashValue = 1300;
    }

    getCash(){
      return this._cashValue;
    }

    setCash(c){
      this._cashValue = c;
    }
  
    addItem(i) {
      if(this.items["Item"+i.id]){
        this.items["Item"+i.id] = this.items["Item"+i.id] + 1;
      }else{
        this.items["Item"+i.id] = 1;
      }
    }

    removeItem(i){
      this.items["Item"+i.id] = this.items["Item"+i.id] - 1;
    }

    getItemCount(i){
      return this.items["Item"+i.id];
    }

    getItems(){
        return this.items;
    }
  }
  
  export default CharacterInventory;