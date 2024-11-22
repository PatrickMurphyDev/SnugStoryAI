// GameMenuScene.js
import { GameScene } from './GameScene';
import  GUIButton from '../GUI/GUIButton';

export class GameMenuScene extends GameScene {
  constructor(bgImagePath, buttons = []) {
    super('GameMenuScene');
    this.GUIButton = new GUIButton(this);
    this.bgImagePath = bgImagePath; // Path to the background image
    this.bgImage = null; // Placeholder for the preloaded background image
    this.titleImage = null; // Placeholder for the preloaded background image
    this.buttons = buttons; // Array of buttons with properties: { x, y, width, height, text, onClick, color }
    this.options = {drawButtonText: true, drawButtons: true}
  }

  /**
   * preload
   * Preloads the background image for the menu scene.
   * @param {Object} p5 - The p5 instance used for loading assets.
   */
  preload(p5) {
    //this.bgImage = p5.loadImage("images/mainMenu.png");//this.bgImagePath); // Preload the background image
  }

  /**
   * setup
   * Sets up the menu scene environment.
   * @param {Object} p5 - The p5 instance used for setting up the scene.
   * @param {Object} canvasParentRef - The reference to the canvas parent container.
   */
  setup(p5, canvasParentRef) {
    //p5.createCanvas(1000, 800).parent(canvasParentRef);
  }

  /**
   * draw
   * Renders the menu scene.
   * @param {Object} p5 - The p5 instance used for drawing.
   */
  draw(p5) {
    // Draw the background image
    if (this.bgImage && this.titleImage) {
      p5.image(this.bgImage, 0, -((p5.width-p5.height)/2), p5.width, p5.width);
      p5.image(this.titleImage, (p5.width - 949)/2, 100);
    }else{
      this.bgImage = p5.loadImage(this.bgImagePath);
      this.titleImage = p5.loadImage("images/logo.png");
    }

    // Draw buttons
    this.buttons.forEach((button) => {
      // Draw button background
      this.GUIButton.draw(p5, {fill: '#007BFF', text: button.text, onClickHandle:button.onClick}, button.x, button.y, button.width, button.height)
    });
  }
}
