const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BehavioralPatternsSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  dailySchedule: [{ type: String, required: true }],
  taskPriorities: [{ type: String, required: true }],
});

const BehavioralPatterns = model("BehavioralPatterns", BehavioralPatternsSchema);

module.exports = { BehavioralPatterns };