import {GameMenuScene} from "../GameMenuScene.js";

// TODO: make btnSizes a global constant for easy modification
const btnSizes = { widthPct: 210/800.00,"heightPct": 45/600.0,}

export class Load_GameMenuScene extends GameMenuScene {
  constructor(parentSetSceneFN, newGameScene = 1, loadGameScene = 1, backScene = 0) {
    super("images/Load_GameMenuScene.png", [
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
            console.log("LOAD: Load Game clicked");
            parentSetSceneFN(loadGameScene, 'save1');
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
