// GameCutScene.js
import { GameScene } from "./GameScene";

export class GameCutScene extends GameScene {
  constructor(slides) {
    super("GameCutScene");
    this.slides = slides; // Array of slides, where each slide contains data like image path, text, choices, etc.
    this.currentSlideIndex = 0; // Index of the currently displayed slide
    this.preloadedImages = {}; // Array to hold preloaded images
    this.currentTypeTextIndex = 0;
    this.currentSlideTextStyle = 0;

    this.choicesOptions = { margin: 5 };

    this.typeWriterSpeed = { base: 0.25, randomFactor: 0.5 };
  }

  /**
   * preload
   * Preloads images for each slide in the cutscene.
   * @param {Object} p5 - The p5 instance used for loading assets.
   */
  preload(p5) {
    this.slides.forEach((slide, index) => {
      console.log(slide);
      if (slide.imagePath) {
        console.log("Load Image");
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

  updateTypeWriter(maxVal){
    const randPart = Math.random() * this.typeWriterSpeed.randomFactor;
    const newIndex = this.typeWriterSpeed.base + randPart;
    this.currentTypeTextIndex = Math.min(maxVal, newIndex+this.currentTypeTextIndex);
  }

  /**
 * drawSlideButtons
 * Renders the current slide text for the cutscene.
 * @param {Object} p5 - The p5 instance used for drawing.
 * @param {Array} choices - Array of choice objects.
 * @param {Object} slide - The current slide object.
 */
drawSlideButtons(p5, choices, slide) {
  if (!choices || choices.length === 0) return; // No choices to draw

  const buttonWidth = this.calculateButtonWidth(p5, choices.length);
  const buttonHeight = 24; // Fixed height for buttons

  choices.forEach((choice, index) => {
    const { x, y } = this.calculateButtonPosition(p5, index, buttonWidth);
    const colorBtn = choice.color || "#007BFF";

    this.drawButtonBackground(p5, x, y, buttonWidth, buttonHeight, colorBtn, choice, slide);
    this.drawButtonText(p5, x, y, buttonWidth, buttonHeight, choice.text);
    this.handleButtonClick(p5, x, y, buttonWidth, buttonHeight, choice.onClick);
  });
}

/**
 * calculateButtonWidth
 * Calculates the width for each button based on the canvas size and margin.
 * @param {Object} p5 - The p5 instance used for drawing.
 * @param {number} numChoices - The number of choice buttons.
 * @returns {number} The calculated button width.
 */
calculateButtonWidth(p5, numChoices) {
  return (p5.width - numChoices * (this.choicesOptions.margin * 2)) / numChoices;
}

/**
 * calculateButtonPosition
 * Calculates the x and y position for each button.
 * @param {Object} p5 - The p5 instance used for drawing.
 * @param {number} index - The index of the current button.
 * @param {number} buttonWidth - The width of the button.
 * @returns {Object} An object containing x and y positions.
 */
calculateButtonPosition(p5, index, buttonWidth) {
  const x = this.choicesOptions.margin + index * (buttonWidth + this.choicesOptions.margin * 2);
  const y = p5.height - 24 - this.choicesOptions.margin; // Fixed height for buttons
  return { x, y };
}

/**
 * drawButtonBackground
 * Draws the button background with the appropriate color and effects.
 * @param {Object} p5 - The p5 instance used for drawing.
 * @param {number} x - The x position of the button.
 * @param {number} y - The y position of the button.
 * @param {number} buttonWidth - The width of the button.
 * @param {number} buttonHeight - The height of the button.
 * @param {string} colorBtn - The button color.
 * @param {Object} choice - The choice object.
 * @param {Object} slide - The current slide object.
 */
drawButtonBackground(p5, x, y, buttonWidth, buttonHeight, colorBtn, choice, slide) {
  p5.fill(colorBtn);
  p5.rect(x, y, buttonWidth, buttonHeight);
  
  if (choice.text === "Next") {
    p5.noStroke();
    p5.fill(p5.lerpColor(p5.color("#007BFF"), p5.color("#ffffff"), 0.25));
    p5.rect(x, y, buttonWidth * ((this.currentTypeTextIndex + 1) / slide.text.length), buttonHeight);
    p5.fill(colorBtn);
  }
}

/**
 * drawButtonText
 * Draws the button text at the center of the button.
 * @param {Object} p5 - The p5 instance used for drawing.
 * @param {number} x - The x position of the button.
 * @param {number} y - The y position of the button.
 * @param {number} buttonWidth - The width of the button.
 * @param {number} buttonHeight - The height of the button.
 * @param {string} text - The text to display on the button.
 */
drawButtonText(p5, x, y, buttonWidth, buttonHeight, text) {
  p5.fill(255);
  p5.textSize(18);
  p5.textAlign(p5.CENTER, p5.CENTER);
  p5.text(text, x + buttonWidth / 2, y + buttonHeight / 2);
}

/**
 * handleButtonClick
 * Handles the button click event.
 * @param {Object} p5 - The p5 instance used for drawing.
 * @param {number} x - The x position of the button.
 * @param {number} y - The y position of the button.
 * @param {number} buttonWidth - The width of the button.
 * @param {number} buttonHeight - The height of the button.
 * @param {Function} onClick - The function to execute on button click.
 */
handleButtonClick(p5, x, y, buttonWidth, buttonHeight, onClick) {
  if (
    p5.mouseIsPressed &&
    p5.mouseX >= x &&
    p5.mouseX <= x + buttonWidth &&
    p5.mouseY >= y &&
    p5.mouseY <= y + buttonHeight
  ) {
    this.doUIAction(p5.frameCount, onClick);
  }
}

  /**
   * drawSlideText
   * Renders the current slide text for the cutscene.
   * @param {Object} p5 - The p5 instance used for drawing.
   * @param {String} slideText - Text to display.
   */
  drawSlideText(p5, slideText = "") {
    if (slideText) {
      let currentString = slideText.substring(0, this.currentTypeTextIndex);
      p5.fill(255); // Set text color to white
      if (this.slides[this.currentSlideIndex].slideType === 1) {
        p5.textSize(20); // Set text size
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(currentString, 50, 50, p5.width - 50, p5.height - 50); // Draw text below the image
      } else {
        p5.textSize(20); // Set text size
        p5.textAlign(p5.LEFT, p5.TOP);
        p5.text(currentString, 575, 25, p5.width - 575 - 20, p5.height - 75); // Draw text below the image
      }
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
    const sizeImg = Math.min(p5.width - 100, p5.height - 100);

    // Draw the current slide's image
    if (this.preloadedImages[this.currentSlideIndex]) {
      // assume square src img
      p5.image(
        this.preloadedImages[this.currentSlideIndex],
        50,
        35,
        sizeImg,
        sizeImg
      );
    } else {
      this.preloadedImages[this.currentSlideIndex] = p5.loadImage(
        currentSlide["imagePath"]
      );
    }

    // Draw the current slide's text
    this.drawSlideText(p5, currentSlide.text);
    // Draw the buttons for choices
    this.drawSlideButtons(p5, currentSlide.choices, currentSlide);
    
    this.updateTypeWriter(currentSlide.text.length);
  }

  /**
   * nextSlide
   * Advances to the next slide in the cutscene.
   */
  nextSlide() {
    if (
      this.currentTypeTextIndex <
      this.slides[this.currentSlideIndex].text.length
    ) {
      this.currentTypeTextIndex =
        this.slides[this.currentSlideIndex].text.length;
    } else if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentTypeTextIndex = 0;
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
      this.currentTypeTextIndex =
        this.slides[this.currentSlideIndex].text.length;
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

  /**
   * setSlides
   * Sets the slide array
   */
  setSlides(s) {
    this.slides = s;
  }
}
