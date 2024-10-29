import { IslandTemplate } from "../../utils/IslandTemplateTile";
import { ItemsEnum } from "./ItemsEnum";

export class GUIElementManager {
  constructor(parent, imgAssets) {
    this.parent = parent;
    this.imageAssets = imgAssets || { imgKey: null }; // key : image
    this.SimulationDateTime = { time: "", date: "" };
    this.GUIElements = [];
    this.AlertWindowText = "";
    this.AlertWindowNPCKey = "AndiMcNuttly";

    this.alertWindowIsOpen = false;
    this.allowMoveInputKeys = true;

    this.initializeGUIElements();
  }

  setSimulationDateTime(DateTime) {
    if (DateTime.hasOwnProperty("time")) {
      this.SimulationDateTime.time = DateTime.time;
    }
    if (DateTime.hasOwnProperty("date")) {
      this.SimulationDateTime.date = DateTime.date;
    }
  }

  getSimulationDateTime() {
    return this.SimulationDateTime;
  }

  openAlert(title,text,details) {
    this.setAlertWindow("OPEN");
    this.allowMoveInputKeys = false;
    this.AlertWindowText = {title:title||"alert",text:text||"Message"};
    if(details['NPCKey']){
      this.AlertWindowNPCKey = details['NPCKey'];
    }
  }

  closeAlert() {
    this.setAlertWindow("CLOSE");
    this.allowMoveInputKeys = true;
    this.AlertWindowText = {};
  }

  setAlertWindow(str) {
    if (str === "OPEN") {
      this.alertWindowIsOpen = true;
    } else if (str === "CLOSE") {
      this.alertWindowIsOpen = false;
    }
  }

  initializeGUIElements() {
    this.GUIElements = IslandTemplate.GUIElements;
    this.GUIElements[1].img = this.parent.PlayerProfileImage;
    this.GUIElements[3].actions = [{
        onClickHandle: (e) => {
          this.closeAlert();
          this.parent.mapDisplayMode = 1;
        },
        fill: "#63aff3",
        text: "Continue",
      },
      {
        onClickHandle: (e) => {
          this.closeAlert();
        },
        fill: "#666",
        text: "Cancel",
      }
    ];
  }

  renderGUIAlertWindow(p5, v) {
    p5.rect(v.x || 0, v.y || 0, v.w || 0, v.h || 0);
    // add window title bar bg
    p5.fill(100);
    p5.rect(v.x, v.y, v.w, 24);

    // window title text
    p5.fill(200);
    p5.text(this.AlertWindowText.title || v.title || "Panel", v.x, v.y, v.w, 24);

    let txt = this.AlertWindowText.text || v.text || "Msg";
    // window body text
    p5.push();
    p5.fill(0);
    p5.textAlign("LEFT", "TOP");
    p5.text(
      txt || "Panel",
      v.x + p5.textWidth(txt) / 2 + 10,
      v.y + 15 + 24,
      v.w,
      v.h
    );
    p5.pop();

    if (this.parent.characterProfileImages[this.AlertWindowNPCKey]) {
      p5.image(
        this.parent.characterProfileImages[this.AlertWindowNPCKey],
        570,
        350,
        125,
        125
      );

      // ---- ADD Alert Window Buttons ----- //s
      this.renderAlertWindowActionButtons(v, p5);
    } else {
      this.parent.characterProfileImages[this.AlertWindowNPCKey] =
        p5.loadImage(
          "images/CharacterProfileImages/" + this.AlertWindowNPCKey + ".png"
        );
    }
  }

  renderAlertWindowActionButtons(v, p5) {
    v.actions.forEach((v2, vi) => {
      vi = vi + 1;
      p5.push();
      p5.fill(v2.fill || 65);
      p5.rect(v.x + v.w - 175 * vi, v.y + v.h - 12, 150, 24);
      p5.fill(225);
      p5.text(v2.text, v.x + v.w - 175 * vi, v.y + v.h - 12, 150, 24);
      this.parent.handleTargetClick(
        p5,
        v.x + v.w - 175 * vi,
        v.y + v.h - 12,
        150,
        24,
        v2.onClickHandle
      );
      p5.pop();
    });
  }

