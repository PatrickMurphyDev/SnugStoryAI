// GameCutScene.js
import { GameCutScene } from "./GameCutScene";

export class Intro_GameCutScene extends GameCutScene {
  constructor() {
    super([
      {
        imagePath: "images/cutscenes/intro/0.png",
        text: "*Man I wish I had family here to support me like everyone else, I thought I would at least have a group of close friends by now\n\nMaybe I should have spent less time studying and been more social.\n\nSure I am graduating almost a year early but am I the only one without an internship or plans afer graduation...*",
        textArray: [
          "*Man I wish I had family here to support me like everyone else, I thought I would at least have a group of close friends by now*",
          "*Maybe I should have spent less time studying and been more social.*",
          "*Sure I am graduating almost a year early but am I the only one without an internship or plans afer graduation...*",
        ],
        choices: [
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },
      {
        imagePath: "images/cutscenes/intro/1-2.png",
        text: `“Hey there miss, I’m so glad to finally find you.
        \nI hate to bother you on such a day but for nearly three months I've been searching for you.
        \nRegretfully I must inform you, <NAME> your biological father has been declared deceased atleast officially...”`,
        textArray: [
          "Hey there miss, I’m so glad to finally find you.",
          "I hate to bother you on such a day but for nearly three months I've been searching for you.",
          "Regretfully I must inform you, <NAME> your biological father has been declared deceased atleast officially...",
          "However, you were listed in his Last Will & Testament. His estate includes his home and much more is entailed.",
          "",
          "If you have any questions please come to the open house next week.",
        ],
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },
      {
        imagePath: "images/cutscenes/intro/1.png",
        text: `“However, you were listed in his Last Will & Testament. His estate includes his home and much more is entailed.
      \n\nIf you have any questions please come to the open house next week.”`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },
      {
        imagePath: "images/cutscenes/intro/2.png",
        text: `*I've been searching for acceptance my whole life in foster care.
        \nI've always resented my birth family for rejecting me,
        \nIn time I realised they couldn't be worse than foster families I was forced to stay with,
        \n\nFosters never cared about me, they just wanted the paycheck.*`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },
      {
        imagePath: "images/cutscenes/intro/3.png",
        text: `It quickly was clear...
        
        no one would want to adopt me, 
        my fosters reminded me often just how undesireable I am,

        I counted down the days until I could make my own decisions for myself at age 18.
        
        I had been wronged and lied to too many times, 
        
        and I was sick of being hurt.`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },{
        imagePath: "images/cutscenes/intro/4.png",
        text: `I turned 18 and things finally felt like they were going to go my way...

        I got a full ride Scholarship to a good University for my academics...`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },{
        imagePath: "images/cutscenes/intro/4-1.png",
        text: `I got a Kitty Boy named Toby...`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },{
        imagePath: "images/cutscenes/intro/5.png",
        text: `I worked hard to graduate early, 
        
        I thought this was the most important part of today... 
        
        but I don't know what to think now...`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },{
        imagePath: "images/cutscenes/intro/1-3.png",
        text: `“......... However, you were listed in his Last Will & Testament. His estate includes his home and much more is entailed.
      \n\nIf you have any questions please come to the open house next week.”`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },{
        imagePath: "images/cutscenes/intro/6.png",
        text: `“However, you were listed in his Last Will & Testament. His estate includes his home and much more is entailed.
      \n\nIf you have any questions please come to the open house next week.”`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      },{
        imagePath: "images/cutscenes/intro/7.png",
        text: `“However, you were listed in his Last Will & Testament. His estate includes his home and much more is entailed.
      \n\nIf you have any questions please come to the open house next week.”`,
        choices: [
          {
            text: "Previous",
            onClick: () => {
              this.previousSlide();
            },
          },
          {
            text: "Next",
            onClick: () => {
              this.nextSlide();
            },
          },
        ],
      }
    ]);
  }
}
