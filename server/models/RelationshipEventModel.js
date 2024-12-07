const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RelationshipEventSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  parent_stage_id: {
    type: Schema.Types.ObjectId,
    ref: "RelationshipEvent",
    default: null,
  },
  next_stages: [{ type: Schema.Types.ObjectId, ref: "RelationshipEvent" }],
});

const RelationshipEvent = model("RelationshipEvent", RelationshipEventSchema);

module.exports = { RelationshipEvent };