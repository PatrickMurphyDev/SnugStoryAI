const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Island Schema
const IslandSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: false },
  description: { type: String, required: false },
});

const Island = model("Island", IslandSchema);

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
  coordinates: { type: String, required: false },
  address: { type: String, required: false },
  description: { type: String, required: false },
});

const IslandPropertyLot = model("IslandPropertyLot", IslandPropertyLotSchema);

// Building Schema
const BuildingSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  lot_id: {
    type: Schema.Types.ObjectId,
    ref: "IslandPropertyLot",
    required: true,
  },
  name: { type: String, required: true },
  type: { type: String, default: "onestory" },
  description: { type: String, required: false },
});

const Building = model("Building", BuildingSchema);

/* ================================================================= */
/* ======================= End Geo Based Objects =================== */
/* ================================================================= */

// Organization Schema
const OrganizationSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Civic", "Commercial", "Non-Profit", "Private"],
    default: "Commercial",
  },
  sector: { type: String, required: false }, // Industry or category
  description: { type: String, required: false },
  building_id: [
    { type: Schema.Types.ObjectId, ref: "Building", required: false },
  ],
  parent_organization_id: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: false,
  }, // Optional parent organization (city>postoffice)
});

const Organization = model("Organization", OrganizationSchema);

// Job Position Schema
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

// Character Schema
const CharacterSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  is_npc: { type: Boolean, default: true },
  is_active: { type: Boolean, default: true },
  name: {first:{ type: String, required: true },last:{ type: String, required: true }},
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
  character_id: {type: Schema.Types.ObjectId, ref:"Character", required: true},
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

// Resources Schema
const ResourcesSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  possessions: [{ type: String, required: false }],
  food: { type: Number, min: 0, required: true, default: 0 },
  supplies: { type: Number, min: 0, required: true },
});

const Resources = model("Resources", ResourcesSchema);

// Location Schema
const LocationSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  currentLocation: {
    type: Schema.Types.ObjectId,
    ref: "islandpropertylots",
    required: true,
  },
  homeLocation: {
    type: Schema.Types.ObjectId,
    ref: "islandpropertylots",
    required: false,
  },
  workLocation: {
    type: Schema.Types.ObjectId,
    ref: "islandpropertylots",
    required: false,
  },
});

const Location = model("Location", LocationSchema);

// Conditions Schema
const ConditionSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  type: [
    { type: String, enum: ["Disease", "Injury", "Other"], default: "Other" },
  ],
});

const Condition = model("Condition", ConditionSchema);

// Special Conditions Schema
const SpecialConditionsSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  condition_id: {
    type: Schema.Types.ObjectId,
    ref: "Condition",
    required: true,
  },
  value: { type: Number, min: 0, max: 100, required: true },
});

const SpecialConditions = model("SpecialConditions", SpecialConditionsSchema);

// Behavioral Patterns Schema
const BehavioralPatternsSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  dailySchedule: [{ type: String, required: true }],
  taskPriorities: [{ type: String, required: true }],
});

const BehavioralPatterns = model(
  "BehavioralPatterns",
  BehavioralPatternsSchema
);

// Relationship Event Schema
const RelationshipEventSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  parent_stage_id: {
    type: Schema.Types.ObjectId,
    ref: "RelationshipEvent",
    default: null,
  },
  next_stages: [{ type: Schema.Types.ObjectId, ref: "RelationshipEvent" }],
});

const RelationshipEvent = model("RelationshipEvent", RelationshipEventSchema);

// Character Relationship Schema
const CharacterRelationshipSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  character_1_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  character_2_id: {
    type: Schema.Types.ObjectId,
    ref: "Character",
    required: true,
  },
  relationship_type: { type: String, enum: ["Family", "Any", "Platonic", "Romantic", "Career", "Acquaintance"], default: "Any" },
  relationship_sub_type: { type: String, default: ''},
  description: { type: String, required: true }, 
  relationship_historical_events: [
    { type: Schema.Types.ObjectId, ref: "RelationshipEvent" },
  ],
});

const CharacterRelationship = model(
  "CharacterRelationship",
  CharacterRelationshipSchema
);

module.exports = {
  Island,
  Area,
  IslandPropertyLot,
  Building,
  Organization,
  JobPosition,
  Character,
  CharacterDetails,
  CharacterTrait,
  Trait,
  Resources,
  Location,
  BehavioralPatterns,
  SpecialConditions,
  RelationshipEvent,
  CharacterRelationship,
};
