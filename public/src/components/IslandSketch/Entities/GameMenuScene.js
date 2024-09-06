// GameMenuScene.js
import { GameScene } from './GameScene';

export class GameMenuScene extends GameScene {
  constructor(bgImagePath, buttons = []) {
    super('GameMenuScene');
    this.bgImagePath = bgImagePath; // Path to the background image
    this.bgImage = null; // Placeholder for the preloaded background image
    this.buttons = buttons; // Array of buttons with properties: { x, y, width, height, text, onClick, color }
    this.options = {drawButtonText: false, drawButtons: false}
  }

  /**
   * preload
   * Preloads the background image for the menu scene.
   * @param {Object} p5 - The p5 instance used for loading assets.
   */
  preload(p5) {
    this.bgImage = p5.loadImage("images/mainMenu.png");//this.bgImagePath); // Preload the background image
  }

  /**
   * setup
   * Sets up the menu scene environment.
   * @param {Object} p5 - The p5 instance used for setting up the scene.
   * @param {Object} canvasParentRef - The reference to the canvas parent container.
   */
  setup(p5, canvasParentRef) {
    p5.createCanvas(800, 600).parent(canvasParentRef);
  }

  /**
   * draw
   * Renders the menu scene.
   * @param {Object} p5 - The p5 instance used for drawing.
   */
  draw(p5) {
    // Draw the background image
    if (this.bgImage) {
      p5.image(this.bgImage, 0, 0, p5.width, p5.height);
    }

    // Draw buttons
    this.buttons.forEach((button) => {
      // Draw button background
      if(this.options.drawButtons){
        p5.fill('#007BFF'); // Use button color or default to blue // button.color || 
        p5.rect(button.x, button.y, button.width, button.height);
      }

      // Draw button text 
      if(this.options.drawButtonText){
        p5.fill(255); // Set text color to white
        p5.textSize(16);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(button.text, button.x + button.width / 2, button.y + button.height / 2);
      }
      // Handle button click
      if (
        p5.mouseIsPressed &&
        p5.mouseX >= button.x &&
        p5.mouseX <= button.x + button.width &&
        p5.mouseY >= button.y &&
        p5.mouseY <= button.y + button.height
      ) {
        console.log("clicked");
        button.onClick(); // Call the click handler for this button
      }
    });
  }
}
