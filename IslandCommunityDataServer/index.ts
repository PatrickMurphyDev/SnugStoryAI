import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, model } from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3020;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/island_community', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
interface IIsland extends Document {
  name: string;
  location: string;
  description: string;
  areas: mongoose.Types.ObjectId[];
}

const IslandSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  areas: [{ type: Schema.Types.ObjectId, ref: 'Area' }],
});

const Island = model<IIsland>('Island', IslandSchema);

interface IArea extends Document {
  island_id: mongoose.Types.ObjectId;
  name: string;
  type: string;
  income_level: string;
  description: string;
}

const AreaSchema: Schema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: 'Island', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  income_level: { type: String, required: true },
  description: { type: String, required: true },
});

const Area = model<IArea>('Area', AreaSchema);

interface IIslandPropertyLot extends Document {
  island_id: mongoose.Types.ObjectId;
  type: string;
  coordinates: string;
  description: string;
}

const IslandPropertyLotSchema: Schema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: 'Island', required: true },
  type: { type: String, required: true },
  coordinates: { type: String, required: true },
  description: { type: String, required: true },
});

const IslandPropertyLot = model<IIslandPropertyLot>('IslandPropertyLot', IslandPropertyLotSchema);

interface IBuilding extends Document {
  lot_id: mongoose.Types.ObjectId;
  name: string;
  type: string;
  address: string;
  description: string;
}

const BuildingSchema: Schema = new Schema({
  lot_id: { type: Schema.Types.ObjectId, ref: 'IslandPropertyLot', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
});

const Building = model<IBuilding>('Building', BuildingSchema);

interface IOrganization extends Document {
  name: string;
  type: string;
  address: string;
  description: string;
  building_id: mongoose.Types.ObjectId;
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  building_id: { type: Schema.Types.ObjectId, ref: 'Building', required: true },
});

const Organization = model<IOrganization>('Organization', OrganizationSchema);

interface IJobPosition extends Document {
  organization_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
}

const JobPositionSchema: Schema = new Schema({
  organization_id: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String, required: true }],
  salary: { type: Number, required: true },
});

const JobPosition = model<IJobPosition>('JobPosition', JobPositionSchema);

interface ICharacter extends Document {
  name: string;
  age: number;
  gender: string;
  sexualOrientation: string;
  occupation: string;
  job_id: mongoose.Types.ObjectId;
  residence_id: mongoose.Types.ObjectId;
  description: string;
  physical_traits_id: mongoose.Types.ObjectId;
  skills_id: mongoose.Types.ObjectId;
  psychological_traits_id: mongoose.Types.ObjectId;
  social_traits_id: mongoose.Types.ObjectId;
  resources_id: mongoose.Types.ObjectId;
  location_id: mongoose.Types.ObjectId;
  behavioral_patterns_id: mongoose.Types.ObjectId;
  special_conditions_id: mongoose.Types.ObjectId;
}

const CharacterSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  sexualOrientation: { type: String, enum: ["heterosexual", "homosexual", "bisexual", "asexual", "other"], required: true },
  occupation: { type: String, required: true },
  job_id: { type: Schema.Types.ObjectId, ref: 'JobPosition' },
  residence_id: { type: Schema.Types.ObjectId, ref: 'Building' },
  description: { type: String, required: true },
  physical_traits_id: { type: Schema.Types.ObjectId, ref: 'PhysicalTraits' },
  skills_id: { type: Schema.Types.ObjectId, ref: 'Skills' },
  psychological_traits_id: { type: Schema.Types.ObjectId, ref: 'PsychologicalTraits' },
  social_traits_id: { type: Schema.Types.ObjectId, ref: 'SocialTraits' },
  resources_id: { type: Schema.Types.ObjectId, ref: 'Resources' },
  location_id: { type: Schema.Types.ObjectId, ref: 'Location' },
  behavioral_patterns_id: { type: Schema.Types.ObjectId, ref: 'BehavioralPatterns' },
  special_conditions_id: { type: Schema.Types.ObjectId, ref: 'SpecialConditions' },
});

const Character = model<ICharacter>('Character', CharacterSchema);

interface IPhysicalTraits extends Document {
  character_id: mongoose.Types.ObjectId;
  health: number;
  stamina: number;
  hunger: number;
  thirst: number;
  strength: number;
  endurance: number;
}

const PhysicalTraitsSchema: Schema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  health: { type: Number, min: 0, max: 100, required: true },
  stamina: { type: Number, min: 0, max: 100, required: true },
  hunger: { type: Number, min: 0, max: 100, required: true },
  thirst: { type: Number, min: 0, max: 100, required: true },
  strength: { type: Number, min: 0, max: 100, required: true },
  endurance: { type: Number, min: 0, max: 100, required: true },
});

const PhysicalTraits = model<IPhysicalTraits>('PhysicalTraits', PhysicalTraitsSchema);

interface ISkills extends Document {
  character_id: mongoose.Types.ObjectId;
  farming: number;
  hunting: number;
  crafting: number;
  combat: number;
}

const SkillsSchema: Schema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  farming: { type: Number, min: 0, max: 100, required: true },
  hunting: { type: Number, min: 0, max: 100, required: true },
  crafting: { type: Number, min: 0, max: 100, required: true },
  combat: { type: Number, min: 0, max: 100, required: true },
});

const Skills = model<ISkills>('Skills', SkillsSchema);

