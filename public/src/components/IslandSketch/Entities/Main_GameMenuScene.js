import GameMenuScene from "./GameMenuScene.js";

export class Main_GameMenuScene extends GameMenuScene {
  constructor() {
    super("./images/mainMenu.png", [
      {
        x: 123,
        y: 193,
        width: 185,
        height: 42,
        text: "new",
        onClick: () => {},
      },
      {
        x: 123,
        y: 240,
        width: 185,
        height: 42,
        text: "load",
        onClick: () => {},
      },
      {
        x: 123,
        y: 380,
        width: 185,
        height: 42,
        text: "settings",
        onClick: () => {},
      },
      {
        x: 350,
        y: 380,
        width: 85,
        height: 42,
        text: "quit",
        onClick: () => {},
      },
    ]);
  }
}
