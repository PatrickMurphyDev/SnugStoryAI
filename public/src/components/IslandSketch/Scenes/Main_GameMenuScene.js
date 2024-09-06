import {GameMenuScene} from "./GameMenuScene.js";

export class Main_GameMenuScene extends GameMenuScene {
  constructor(parentSetSceneFN, newGameScene = 1, loadGameScene = 1, settingsScene = 1) {
    super("images/mainMenu.png", [
      {
        x: 123,
        y: 245,
        width: 210,
        height: 45,
        text: "New",
        onClick: () => {
          parentSetSceneFN(newGameScene);
        },
      },
      {
        x: 123,
        y: 305,
        width: 210,
        height: 45,
        text: "Load",
        onClick: () => {
          parentSetSceneFN(loadGameScene);
        },
      },
      {
        x: 552,
        y: 335,
        width: 210,
        height: 45,
        text: "Settings",
        onClick: () => {
          parentSetSceneFN(settingsScene);
        },
      },
    ]);
  }
}
