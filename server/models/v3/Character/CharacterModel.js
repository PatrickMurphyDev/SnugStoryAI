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

/* 
// Character Personality Schema
const CharacterPersonalitySchema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  birthplace: { type: String },
  culture: { type: String },
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
 */
module.exports = { Character };
