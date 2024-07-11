/*
  // Example usage
  const alice = new CharacterEntity('Alice', 18, 'female');
  alice.gather('wood');
  alice.build('house');
  alice.rest();
  alice.eat();
  alice.drink();
  
  const bob = new CharacterEntity('Bob', 20, 'male');
  alice.socialize(bob);
  alice.reproduce(bob);
  
*/

import { resLotPos } from "../../../utils/MapPositions";
import Task from "./Task";
class CharacterEntity {
    constructor(name, age, gender, skills, bio, attributes) {
      this.name = name;
      this.age = age;
      this.birthdate = {year:1994,month:10, day:14};
      this.gender = gender;
      this.skills = skills; // Array of skill objects
      this.bio = bio;
      this.attributes = attributes; // Object with attribute keys and values
      this.relationships = {
        friends: [],
        disliked: [],
        romantic: [],
        romanticHistory: [],
      };
      
      this.state = 'idle';
      this.location = {lot:-1, coords: {x:0,y:0}};

      this.basicNeeds = {"energy": 100, "hunger": 0};
      this.skills = [];
      this.stats = {hungerRate: 0.001, energyRate: 0.00005};

      this.tasks = [];
      this.knownTaskMap = {"rest":(c)=>c.rest(), "eat":(c)=>c.eat(), "drink":(c)=>c.drink()};


      this.children = [];
      this.partner = null;
      this.residenceID = Math.floor(Math.random()*resLotPos.length);
    }
  
    // Task methods
    addTask(task) {
      this.tasks.push(task);
    }
    
    queueTask(task){
      let tmp = this.tasks.shift();
      this.tasks.unshift(task);
      this.unshift(tmp);
    }

    interruptTask(task){
      this.tasks[0].pause("New Task " + task.name);
      this.tasks.unshift(task);
      task.start(this)
    }
  
    completeTask() {
      const task = this.tasks.shift();
      task.complete();
    }
    
    getKnownTaskMap(){
      return this.knownTaskMap;
    }
    learnNewTask(title, params){
        this.newTasksLearned[title] = params;
    }

    // Main update loop
    update() {
      //this.age += 1 / 60 / 60 / 24 / 365; // Age increases every frame, roughly
  
      // Execute the first task in the list
      if (this.tasks.length > 0) {
        const task = this.tasks[0];
        task.execute(this);
        if (task.isComplete) {
          this.completeTask();
        }
      } else {
        this.state = 'idle';
      }
  
      // Update Basic needs
      this.setHunger(this.getHunger() + this.stats.hungerRate); // Hunger increases over time
      this.setEnergy(this.getEnergy() - this.stats.energyRate); // Energy decreases over time
    }

    draw(){
      //p5.fill("red");
      //p5.ellipse(pos.x / 2 + (index + 1) * 9, pos.y / 2 + 4, 7, 7);
    }

    getEnergy(){
      return this.basicNeeds.energy;
    }

    setEnergy(v){
      this.basicNeeds.energy = Math.max(Math.min(v,100),0);
      if (this.getEnergy() <= 0) {
        this.setState('rest');
        this.performBasicTask('rest', this.rest.bind(this));
      }
    }

    getHunger(){
      return this.basicNeeds.hunger;
    }

    setHunger(v){
      this.basicNeeds.hunger = Math.max(Math.min(v,100),0);
      if (this.basicNeeds.hunger >= 60) {
        this.setState('eat');
        this.performBasicTask('eat', this.eat.bind(this));
      }
    }

    getAge(){
      return this.age; // todo calc using this.birthdate;
    }
  
    // Higher-order function to perform basic tasks
    performBasicTask(taskName, taskFunc) {
      if (!this.tasks.some(task => task.name === taskName)) {
        taskFunc();
      }
    }
  
    // Generic method to create tasks
    createTask(taskName, action, taskType = 'public') {
      this.addTask(new Task(taskName, (character) => {
        action(character);
        character.energy -= 10;
      }, taskType));
    }
  
    rest() {
      this.createTask('rest', (character) => {
        console.log(`${character.name} is resting`);
        character.setEnergy(character.getEnergy() + 20);
      }, 'personal');
    }
  
    eat() {
      this.createTask('eat', (character) => {
        console.log(`${character.name} is eating`);
        character.hunger -= 30;
        if (character.hunger <= 0) character.hunger = 0;
      }, 'personal');
    }
  
    drink() {
      this.createTask('drink', (character) => {
        console.log(`${character.name} is drinking`);
        character.hunger -= 20;
        if (character.hunger <= 0) character.hunger = 0;
      }, 'personal');
    }
  }
  
  export default CharacterEntity;