interface IPsychologicalTraits extends Document {
  character_id: mongoose.Types.ObjectId;
  happiness: number;
  intelligence: number;
  bravery: number;
  sociability: number;
  diligence: number;
  values: {
    honesty: number;
    kindness: number;
    ambition: number;
  };
  interests: string[];
}

const PsychologicalTraitsSchema: Schema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  happiness: { type: Number, min: 0, max: 100, required: true },
  intelligence: { type: Number, min: 0, max: 100, required: true },
  bravery: { type: Number, min: 0, max: 100, required: true },
  sociability: { type: Number, min: 0, max: 100, required: true },
  diligence: { type: Number, min: 0, max: 100, required: true },
  values: {
    honesty: { type: Number, min: 0, max: 100, required: true },
    kindness: { type: Number, min: 0, max: 100, required: true },
    ambition: { type: Number, min: 0, max: 100, required: true },
  },
  interests: [{ type: String, required: true }],
});

const PsychologicalTraits = model<IPsychologicalTraits>('PsychologicalTraits', PsychologicalTraitsSchema);

interface ISocialTraits extends Document {
  character_id: mongoose.Types.ObjectId;
  family: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
  enemies: mongoose.Types.ObjectId[];
  romanticRelationships: {
    partnerId: mongoose.Types.ObjectId;
    relationshipStatus: string;
    compatibility: number;
  }[];
  socialStatus: string;
}

const SocialTraitsSchema: Schema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  family: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  enemies: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  romanticRelationships: [{
    partnerId: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
    relationshipStatus: { type: String, enum: ["interested", "dating", "engaged", "married", "broken up"], required: true },
    compatibility: { type: Number, min: 0, max: 100, required: true },
  }],
  socialStatus: { type: String, required: true },
});

const SocialTraits = model<ISocialTraits>('SocialTraits', SocialTraitsSchema);

interface IResources extends Document {
  character_id: mongoose.Types.ObjectId;
  possessions: string[];
  food: number;
  supplies: number;
}

const ResourcesSchema: Schema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  possessions: [{ type: String, required: true }],
  food: { type: Number, min: 0, required: true },
  supplies: { type: Number, min: 0, required: true },
});

const Resources = model<IResources>('Resources', ResourcesSchema);

interface ILocation extends Document {
  character_id: mongoose.Types.ObjectId;
  currentLocation: string;
  homeLocation: string;
  workLocation: string;
}

const LocationSchema: Schema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  currentLocation: { type: String, required: true },
  homeLocation: { type: String, required: true },
  workLocation: { type: String, required: true },
});

const Location = model<ILocation>('Location', LocationSchema);

interface IBehavioralPatterns extends Document {
  character_id: mongoose.Types.ObjectId;
  dailySchedule: string[];
  taskPriorities: string[];
}

const BehavioralPatternsSchema: Schema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  dailySchedule: [{ type: String, required: true }],
  taskPriorities: [{ type: String, required: true }],
});

const BehavioralPatterns = model<IBehavioralPatterns>('BehavioralPatterns', BehavioralPatternsSchema);

interface ISpecialConditions extends Document {
  character_id: mongoose.Types.ObjectId;
  injuries: string[];
  diseases: string[];
  quests: string[];
}

const SpecialConditionsSchema: Schema = new Schema({
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  injuries: [{ type: String, required: true }],
  diseases: [{ type: String, required: true }],
  quests: [{ type: String, required: true }],
});

const SpecialConditions = model<ISpecialConditions>('SpecialConditions', SpecialConditionsSchema);

interface IRelationshipEvent extends Document {
  description: string;
  parent_stage_id: mongoose.Types.ObjectId | null;
  next_stages: mongoose.Types.ObjectId[];
}

const RelationshipEventSchema: Schema = new Schema({
  description: { type: String, required: true },
  parent_stage_id: { type: Schema.Types.ObjectId, ref: 'RelationshipEvent', default: null },
  next_stages: [{ type: Schema.Types.ObjectId, ref: 'RelationshipEvent' }],
});

const RelationshipEvent = model<IRelationshipEvent>('RelationshipEvent', RelationshipEventSchema);

interface ICharacterRelationship extends Document {
  character_1_id: mongoose.Types.ObjectId;
  character_2_id: mongoose.Types.ObjectId;
  relationship_type: string;
  description: string;
  relationship_historical_events: mongoose.Types.ObjectId[];
}

const CharacterRelationshipSchema: Schema = new Schema({
  character_1_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  character_2_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  relationship_type: { type: String, required: true },
  description: { type: String, required: true },
  relationship_historical_events: [{ type: Schema.Types.ObjectId, ref: 'RelationshipEvent' }],
});

const CharacterRelationship = model<ICharacterRelationship>('CharacterRelationship', CharacterRelationshipSchema);

// REST API endpoints

// CRUD operations for Island
app.post('/islands', async (req: Request, res: Response) => {
  const island = new Island(req.body);
  await island.save();
  res.status(201).send(island);
});

app.get('/islands', async (req: Request, res: Response) => {
  const islands = await Island.find();
  res.send(islands);
});

app.get('/islands/:id', async (req: Request, res: Response) => {
  const island = await Island.findById(req.params.id);
  res.send(island);
});

app.put('/islands/:id', async (req: Request, res: Response) => {
  const island = await Island.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(island);
});

app.delete('/islands/:id', async (req: Request, res: Response) => {
  await Island.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// CRUD operations for other schemas follow similar structure

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
