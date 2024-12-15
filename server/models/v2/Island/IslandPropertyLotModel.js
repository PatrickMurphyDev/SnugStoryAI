const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Island Property Lot Schema
const IslandPropertyLotSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  area_id: { type: Schema.Types.ObjectId, ref: "Area", required: false },
  is_vacant: { type: Boolean, default: true },
  zoneType: {
    type: String,
    enum: [
      "Residential",
      "DenseResidential",
      "Commerical",
      "Industrial",
      "No Zone",
    ],
    default: "No Zone",
  },
  location: { type: String, required: false },
  address: { type: String, required: false },
  description: { type: String, required: false },
});

const IslandPropertyLot = model("IslandPropertyLot", IslandPropertyLotSchema);

module.exports = {IslandPropertyLot};