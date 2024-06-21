const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Island Schema
const IslandSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  areas: [{ type: Schema.Types.ObjectId, ref: 'Area' }],
});

const Island = model('Island', IslandSchema);

// Area Schema
const AreaSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: 'Island', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  income_level: { type: String, required: true },
  description: { type: String, required: true },
});

const Area = model('Area', AreaSchema);

// Island Property Lot Schema
const IslandPropertyLotSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: 'Island', required: true },
  type: { type: String, required: true },
  coordinates: { type: String, required: true },
  description: { type: String, required: true },
});

const IslandPropertyLot = model('IslandPropertyLot', IslandPropertyLotSchema);

// Building Schema
const BuildingSchema = new Schema({
  lot_id: { type: Schema.Types.ObjectId, ref: 'IslandPropertyLot', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
});

const Building = model('Building', BuildingSchema);

// Organization Schema
const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  building_id: { type: Schema.Types.ObjectId, ref: 'Building', required: true },
});

const Organization = model('Organization', OrganizationSchema);

// Job Position Schema
const JobPositionSchema = new Schema({
  organization_id: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String, required: true }],
  salary: { type: Number, required: true },
});

const JobPosition = model('JobPosition', JobPositionSchema);

// Character Schema
const CharacterSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  sexualOrientation: { type: String, enum: ["heterosexual", "homosexual", "bisexual", "asexual", "other"], required: true },
  occupation: { type: String, required: true },
  job_id: { type: Schema.Types.ObjectId, ref: 'JobPosition' },
  residence_id: { type: Schema.Types.ObjectId, ref: 'Building' },
  description: { type: String, required: true },
  traits: [{ type: Schema.Types.ObjectId, ref: 'CharacterTrait' }],
  resources_id: { type: Schema.Types.ObjectId, ref: 'Resources' },
  location_id: { type: Schema.Types.ObjectId, ref: 'Location' },
  behavioral_patterns_id: { type: Schema.Types.ObjectId, ref: 'BehavioralPatterns' },
  special_conditions_id: { type: Schema.Types.ObjectId, ref: 'SpecialConditions' },
});

const Character = model('Character', CharacterSchema);

// Character Trait Schema
const CharacterTraitSchema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  trait_id: { type: Schema.Types.ObjectId, ref: 'Trait', required: true },
  value: { type: Number, min: 0, max: 100, required: true },
});

const CharacterTrait = model('CharacterTrait', CharacterTraitSchema);

// Trait Schema
const TraitSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["physical", "psychological", "social"], required: true },
});

const Trait = model('Trait', TraitSchema);

// Resources Schema
const ResourcesSchema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  possessions: [{ type: String, required: true }],
  food: { type: Number, min: 0, required: true },
  supplies: { type: Number, min: 0, required: true },
});

const Resources = model('Resources', ResourcesSchema);

// Location Schema
const LocationSchema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  currentLocation: { type: String, required: true },
  homeLocation: { type: String, required: true },
  workLocation: { type: String, required: true },
});

const Location = model('Location', LocationSchema);

// Behavioral Patterns Schema
const BehavioralPatternsSchema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  dailySchedule: [{ type: String, required: true }],
  taskPriorities: [{ type: String, required: true }],
});

const BehavioralPatterns = model('BehavioralPatterns', BehavioralPatternsSchema);

// Special Conditions Schema
const SpecialConditionsSchema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  injuries: [{ type: String, required: true }],
  diseases: [{ type: String, required: true }],
  quests: [{ type: String, required: true }],
});

const SpecialConditions = model('SpecialConditions', SpecialConditionsSchema);

// Relationship Event Schema
const RelationshipEventSchema = new Schema({
  description: { type: String, required: true },
  parent_stage_id: { type: Schema.Types.ObjectId, ref: 'RelationshipEvent', default: null },
  next_stages: [{ type: Schema.Types.ObjectId, ref: 'RelationshipEvent' }],
});

const RelationshipEvent = model('RelationshipEvent', RelationshipEventSchema);

// Character Relationship Schema
const CharacterRelationshipSchema = new Schema({
  character_1_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  character_2_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  relationship_type: { type: String, required: true },
  description: { type: String, required: true },
  relationship_historical_events: [{ type: Schema.Types.ObjectId, ref: 'RelationshipEvent' }],
});

const CharacterRelationship = model('CharacterRelationship', CharacterRelationshipSchema);

module.exports = {
  Island,
  Area,
  IslandPropertyLot,
  Building,
  Organization,
  JobPosition,
  Character,
  CharacterTrait,
  Trait,
  Resources,
  Location,
  BehavioralPatterns,
  SpecialConditions,
  RelationshipEvent,
  CharacterRelationship,
};
