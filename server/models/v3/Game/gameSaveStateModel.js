const mongoose = require("mongoose");

const GameSaveStateSchema = mongoose.Schema(
  {
    player: {
      location: { 
        x: { type: Number, required: true }, 
        y: { type: Number, required: true } 
      },
      health: { type: Number, required: false, default: 100 },
      inventory: { type: String, required: true },
    },
    world: {
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GameSaveState", GameSaveStateSchema);
