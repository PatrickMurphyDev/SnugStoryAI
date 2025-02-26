import SimulationTime from "../../../utils/SimulationTime";

const SIMTIME = SimulationTime.getInstance({ currentTimeOfDay: 600 });

class GUIPanel {
  constructor(parent) {
    this.parent = parent;
    this.panelTitle = false;
  }

  setPanelTitle(title) {
    this.panelTitle = title;
    }

    getPanelTitle() {
        return this.panelTitle;    
    }
  /**
   * Main draw function for the GUI Panel
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   * @param {Object} socketController - Socket controller instance
   */
  draw(p5, el, socketController) {
    this.renderPanel(p5, el, socketController);
    if(el.PanelType !== "PlayerProfile") this.renderPanelText(p5, el);
  }

  /**
   * Render the appropriate panel based on the PanelType
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   * @param {Object} socketController - Socket controller instance
   */
  renderPanel(p5, el, socketController) {
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
  }
  
  /**
   * Render the panel text
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   * @param {Object} location - Text location
   * @param {Object} dimensions - Text dimensions
   */
  renderPanelText(p5, el, location = { x: el.x, y: el.y }, dimensions = { width: el.w, height: el.h }) {
    p5.push();
    p5.fill(255);
    p5.textStyle("Bold");
    p5.textAlign("CENTER", "TOP");
    p5.textSize(21);
    p5.text(this.getPanelTitle() || el.text || "Panel", location.x + dimensions.width / 2, location.y + 18, dimensions.width, dimensions.height);
    p5.pop();
  }

  /**
   * Render the detail panel
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   * @param {Object} socketController - Socket controller instance
   */
  renderDetailPanel(p5, el, socketController) {
    this.renderWorldActionLogs(p5, el, socketController);
    this.renderSimulationDate(p5, el);
    this.renderCash(p5, el);
  }

  /**
   * Render world action logs
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   * @param {Object} socketController - Socket controller instance
   */
  renderWorldActionLogs(p5, el, socketController) {
    socketController.getWorldActionLog().forEach((action, i) => {
      let actText = action.action;
      actText = actText.replace(' conversation ', " 💬 ").replace('chat ', "").replace(' with ', " - ");
      p5.text(actText, el.x + 112, el.y + 12 * i + 40);
    });
  }

  /**
   * Render cash amount
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   */
  renderCash(p5, el) {
    p5.text("$" + this.parent.getInventory().getCash(), el.x + 35, el.y + 55);
  }

  /**
   * Render the player profile panel
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   */
  renderPlayerProfilePanel(p5, el) {
    const textLocation = { x: el.x, y: el.y + el.h * 0.76 };
    const textDimensions = { width: el.w, height: el.h * 0.25 };
    this.renderProfileImage(p5, el);
    this.renderUIBanner(p5, el);
    this.renderPanelText(p5, el, textLocation, textDimensions);
  }

  /**
   * Render the profile image
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   */
  renderProfileImage(p5, el) {
    p5.image(this.parent.parent.PlayerProfileImage, el.x + el.w * 0.1, el.y + el.h * 0.05 - 18, el.w * 0.8, el.h * 0.8);
  }

  /**
   * Render the UI banner
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   */
  renderUIBanner(p5, el) {
    p5.image(this.parent.parent.GameMapSceneUIBanner, el.x + 4, el.y + el.h - 50);
  }

  /**
   * Render the default panel
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   */
  renderDefaultPanel(p5, el) {
    const padding = 25, spacing = 13, size = 32, cols = 12;
    this.parent.getDisplayMode() === 0
      ? this.renderInventoryView(p5, el, cols, padding, spacing, size)
      : this.parent.renderChatInputView(p5);
  }

  /**
   * Render the simulation date and time
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   */
  renderSimulationDate(p5, el) {
    const { time, date } = this.parent.SimulationDateTime;
    const textY = el.y + el.h - 65;
    p5.text(time, el.x, textY - 13, el.w, 55);
    p5.text(date, el.x, textY - 30, el.w, 55);
    this.renderTimeButtons(p5, el);
  }

  /**
   * Render time control buttons
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   */
  renderTimeButtons(p5, el) {
    const buttonConfigs = [
      { text: "||", rate: 0 },
      { text: "1x", rate: 1 },
      { text: "2x", rate: 2 },
      { text: "3x", rate: 3 }
    ];

    buttonConfigs.forEach((config, index) => {
      this.renderTimeButton(p5, el, config, index);
    });
  }

  /**
   * Render a single time control button
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   * @param {Object} config - Button configuration
   * @param {number} index - Button index
   */
  renderTimeButton(p5, el, config, index) {
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
  }

  /**
   * Render the inventory view
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   * @param {number} cols - Number of columns
   * @param {number} padding - Padding
   * @param {number} spacing - Spacing between slots
   * @param {number} size - Size of each slot
   */
  renderInventoryView(p5, el, cols, padding, spacing, size) {
    for (let i = 0; i < cols; i++) {
      this.renderInventorySlot(p5, el, i, padding, spacing, size);
    }
  }

  /**
   * Render a single inventory slot
   * @param {Object} p5 - p5.js instance
   * @param {Object} el - Element configuration
   * @param {number} index - Slot index
   * @param {number} padding - Padding
   * @param {number} spacing - Spacing between slots
   * @param {number} size - Size of the slot
   */
  renderInventorySlot(p5, el, index, padding, spacing, size) {
    const x = el.x + padding + (size + spacing) * index;
    const y = el.y + padding + 15;
    if(index === this.parent.parent.currentInventoryOffset % 12)
      p5.stroke("#aa2222");
    p5.rect(x, y, size, size);
    p5.noStroke();
    p5.push();
    p5.fill(index === 0 ? "red" : "white");
    this.renderInventoryItem(p5, index, x, y);
    p5.pop();
  }

  /**
   * Render an inventory item if it exists
   * @param {Object} p5 - p5.js instance
   * @param {number} index - Item index
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  renderInventoryItem(p5, index, x, y) {
    const inventory = this.parent.getInventory();
    if (index < inventory.getItemsArray().length) {
      const dataTmp = inventory.getItemsArray()[index];
      this.renderInventoryIcon(p5, dataTmp, x, y);
    }
  }

  /**
   * Render an inventory icon
   * @param {Object} p5 - p5.js instance
   * @param {Object} data - Item data
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  renderInventoryIcon(p5, data, x, y) {
    const icon = data.data.icon || [];
    p5.push();
    p5.textSize(24);
    p5.text((icon[0] || icon), x + 15, y + 15);
    p5.text((icon[1] || ""), x + 20, y + 24);
    p5.text(this.parent.getInventory().getItemCount(this.parent.ItemsEnum[data.data.key]), x + 32, y + 32);
    p5.pop();
  }
}

export default GUIPanel;