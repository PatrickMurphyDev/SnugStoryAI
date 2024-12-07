const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Island Schema
const IslandSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: false },
  description: { type: String, required: false },
  userID: { type: String, required: false },
});
const island = model("Island", IslandSchema);
module.exports = {island};
