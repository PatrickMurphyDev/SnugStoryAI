const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SpecialConditionsSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  condition_id: {
    type: Schema.Types.ObjectId,
    ref: "Condition",
    required: true,
  },
  value: { type: Number, min: 0, max: 100, required: true },
});

const SpecialConditions = model("SpecialConditions", SpecialConditionsSchema);

module.exports = { SpecialConditions };