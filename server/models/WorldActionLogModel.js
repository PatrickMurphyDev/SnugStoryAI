const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorldActionLogSchema = mongoose.Schema(
  {
    action: { type: String, required: true },
    action_by: { type: Schema.Types.ObjectId, ref: "Character", required: false },
    action_target: { type: Schema.Types.ObjectId, ref: "Character", required: false },
    action_type: { type: String, required: false, default: "DefaultAction" },
    action_detail_level: { type: String, required: false, default: "medium" },
    action_details: { type: Object, required: false, default: {description: "No details provided"} },
    world: {
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WorldActionLog", WorldActionLogSchema);
