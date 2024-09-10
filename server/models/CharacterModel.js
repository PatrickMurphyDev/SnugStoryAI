const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Character Schema
const CharacterSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  is_npc: { type: Boolean, default: true },
  is_active: { type: Boolean, default: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  age: { type: Number, required: true },
  biologicalGender: {
    type: String,
    enum: ["male", "female"],
    default: "female",
  },
});

const Character = model("Character", CharacterSchema);

// Character Details Schema
const CharacterDetailsSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  presentingGender: {
    type: String,
    enum: ["male", "female", "non-binary"],
    default: "female",
  },
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
  behavioral_patterns_id: { type: Schema.Types.ObjectId, ref: "BehavioralPatterns" },
  special_conditions_id: { type: Schema.Types.ObjectId, ref: "SpecialConditions" },
});

const CharacterDetails = model("CharacterDetails", CharacterDetailsSchema);

// Character Trait Schema
const CharacterTraitSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  trait_id: { type: Schema.Types.ObjectId, ref: "Trait", required: true },
  value: { type: Number, min: 0, max: 100, required: true },
});

const CharacterTrait = model("CharacterTrait", CharacterTraitSchema);

// Trait Schema
const TraitSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["physical", "psychological", "social", "other"],
    default: "other",
  },
});

const Trait = model("Trait", TraitSchema);

// Character Personality Schema
const CharacterPersonalitySchema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  age: { type: String, required: true }, // in other models
  gender: { type: String, required: true }, // in other models
  firstName: { type: String, required: true }, // in other models
  firstNameSuffix: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  birthplace: { type: String },
  culture: { type: String },
  raceEthnicity: { type: String }, // TODO should be in other models
  physicalSummary: { type: String },
  hometown: { type: String },
  currentResidence: { type: String },
  languagesSpoken: { type: String },
  introvertExtrovert: { type: String },
  education: { type: String },
  hobbies: { type: String },
  socialMediaPresence: { type: String },
  occupation: { type: String },
  politicalViews: { type: String },
  religiousViews: { type: String },
  decisionMakingStyle: { type: String },
  physicalDescription: { type: String },
  styleDetails: { type: String },
  travelExperiences: { type: String },
  familyBackground: { type: String },
  relationshipStatus: { type: String },
  childhoodMemories: { type: String },
  closestFriend: { type: String },
  roleModels: { type: String },
  pastRelationships: { type: String },
  secretTalents: { type: String },
  volunteerWork: { type: String },
  proudestAchievement: { type: String },
  personalFlaws: { type: String },
  biggestRegret: { type: String },
  biggestFear: { type: String },
  greatestAmbition: { type: String },
  personalMotto: { type: String },
  petPeeves: { type: String },
  strengths: { type: String },
  weaknesses: { type: String },
  preferredCommunicationStyle: { type: String },
  senseOfHumor: { type: String },
  conflictResolutionStyle: { type: String },
  superstitions: { type: String },
  typicalDailyRoutine: { type: String },
  fitnessRoutine: { type: String },
  allergies: { type: String },
  mentalHealth: { type: String },
  emotionalTriggers: { type: String },
  dreamHome: { type: String },
  mostPrizedPossession: { type: String },
  favoriteSeason: { type: String },
  favoriteChildhoodToy: { type: String },
  collectingHabits: { type: String },
  idealVacation: { type: String },
  favoriteSports: { type: String },
  favoriteBooks: { type: String },
  favoriteMovies: { type: String },
  favoriteMusicGenre: { type: String },
  favoriteFoods: { type: String },
});

const CharacterPersonality = model("CharacterPersonality", CharacterPersonalitySchema);

module.exports = { Character, CharacterDetails, CharacterTrait, Trait, CharacterPersonality };
