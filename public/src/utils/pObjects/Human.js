class Human {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.energy = 100;
    this.hunger = 0;
    this.social = 0;
    this.tasks = [];
    this.partner = null;
    this.children = [];
  }

  // Update age and handle lifecycle changes
  update(frame) {
    if (frame % 60 === 0) { // Assuming 1 frame per second
      this.age++;
      this.hunger++;
      this.social--;
      this.energy--;

      if (this.hunger > 50) this.eat();
      if (this.energy < 30) this.rest();
      if (this.social < 20) this.socialize();
      
      // Check if villager should perform other tasks
      this.performTasks();

      // Age-related changes
      if (this.age > 18 && !this.partner) {
        this.findPartner();
      }
      if (this.partner && this.age > 20) {
        this.reproduce();
      }
    }
  }

  performTasks() {
    if (this.tasks.length > 0) {
      const currentTask = this.tasks.shift();
      switch (currentTask) {
        case 'gather food':
          this.gatherFood();
          break;
        case 'gather water':
          this.gatherWater();
          break;
        case 'gather wood':
          this.gatherWood();
          break;
        case 'build shelter':
          this.buildShelter();
          break;
        case 'build tools':
          this.buildTools();
          break;
        case 'build fire':
          this.buildFire();
          break;
        case 'rest':
          this.rest();
          break;
        case 'eat':
          this.eat();
          break;
        case 'drink':
          this.drink();
          break;
        case 'socialize':
          this.socialize();
          break;
        case 'date':
          this.date();
          break;
        case 'raise child':
          this.raiseChild();
          break;
        default:
          break;
      }
    }
  }

  // Gather tasks
  gatherFood() {
    console.log(`${this.name} is gathering food.`);
    this.energy -= 10;
  }

  gatherWater() {
    console.log(`${this.name} is gathering water.`);
    this.energy -= 5;
  }

  gatherWood() {
    console.log(`${this.name} is gathering wood.`);
    this.energy -= 15;
  }

  // Build tasks
  buildShelter() {
    console.log(`${this.name} is building a shelter.`);
    this.energy -= 20;
  }

  buildTools() {
    console.log(`${this.name} is building tools.`);
    this.energy -= 10;
  }

  buildFire() {
    console.log(`${this.name} is building a fire.`);
    this.energy -= 5;
  }

  // Rest task
  rest() {
    console.log(`${this.name} is resting.`);
    this.energy += 20;
  }

  // Eat/Drink tasks
  eat() {
    console.log(`${this.name} is eating.`);
    this.hunger = 0;
    this.energy += 10;
  }

  drink() {
    console.log(`${this.name} is drinking.`);
    this.hunger = 0;
    this.energy += 5;
  }

  // Socialize tasks
  socialize() {
    console.log(`${this.name} is socializing.`);
    this.social = 100;
  }

  date() {
    console.log(`${this.name} is dating.`);
    this.social += 20;
  }

  // Reproduce and raise child tasks
  reproduce() {
    if (Math.random() > 0.5) { // Simple reproduction chance
      console.log(`${this.name} and ${this.partner} are reproducing.`);
      this.children.push(new Human(`Child of ${this.name}`, 0, Math.random() > 0.5 ? 'male' : 'female'));
    }
  }

  raiseChild() {
    console.log(`${this.name} is raising a child.`);
    // Raising a child logic here
  }

  findPartner() {
    console.log(`${this.name} is looking for a partner.`);
    // Simple logic to find a partner
    // In a full simulation, this would check available villagers
    this.partner = "Partner"; // Placeholder logic
  }
}

export default Human;
