const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AttributeFieldValueSchema = new Schema({
  vn: { type: String, required: true },
  vp: { type: Number, required: true },
  ve: { type: Number, required: true },
});

const CharacterAttributeFieldSchema = new Schema({
  aid: { type: Number, required: true },
  an: { type: String, required: true },
  ad: { type: String, required: true },
  ac: { type: String, required: true },
  ae: { type: String, required: true },
  av: { type: [AttributeFieldValueSchema], required: true },
});

const CharacterAttributeField = model("CharacterAttributeField", CharacterAttributeFieldSchema);

module.exports = { CharacterAttributeField };