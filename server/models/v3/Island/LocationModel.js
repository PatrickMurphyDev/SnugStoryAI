const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LocationSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  currentLocation: {
    type: Schema.Types.ObjectId,
    ref: "islandpropertylots",
    required: true,
  },
  homeLocation: {
    type: Schema.Types.ObjectId,
    ref: "islandpropertylots",
    required: false,
  },
  workLocation: {
    type: Schema.Types.ObjectId,
    ref: "islandpropertylots",
    required: false,
  },
});

const Location = model("Location", LocationSchema);

module.exports = { Location };