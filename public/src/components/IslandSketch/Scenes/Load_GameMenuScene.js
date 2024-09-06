import {GameMenuScene} from "./GameMenuScene.js";

export class Load_GameMenuScene extends GameMenuScene {
  constructor(parentSetSceneFN, newGameScene = 1, loadGameScene = 1, backScene = 0) {
    super("images/Load_GameMenuScene.png", [
      {
        x: 123,
        y: 193,
        width: 185,
        height: 42,
        text: "New Game",
        onClick: () => {
          parentSetSceneFN(newGameScene);
        },
      },
      {
        x: 123,
        y: 240,
        width: 185,
        height: 42,
        text: "Load Game",
        onClick: () => {
          parentSetSceneFN(loadGameScene);
        },
      },
      {
        x: 118,
        y: 150,
        width: 105,
        height: 45,
        text: "< Back",
        onClick: () => {
          parentSetSceneFN(backScene);
        },
      },
    ]);
  }
}
