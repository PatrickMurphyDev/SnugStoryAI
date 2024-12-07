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

// Characrer related models moved to Character Model File

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
  relationship_type: {
    type: String,
    enum: ["Family", "Any", "Platonic", "Romantic", "Career", "Acquaintance"],
    default: "Any",
  },
  relationship_sub_type: { type: String, default: "" },
  description: { type: String, required: true },
  relationship_historical_events: [
    { type: Schema.Types.ObjectId, ref: "RelationshipEvent" },
  ],
});

const CharacterRelationship = model(
  "CharacterRelationship",
  CharacterRelationshipSchema
);

// Sub-schema for values in the 'av' array
const AttributeFieldValueSchema = new Schema({
  vn: { type: String, required: true }, // Value name
  vp: { type: Number, required: true }, // Value probability
  ve: { type: Number, required: true }, // Value effect
});

// Schema for the field
const CharacterAttributeFieldSchema = new Schema({
  aid: { type: Number, required: true }, // Attribute ID
  an: { type: String, required: true }, // Attribute name
  ad: { type: String, required: true }, // Attribute description
  ac: { type: String, required: true }, // Attribute category
  ae: { type: String, required: true }, // Attribute effects
  av: { type: [AttributeFieldValueSchema], required: true }, // Array of values
});

const CharacterAttributeField = model(
  "CharacterAttributeField",
  CharacterAttributeFieldSchema
);

module.exports = {
  IslandPropertyLot,
  Building,
  Organization,
  JobPosition,
  Resources,
  Location,
  BehavioralPatterns,
  SpecialConditions,
  RelationshipEvent,
  CharacterRelationship,
  CharacterAttributeField,
};
