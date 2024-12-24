const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Character Details Schema
const CharacterDetailsSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  presentingGender: {
    type: String,
    enum: ["male", "female", "non-binary"],
    default: "female",
  },
  raceEthnicity: { type: String },
  sexualOrientation: {
    type: String,
    enum: ["heterosexual", "homosexual", "bisexual", "asexual", "other"],
    default: "heterosexual",
  },
  occupation: { type: String },
  job_id: { type: Schema.Types.ObjectId, ref: "JobPosition" },
  residence_id: { type: Schema.Types.ObjectId, ref: "Building" },
  appearance: {
    height: { type: String },
    bodyType: { type: String },
    hairColor: { type: String },
    hairStyle: { type: String },
    eyeDescriptor: { type: String },
    eyeColor: { type: String },
    clothingStyle: { type: String },
  },
  description: { type: String },
  goals: [
    {
      goalType: {
        type: String,
        enum: ["Story", "Scene", "Secondary", "Other"],
        default: "Story",
      },
      goalName: { type: String, required: true },
      goalDescription: { type: String, required: true },
    },
  ],
  traits: [{ type: Schema.Types.ObjectId, ref: "CharacterTrait" }],
  resources_id: { type: Schema.Types.ObjectId, ref: "Resources" },
  behavioral_patterns_id: {
    type: Schema.Types.ObjectId,
    ref: "BehavioralPatterns",
  },
  special_conditions_id: {
    type: Schema.Types.ObjectId,
    ref: "SpecialConditions",
  },
});

const CharacterDetails = model("CharacterDetails", CharacterDetailsSchema);

module.exports = { CharacterDetails };
