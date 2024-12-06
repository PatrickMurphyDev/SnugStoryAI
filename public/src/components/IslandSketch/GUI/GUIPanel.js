
import SimulationTime from "../../../utils/SimulationTime";

const SIMTIME = SimulationTime.getInstance();
class GUIPanel {
  constructor(parent) {
    this.parent = parent;
  }

  draw(p5, el, socketController) {
    switch (el.PanelType) {
      case "Detail":
        this.renderDetailPanel(p5, el, socketController);
        break;
      case "PlayerProfile":
        this.renderPlayerProfilePanel(p5, el);
        break;
      default:
        this.renderDefaultPanel(p5, el);
    }
    this.renderPanelText(p5, el);
  }

  renderDetailPanel(p5, el, socketController) {
    socketController.getWorldActionLog().forEach((action, i) => {
      this.renderWorldActionLog(p5, el, action, i);
    });
    this.renderSimulationDate(p5, el);
    p5.text("$" + this.parent.getInventory().getCash(), el.x + 35, el.y + 55);
  }

  renderPlayerProfilePanel(p5, el) {
    const textLocation = { x: el.x, y: el.y + el.h * 0.75 };
    const textDimensions = { width: el.w, height: el.h * 0.25 };
    p5.image(this.parent.parent.PlayerProfileImage, el.x + el.w * 0.1, el.y + el.h * 0.05 - 18, el.w * 0.8, el.h * 0.8);
    p5.image(this.parent.parent.GameMapSceneUIBanner, el.x + 4, el.y + el.h - 40 - 10); // 40 is height of img // 10 is offset
    this.renderPanelText(p5, el, textLocation, textDimensions);
  }

  renderDefaultPanel(p5, el) {
    const padding = 25, spacing = 13, size = 32, cols = 12;
    if (this.parent.getDisplayMode() === 0) {
      this.renderInventoryView(p5, el, cols, padding, spacing, size);
    } else {
      this.parent.renderChatInputView(p5);
    }
  }

  renderWorldActionLog(p5, el, action, i) {
    p5.text(action.action, el.x + 25, el.y + 10 * i + 20);
  }

  renderSimulationDate(p5, el) {
    const { time, date } = this.parent.SimulationDateTime;
    const textY = el.y + el.h - 65;
    p5.text(time, el.x, textY - 13, el.w, 55);
    p5.text(date, el.x, textY - 30, el.w, 55);
    this.renderTimeButtons(p5, el);
  }

  renderTimeButtons(p5, el) {
    const buttonConfigs = [
      { text: "||", rate: 0 },
      { text: "1x", rate: 1 },
      { text: "2x", rate: 2 },
      { text: "3x", rate: 3 }
    ];

    buttonConfigs.forEach((config, index) => {
      this.parent.GUIButton.draw(
        p5,
        {
          text: config.text,
          fill: SIMTIME.rateOfTime === config.rate ? "red" : "#63aff3",
          onClickHandle: () => this.parent.setTimeMode(config.rate)
        },
        el.x + 60 + 5 * (index + 1) + 15 * index,
        el.y + 160,
        15,
        15
      );
    });
  }

  renderInventoryView(p5, el, cols, padding, spacing, size) {
    for (let i = 0; i < cols; i++) {
      this.renderInventorySlot(p5, el, i, padding, spacing, size);
    }
  }

  renderInventorySlot(p5, el, index, padding, spacing, size) {
    const x = el.x + padding + (size + spacing) * index;
    const y = el.y + padding + 15;
    p5.rect(x, y, size, size);
    p5.push();
    p5.fill(index === 0 ? "red" : "white");
    if (index < this.parent.getInventory().getItemsArray().length) {
      let dataTmp = this.parent.getInventory().getItemsArray()[index];
      this.renderInventoryIcon(p5, dataTmp, x, y);
    }
    p5.pop();
  }

  renderInventoryIcon(p5, data, x, y) {
    let icon = data.data.icon || [];
    p5.push();
    p5.textSize(24);
    p5.text((icon[0] || icon), x + 15, y + 15);
    p5.text((icon[1] || ""), x + 20, y + 24);
    p5.text(this.parent.getInventory().getItemCount(this.parent.ItemsEnum[data.data.key]), x + 32, y + 32);
    p5.pop();
  }

  renderPanelText(p5, el, location = { x: el.x, y: el.y }, dimensions = { width: el.w, height: el.h }) {
    p5.push();
    p5.fill(255);
    p5.textStyle("Bold");
    p5.textAlign("CENTER", "TOP");
    p5.textStyle("BOLD");
    p5.textSize(21);
    p5.text(el.text || "Panel", location.x + dimensions.width / 2, location.y + 18, dimensions.width, dimensions.height);
    p5.pop();
  }
}

export default GUIPanel;