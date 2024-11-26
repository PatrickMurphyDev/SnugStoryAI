class CharacterInventory {
    constructor(cashV, items, itemsDets) {
      this.items = items || {};
      this.itemDetails = itemsDets || {};
      this._cashValue = cashV || 1000;
    }

    getCash() {
      return this._cashValue;
    }

    setCash(c) {
      this._cashValue = Math.max(c, 0);
    }

    getItem(i) {
      if (!i || typeof i.key !== 'string') {
        console.error("Invalid item or item key");
        return null;
      }
      return this.items[i.key];
    }
  
    addItem(i, cnt) {
      if (!i || typeof i.key !== 'string') {
        console.error("Invalid item or item key");
        return;
      }
      cnt = cnt || 1;
      if (this.items[i.key]) {
        this.items[i.key] += cnt;
      } else {
        this.items[i.key] = cnt;
        this.itemDetails[i.key] = i;
      }
    }

    removeItem(i) {
      if (!i || typeof i.key !== 'string') {
        console.error("Invalid item or item key");
        return;
      }
      const newVal = this.items[i.key] - 1;
      if (newVal > 0) {
        this.items[i.key] = newVal;
      } else {
        this.deleteItem(i);
      }
    }

    deleteItem(i) {
      if (!i || typeof i.key !== 'string') {
        console.error("Invalid item or item key");
        return false;
      }
    
      if (!(i.key in this.items)) {
        console.warn(`Item ${i.key} not found in inventory`);
        return false;
      }
    
      delete this.items[i.key];
      delete this.itemDetails[i.key];
      
      return true;
    }

    getItemCount(i) {
      if (!i || typeof i.key !== 'string') {
        console.error("Invalid item or item key");
        return 0;
      }
      return this.items[i.key] || 0;
    }

    getItemsCount() {
      return Object.keys(this.items).length;
    }

    getItems() {
      return this.items;
    }

    getItemsList() {
      return Object.keys(this.items);
    }

    getItemsArray() {
      let retArr = [];
      const keys = Object.keys(this.items);
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        retArr.push({data: this.itemDetails[key], count: this.items[key]});
      }
      return retArr;
    }
  }
  
  export default CharacterInventory;