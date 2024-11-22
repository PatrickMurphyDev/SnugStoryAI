class CharacterInventory {
    constructor(cashV, items,itemsDets) {
      this.items = items || {};
      this.itemDetails = itemsDets || {};
      this._cashValue = cashV || 1000;
    }

    getCash(){
      return this._cashValue;
    }

    setCash(c){
      this._cashValue = Math.max(c,0);
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
      const newVal = this.items["Item"+i.id] - 1;
      if(newVal > 0){
        this.items["Item"+i.id] = newVal;
      }else{
        this.deleteItem(i);
      }
    }

    deleteItem(i){
      delete this.items["Item"+i.id];
    }

    getItemCount(i){
      if(i && i.id){
        return this.items["Item"+i.id];
      }else{
        return 0;
      }
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