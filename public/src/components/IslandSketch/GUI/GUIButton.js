class GUIButton {
  constructor(parent) {
      this.parent = parent;
  }
  draw(p5, action, x, y, w, h) {
    p5.push();
    p5.fill(action.fill || 65);
    p5.rect(x, y, w, h);
    p5.fill(225);
    p5.text(action.text, x, y, w, h);
    this.parent.handleTargetClick(p5, x, y, w, h, action.onClickHandle);
    p5.pop();
  }
}

export default GUIButton;
