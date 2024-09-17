import {GameMenuScene} from "./GameMenuScene.js";

const btnSizes = { widthPct: 210/800.00,"heightPct": 45/600.0,}

export class Main_GameMenuScene extends GameMenuScene {
  constructor(parentSetSceneFN, newGameScene = 1, loadGameScene = 1, settingsScene = 1) {
    super("images/mainMenu.png", [
      {
        x: 123 * 1.25,
        y: 245 * 1.33,
        width: btnSizes.widthPct*1000,
        height: btnSizes.heightPct*800,
        text: "New",
        onClick: () => {
          parentSetSceneFN(newGameScene);
        },
      },
      {
        x: 123 * 1.25,
        y: 305 * 1.33,
        width: btnSizes.widthPct*1000,
        height: btnSizes.heightPct*800,
        text: "Load",
        onClick: () => {
          parentSetSceneFN(loadGameScene);
        },
      },
      {
        x: 552 * 1.25,
        y: 335 * 1.33,
        width: btnSizes.widthPct*1000,
        height: btnSizes.heightPct*800,
        text: "Settings",
        onClick: () => {
          parentSetSceneFN(settingsScene);
        },
      },
    ]);
  }
}
