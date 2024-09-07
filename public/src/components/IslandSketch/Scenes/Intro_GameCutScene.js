// GameCutScene.js
import { GameCutScene } from "./GameCutScene";

const slideTypesEnum = {IMG:0,TXT:1,IMGTXT:2,SMLIMGTXT:3};
const createSlideObjFn = (that, slideType, txt, img, choices)=>{
  if(!parseInt(slideType)){
    // first param is text
    if(img){
      choices = img;
    }
    img = txt;
    txt = slideType;
    slideType = slideTypesEnum.IMGTXT;
  }

  choices = choices || [
    {
      text: "Previous",
      onClick: () => {
        that.previousSlide();
      },
    },
    {
      text: "Next",
      onClick: () => {
        that.nextSlide();
      },
    },
  ];

  return {
    slideType: slideType,
    text: txt,
    choices: choices,
  };
};

export class Intro_GameCutScene extends GameCutScene {
  constructor() {
    super([]);
    
    this.setSlides([createSlideObjFn(this,slideTypesEnum.TXT,'Penn State Graduation Ceremony\n June 2024',null,[
      {
        text: "Next",
        onClick: () => {
          this.nextSlide();
        },
      },
    ]),
      {
        imagePath: "images/cutscenes/intro/0.png",
        text: `*ughh* I wish I had family here to support me like everyone else does,
         my post-18 plan notebook assumed I would have a group of close friends by now
        \nMaybe I should have spent less time studying and been more social.
        \nSure I am graduating almost a year early but I feel like the only one without an internship or job lined up...*`,
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
      },{
        slideType: 1,
        text: `I.. Don't feel so good....

        *vision blurs*
        
        
        2016 - 15 Years Old`,
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
        my fosters reminded me often just how undesirable I am,

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

        I got a full ride Scholarship for my academics to Penn State University...`,
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
