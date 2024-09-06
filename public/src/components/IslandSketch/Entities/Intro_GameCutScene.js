// GameCutScene.js
import { GameCutScene } from "./GameCutScene";

export class Intro_GameCutScene extends GameCutScene {
  constructor() {
    super([
      {
        imagePath: "images/cutscenes/intro/0gradparty.png",
        text: "*I can't believe I spent 3.5 years here and I still know almost none of these people...*",
        choices: [{ text: "Next", onClick:()=>{this.nextSlide()}}],
      },
      {
        imagePath: "images/cutscenes/intro/1lawyer.png",
        text: "Lawyer: Are you Ellie Dickson?",
        choices: [{ text: "Previous", onClick:()=>{this.previousSlide()}},{ text: "Next", onClick:()=>{this.nextSlide()}}],
      },
    ]);
  }
}
