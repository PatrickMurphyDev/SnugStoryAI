// GameCutScene.js
import { GameScene } from './GameScene';

export class GameCutScene extends GameScene {
  constructor(slides = []) {
    super('GameCutScene');
    this.slides = slides; // Array of slides, where each slide contains data like image path, text, etc.
    this.currentSlideIndex = 0; // Index of the currently displayed slide
    this.preloadedImages = []; // Array to hold preloaded images
  }

  /**
   * preload
   * Preloads images for each slide in the cutscene.
   * @param {Object} p5 - The p5 instance used for loading assets.
   */
  preload(p5) {
    this.preloadedImages = this.slides.map((slide) => {
      if (slide.imagePath) {
        return p5.loadImage(slide.imagePath); // Preload image for each slide
      }
      return null;
    });
  }

  /**
   * setup
   * Sets up the cutscene environment.
   * @param {Object} p5 - The p5 instance used for setting up the scene.
   * @param {Object} canvasParentRef - The reference to the canvas parent container.
   */
  setup(p5, canvasParentRef) {
    p5.createCanvas(800, 600).parent(canvasParentRef);
  }

  /**
   * draw
   * Renders the current slide of the cutscene.
   * @param {Object} p5 - The p5 instance used for drawing.
   */
  draw(p5) {
    p5.background(0); // Clear the screen with a black background
    if (this.preloadedImages[this.currentSlideIndex]) {
      p5.image(this.preloadedImages[this.currentSlideIndex], 0, 0, p5.width, p5.height); // Draw the current slide's image
    }
    // Additional rendering for text or other elements can be added here
  }

  /**
   * nextSlide
   * Advances to the next slide in the cutscene.
   */
  nextSlide() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
    }
  }

  /**
   * previousSlide
   * Goes back to the previous slide in the cutscene.
   */
  previousSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }

  /**
   * setSlide
   * Sets the current slide to the specified index.
   * @param {number} index - The index of the slide to set as the current slide.
   */
  setSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlideIndex = index;
    }
  }
}
