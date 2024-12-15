const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CharacterRelationshipSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_1_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  character_2_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  relationship_type: {
    type: String,
    enum: ["Family", "Any", "Platonic", "Romantic", "Career", "Acquaintance"],
    default: "Any",
  },
  relationship_sub_type: { type: String, default: "" },
  description: { type: String, required: true },
  relationship_historical_events: [
    { type: Schema.Types.ObjectId, ref: "RelationshipEvent" },
  ],
});

const CharacterRelationship = model("CharacterRelationship", CharacterRelationshipSchema);

module.exports = { CharacterRelationship };