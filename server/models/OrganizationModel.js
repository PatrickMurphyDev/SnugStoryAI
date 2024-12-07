const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrganizationSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Civic", "Commercial", "Non-Profit", "Private"],
    default: "Commercial",
  },
  sector: { type: String, required: false },
  description: { type: String, required: false },
  building_id: [
    { type: Schema.Types.ObjectId, ref: "Building", required: false },
  ],
  parent_organization_id: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: false,
  },
});

const Organization = model("Organization", OrganizationSchema);

module.exports = { Organization };