class CharacterNeeds {
  constructor() {
    this.basicNeeds = { energy: 100, hunger: 0 };
    this.stats = { hungerRate: 0.001, energyRate: 0.00005 };
  }

  getEnergy() {
    return this.basicNeeds.energy;
  }

  setEnergy(value) {
    this.basicNeeds.energy = Math.max(Math.min(value, 100), 0);
  }

  getHunger() {
    return this.basicNeeds.hunger;
  }

  setHunger(value) {
    this.basicNeeds.hunger = Math.max(Math.min(value, 100), 0);
  }

  updateNeeds() {
    this.setHunger(this.getHunger() + this.stats.hungerRate);
    this.setEnergy(this.getEnergy() - this.stats.energyRate);
  }
}

export default CharacterNeeds;