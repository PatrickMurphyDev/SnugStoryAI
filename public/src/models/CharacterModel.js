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

// Character Schema
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
  sexualOrientation: {
    type: String,
    enum: ["heterosexual", "homosexual", "bisexual", "asexual", "other"],
    default: "herosexual",
  },
  occupation: { type: String, required: false },
  job_id: { type: Schema.Types.ObjectId, ref: "JobPosition" },
  residence_id: { type: Schema.Types.ObjectId, ref: "Building" },
  description: { type: String, required: false },
  goals: [
    {
      goalType: {
        type: String,
        enum: ["Story", "Scene", "Secondary", "Other"],
        default: "Story",
      },
      goalName: { type: String, required: true },
      goalDescription: { type: String, required: true },
      //goalStakes: [],
      //goalSolutions: [],
    },
  ], // story goals and scene goals for the character
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

// Character Trait Schema
const CharacterTraitSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
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

// Island Schema
const CharacterPersonalitySchema = new Schema({
  age: { type: String, required: true }, // in other models
  gender: { type: String, required: true }, // in other models
  firstName: { type: String, required: true }, // in other models
  firstNameSuffix: { type: String, required: false }, // in other models
  middleName: { type: String, required: false }, // in other models
  lastName: { type: String, required: false }, // in other models
  birthplace: { type: String, required: false },
  culture: { type: String, required: false },
  raceEthnicity: { type: String, required: false }, // TODO should be in other models
  physicalSummary: { type: String, required: false },
  hometown: { type: String, required: false },
  currentResidence: { type: String, required: false },
  languagesSpoken: { type: String, required: false },
  introvertExtrovert: { type: String, required: false },
  education: { type: String, required: false },
  hobbies: { type: String, required: false },
  socialMediaPresence: { type: String, required: false },
  occupation: { type: String, required: false },
  politicalViews: { type: String, required: false },
  religiousViews: { type: String, required: false },
  decisionMakingStyle: { type: String, required: false },
  physicalDescription: { type: String, required: false },
  styleDetails: { type: String, required: false },
  travelExperiences: { type: String, required: false },
  familyBackground: { type: String, required: false },
  relationshipStatus: { type: String, required: false },
  childhoodMemories: { type: String, required: false },
  closestFriend: { type: String, required: false },
  roleModels: { type: String, required: false },
  pastRelationships: { type: String, required: false },
  secretTalents: { type: String, required: false },
  volunteerWork: { type: String, required: false },
  proudestAchievement: { type: String, required: false },
  personalFlaws: { type: String, required: false },
  biggestRegret: { type: String, required: false },
  biggestFear: { type: String, required: false },
  greatestAmbition: { type: String, required: false },
  personalMotto: { type: String, required: false },
  petPeeves: { type: String, required: false },
  strengths: { type: String, required: false },
  weaknesses: { type: String, required: false },
  preferredCommunicationStyle: { type: String, required: false },
  senseOfHumor: { type: String, required: false },
  conflictResolutionStyle: { type: String, required: false },
  superstitions: { type: String, required: false },
  typicalDailyRoutine: { type: String, required: false },
  fitnessRoutine: { type: String, required: false },
  allergies: { type: String, required: false },
  mentalHealth: { type: String, required: false },
  emotionalTriggers: { type: String, required: false },
  dreamHome: { type: String, required: false },
  mostPrizedPossession: { type: String, required: false },
  favoriteSeason: { type: String, required: false },
  favoriteChildhoodToy: { type: String, required: false },
  collectingHabits: { type: String, required: false },
  idealVacation: { type: String, required: false },
  favoriteSports: { type: String, required: false },
  favoriteBooks: { type: String, required: false },
  favoriteMovies: { type: String, required: false },
  favoriteMusicGenre: { type: String, required: false },
  favoriteFoods: { type: String, required: false },
});

const CharacterPersonality = model(
  "CharacterPersonality",
  CharacterPersonalitySchema
);

module.exports = {Character, CharacterDetails, CharacterTrait, Trait, CharacterPersonality};
