export class GameScene {
    name: string;
    lastUIActionFrame: number;
    UIActionCooldownFrames: number;
  
    constructor(name: string) {
      this.name = name; // Scene name
      this.lastUIActionFrame = -1;
      this.UIActionCooldownFrames = 15;
    }
  
    doUIAction(currFrame: number, action: () => void): void {
      if (this.lastUIActionFrame + this.UIActionCooldownFrames <= currFrame) {
        this.lastUIActionFrame = currFrame;
        action();
      }
    }
  
  /**
   * handleTargetClick
   * Handles the target click event.
   * @param {Object} p5 - The p5 instance used for drawing.
   * @param {number} x - The x position of the target.
   * @param {number} y - The y position of the target.
   * @param {number} targetWidth - The width of the target.
   * @param {number} targetHeight - The height of the target.
   * @param {Function} onClick - The function to execute on target click.
   */
    handleTargetClick(p5: any, x: number, y: number, targetWidth: number, targetHeight: number, onClick: () => void): void {
      if (
        p5.mouseIsPressed &&
        p5.mouseX >= x &&
        p5.mouseX <= x + targetWidth &&
        p5.mouseY >= y &&
        p5.mouseY <= y + targetHeight
      ) {
        this.doUIAction(p5.frameCount, onClick);
      }
    }
  
  /**
   * preload
   * Preloads any assets required by the scene.
   * @param {Object} p5 - The p5 instance used for loading assets.
   */
    preload(p5: any): void {}
  
  /**
   * setup
   * Sets up the scene environment.
   * @param {Object} p5 - The p5 instance used for setting up the scene.
   * @param {Object} canvasParentRef - The reference to the canvas parent container.
   */
    setup(p5: any, canvasParentRef: any): void {}
  
  /**
   * update
   * performs state logic updates each frame before drawing.
   * This function calls the update method for each entity in the scene.
   *  TODO: create subset update to only update pct of entities each frame
   *  TODO: de-prioritize update calls for non visable entities / off-screen entities
   * @param {Object} p5 - The p5 instance used for drawing the scene.
   */
    update(p5: any): void {}
  
  /**
   * draw
   * Renders the scene.
   * @param {Object} p5 - The p5 instance used for drawing the scene.
   */
    draw(p5: any): void {}
  
  /**
   * Handles any necessary cleanup or teardown for the scene.
   */
    teardown(): void {}
  }