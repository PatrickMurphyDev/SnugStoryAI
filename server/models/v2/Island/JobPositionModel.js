const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const JobPositionSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  organization_id: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  building_id: { type: Schema.Types.ObjectId, ref: "Building", required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  requirements: [{ type: String, required: false }],
  salary: { type: Number, required: false },
});

const JobPosition = model("JobPosition", JobPositionSchema);

module.exports = { JobPosition };