  renderGUI(p5) {
    p5.image(this.parent.GameMapSceneUI, 0, 800 - 224);
    //console.log(this.GUIElements);
    this.GUIElements.forEach((GUIElementDetails) => {
      //console.log(v.GUIType);
      p5.fill(GUIElementDetails.fill || 200);
      switch (GUIElementDetails.GUIType) {
        case "AlertWindow":
          if (this.alertWindowIsOpen) {
            this.renderGUIAlertWindow(p5, GUIElementDetails);
          }
          break;

        case "PlayerProfileImageCirclePanel":
          //p5.ellipse((v.x || 0)+v.w/2, (v.y || 0)+v.h/2, v.w || 0, v.h || 0);
          this.renderGUIPlayerProfileImagePanel(GUIElementDetails, p5);
          break;

        case "CirclePanel":
        case "Panel":
        default:
          if (GUIElementDetails.PanelType === "Detail") {
            let heightPX = 55;
            p5.text(
              this.SimulationDateTime.time,
              GUIElementDetails.x,
              GUIElementDetails.y + GUIElementDetails.h - (heightPX + 10),
              GUIElementDetails.w,
              heightPX
            );
            p5.text(
              this.SimulationDateTime.date,
              GUIElementDetails.x,
              GUIElementDetails.y + GUIElementDetails.h - (heightPX + 35),
              GUIElementDetails.w,
              heightPX
            );
          } else {
            p5.fill("#555555");
            let invPadding = 25;
            let invSpacing = 13;
            let invSize = 32;
            let invSlotsCols = 12;
            for (var x = 0; x < invSlotsCols; x++) {
              p5.rect(
                GUIElementDetails.x + invPadding + (invSize + invSpacing) * x,
                GUIElementDetails.y + invPadding,
                invSize,
                invSize
              );
              p5.push();
              
              p5.fill("white");
              if (x === 0) {
                p5.fill("#999999");
                p5.rect(
                  GUIElementDetails.x + invPadding + (invSize + invSpacing) * x,
                  GUIElementDetails.y + invPadding,
                  invSize,
                  invSize
                );
                p5.fill("white");
                p5.text(
                  "🥅",
                  GUIElementDetails.x +
                    invPadding +
                    (invSize + invSpacing) * x +
                    16,
                  16 + GUIElementDetails.y + invPadding
                );
                p5.text(
                  this.parent.playerInventory.getItemCount(ItemsEnum['crabtrap']),
                  GUIElementDetails.x +
                    invPadding +
                    (invSize + invSpacing) * x +
                    32,
                  32 + GUIElementDetails.y + invPadding
                );
              }
              if (x === 1) {
                p5.text(
                  "🥪",
                  GUIElementDetails.x +
                    invPadding +
                    (invSize + invSpacing) * x +
                    16,
                  16 + GUIElementDetails.y + invPadding
                );
                p5.text(
                  this.parent.playerInventory.getItemCount(ItemsEnum['hermitcrab']),
                  GUIElementDetails.x +
                    invPadding +
                    (invSize + invSpacing) * x +
                    32,
                  32 + GUIElementDetails.y + invPadding
                );
              }
              p5.pop();
            }
          }
          this.renderGUIPanelText(p5, GUIElementDetails);
      }
    });
  }

  renderGUIPlayerProfileImagePanel(GUIElementDetails, p5) {
    if (GUIElementDetails.img) {
      let textLocation = { x: GUIElementDetails.x, y: GUIElementDetails.y };
      textLocation.y += GUIElementDetails.h * 0.75;
      let textDimensions = {
        width: GUIElementDetails.w,
        height: GUIElementDetails.h,
      };
      textDimensions.height *= 0.25; //small txt row
      p5.image(
        this.parent.PlayerProfileImage,
        GUIElementDetails.x + GUIElementDetails.w * 0.1,
        GUIElementDetails.y + GUIElementDetails.h * 0.05,
        GUIElementDetails.w * 0.8,
        GUIElementDetails.h * 0.8
      );
      p5.image(this.parent.GameMapSceneUIBanner, 4, 800 - 47);
      this.renderGUIPanelText(
        p5,
        GUIElementDetails,
        textLocation,
        textDimensions
      );
    }
  }

  renderGUIPanelText(p5, GUIElementDetails, textLocation, textDimensions) {
    textLocation = textLocation || {
      x: GUIElementDetails.x,
      y: GUIElementDetails.y,
    };
    textDimensions = textDimensions || {
      width: GUIElementDetails.w,
      height: GUIElementDetails.h,
    };
    p5.fill(255);
    p5.textStyle("Bold");
    p5.text(
      GUIElementDetails.text || "Panel",
      textLocation.x,
      textLocation.y,
      textDimensions.width,
      textDimensions.height
    );
  }
}
