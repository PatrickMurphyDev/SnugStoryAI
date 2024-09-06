// GameCutScene.js
import { GameScene } from "./GameScene";

export class GameCutScene extends GameScene {
  constructor(slides) {
    super("GameCutScene");
    this.slides = slides; // Array of slides, where each slide contains data like image path, text, choices, etc.
    this.currentSlideIndex = 0; // Index of the currently displayed slide
    this.preloadedImages = {}; // Array to hold preloaded images
  }

  /**
   * preload
   * Preloads images for each slide in the cutscene.
   * @param {Object} p5 - The p5 instance used for loading assets.
   */
  preload(p5) {
    this.slides.forEach((slide,index) => {
        console.log(slide);
      if (slide.imagePath) {
        console.log('Load Image');
        this.preloadedImages[index] = p5.loadImage(slide.imagePath); // Preload image for each slide
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
   * drawSlideButtons
   * Renders the current slide text for the cutscene.
   * @param {Object} p5 - The p5 instance used for drawing.
   * @param {Array} choices - Array of choice objects.
   */
  drawSlideButtons(p5, choices) {
    // Draw the buttons for choices
    if (choices && choices.length > 0) {
      const buttonWidth = p5.width / choices.length; // Calculate width for each button
      const buttonHeight = 24; // Fixed height for buttons

      choices.forEach((choice, index) => {
        const x = index * buttonWidth;
        const y = p5.height - buttonHeight; // Position at the bottom of the canvas

        // Draw the button background
        p5.fill(choice.color || "#007BFF"); // Use button color or default to blue
        p5.rect(x, y, buttonWidth, buttonHeight);

        // Draw the button text
        p5.fill(255); // Set text color to white
        p5.textSize(18);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(choice.text, x + buttonWidth / 2, y + buttonHeight / 2);

        // Handle button click
        if (
          p5.mouseIsPressed &&
          p5.mouseX >= x &&
          p5.mouseX <= x + buttonWidth &&
          p5.mouseY >= y &&
          p5.mouseY <= y + buttonHeight
        ) {
          this.doUIAction(p5.frameCount, choice.onClick); // Call the click handler for this button
        }
      });
    }}
  
  /**
   * drawSlideText
   * Renders the current slide text for the cutscene.
   * @param {Object} p5 - The p5 instance used for drawing.
   * @param {String} slideText - Text to display.
   */
  drawSlideText(p5, slideText = "") {
    if (slideText) {
      p5.fill(255); // Set text color to white
      p5.textSize(20); // Set text size
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text(
        slideText,
        575,
        50,
        p5.width - 575 - 20,
        p5.height -100
      ); // Draw text below the image
    }
  }

  /**
   * draw
   * Renders the current slide of the cutscene.
   * @param {Object} p5 - The p5 instance used for drawing.
   */
  draw(p5) {
    p5.background(10); // Clear the screen with a black background    
    const currentSlide = this.slides[this.currentSlideIndex];

    // Draw the current slide's image
    if (this.preloadedImages[this.currentSlideIndex]) {

      // assume square src img
      const sizeImg = Math.min(p5.width - 100, p5.height - 100);
      p5.image(
        this.preloadedImages[this.currentSlideIndex],
        50,
        0,
        sizeImg,
        sizeImg
      );
    }else{
      this.preloadedImages[this.currentSlideIndex] = p5.loadImage(currentSlide['imagePath']);
    }

    // Draw the current slide's text
    this.drawSlideText(p5, currentSlide.text);
    // Draw the buttons for choices
    this.drawSlideButtons(p5, currentSlide.choices);
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
