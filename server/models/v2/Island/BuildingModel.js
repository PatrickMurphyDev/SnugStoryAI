const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Building Schema
const BuildingSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  lot_id: {
    type: Schema.Types.ObjectId,
    ref: "IslandPropertyLot",
    required: true,
  },
  name: { type: String, required: true },
  type: { type: String, default: "onestory" },
  description: { type: String, required: false },
});

const Building = model("Building", BuildingSchema);

module.exports = {Building};