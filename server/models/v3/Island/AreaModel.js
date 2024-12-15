const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Area Schema
const AreaSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "General",
      "ResidentialZone",
      "IndustustrialZone",
      "CommercialZone",
      "CommericalDenseHousingZone",
    ],
    default: "General",
  },
  income_level: {
    type: String,
    enum: ["N/A", "$", "$$", "$$$"],
    default: "N/A",
  },
  description: { type: String, required: false },
});
const Area = model("Area", AreaSchema);
module.exports = {Area};