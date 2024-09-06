// GameScene.js
export class GameScene {
    constructor(name) {
      this.name = name; // Scene name
      
      this.lastUIActionFrame = -1;
      this.UIActionCooldownFrames = 60;
    }

    doUIAction(currFrame, action){
      if(this.lastUIActionFrame + this.UIActionCooldownFrames <= currFrame){
        this.lastUIActionFrame = currFrame;
        action();
      }
    }
  
    /**
     * preload
     * Preloads any assets required by the scene.
     * @param {Object} p5 - The p5 instance used for loading assets.
     */
    preload(p5) {}
  
    /**
     * setup
     * Sets up the scene environment.
     * @param {Object} p5 - The p5 instance used for setting up the scene.
     * @param {Object} canvasParentRef - The reference to the canvas parent container.
     */
    setup(p5, canvasParentRef) {}
  
    /**
     * draw
     * Renders the scene.
     * @param {Object} p5 - The p5 instance used for drawing the scene.
     */
    draw(p5) {}
  
    /**
     * Handles any necessary cleanup or teardown for the scene.
     */
    teardown() {}
  }
  