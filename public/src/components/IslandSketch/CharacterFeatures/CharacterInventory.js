class CharacterInventory {
    constructor(items) {
      this.items = items || {};
      this.itemDetails = {};
      this._cashValue = 1300;
    }

    getCash(){
      return this._cashValue;
    }

    setCash(c){
      this._cashValue = c;
    }

    getItem(i){
      return this.items["Item"+i.id];
    }
  
    addItem(i) {
      console.log("add item " + i.id);
      if(this.items["Item"+i.id]){
        this.items["Item"+i.id] = this.items["Item"+i.id] + 1;
      }else{
        this.items["Item"+i.id] = 1;
        this.itemDetails["Item"+i.id] = i;
      }
    }

    removeItem(i){
      this.items["Item"+i.id] = this.items["Item"+i.id] - 1;
    }

    getItemCount(i){
      return this.items["Item"+i.id];
    }
    getItemsCount(){
      return Object.keys(this.items).length;
    }

    getItems(){
        return this.items;
    }

    getItemsArray(){
      let retArr = [];
      for(let j = 0; j < this.getItemsCount(); j++){
        retArr.push({data:this.itemDetails[(Object.keys(this.items))[j]], count: this.items[(Object.keys(this.items))[j]]});
      }
      return retArr;
    }
  }
  
  export default CharacterInventory;