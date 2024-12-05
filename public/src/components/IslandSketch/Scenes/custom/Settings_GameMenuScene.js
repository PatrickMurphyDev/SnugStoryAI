import {GameMenuScene} from "../GameMenuScene.js";

export class Settings_GameMenuScene extends GameMenuScene {
  constructor(parentSetSceneFN, settingsAfterSaveScene = 1, backScene = 1) {
    super("images/Settings_GameMenuScene.png", [
      {
        x: 123,
        y: 245,
        width: 210,
        height: 45,
        text: "Save",
        onClick: () => {
          parentSetSceneFN(settingsAfterSaveScene);
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
