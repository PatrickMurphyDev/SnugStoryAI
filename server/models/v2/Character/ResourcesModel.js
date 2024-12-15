const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ResourcesSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  possessions: [{ type: String, required: false }],
  food: { type: Number, min: 0, required: true, default: 0 },
  supplies: { type: Number, min: 0, required: true },
});

const Resources = model("Resources", ResourcesSchema);

module.exports = { Resources };