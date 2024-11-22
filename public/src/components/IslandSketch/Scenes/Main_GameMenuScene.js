import {GameMenuScene} from "./GameMenuScene.js";

const btnSizes = { widthPct: 210/800.00,"heightPct": 45/600.0,}

export class Main_GameMenuScene extends GameMenuScene {
  constructor(parentSetSceneFN, newGameScene = 1, loadGameScene = 1, settingsScene = 1) {
    super("images/SnugIslandminEmpty.png", [
      {
        x: 123 * 1.66,
        y: 245 * 1.66,
        width: btnSizes.widthPct*1000,
        height: btnSizes.heightPct*800,
        text: "New Game",
        onClick: () => {
          parentSetSceneFN(newGameScene);
        },
      },
      {
        x: 123 * 1.66,
        y: 305 * 1.66,
        width: btnSizes.widthPct*1000,
        height: btnSizes.heightPct*800,
        text: "Load Game",
        onClick: () => {
          parentSetSceneFN(loadGameScene);
        },
      },
      {
        x: 552 * 1.66,
        y: 335 * 1.66,
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
