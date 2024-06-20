import { Request, Response } from 'express';
import {
  Island,
  Area,
  IslandPropertyLot,
  Building,
  Organization,
  JobPosition,
  Character,
  PhysicalTraits,
  Skills,
  PsychologicalTraits,
  SocialTraits,
  Resources,
  Location,
  BehavioralPatterns,
  SpecialConditions,
  RelationshipEvent,
  CharacterRelationship,
} from './models';

// Generic CRUD operation functions
export const createDocument = (Model: any) => async (req: Request, res: Response) => {
  try {
    const document = new Model(req.body);
    await document.save();
    res.status(201).send(document);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getDocuments = (Model: any) => async (req: Request, res: Response) => {
  try {
    const documents = await Model.find();
    res.send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getDocumentById = (Model: any) => async (req: Request, res: Response) => {
  try {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return res.status(404).send();
    }
    res.send(document);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateDocument = (Model: any) => async (req: Request, res: Response) => {
  try {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!document) {
      return res.status(404).send();
    }
    res.send(document);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteDocument = (Model: any) => async (req: Request, res: Response) => {
  try {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).send();
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// Exporting specific CRUD functions for each schema
export const createIsland = createDocument(Island);
export const getIslands = getDocuments(Island);
export const getIslandById = getDocumentById(Island);
export const updateIsland = updateDocument(Island);
export const deleteIsland = deleteDocument(Island);

// Repeat the above export statements for each schema...
export const createArea = createDocument(Area);
export const getAreas = getDocuments(Area);
export const getAreaById = getDocumentById(Area);
export const updateArea = updateDocument(Area);
export const deleteArea = deleteDocument(Area);

export const createIslandPropertyLot = createDocument(IslandPropertyLot);
export const getIslandPropertyLots = getDocuments(IslandPropertyLot);
export const getIslandPropertyLotById = getDocumentById(IslandPropertyLot);
export const updateIslandPropertyLot = updateDocument(IslandPropertyLot);
export const deleteIslandPropertyLot = deleteDocument(IslandPropertyLot);

export const createBuilding = createDocument(Building);
export const getBuildings = getDocuments(Building);
export const getBuildingById = getDocumentById(Building);
export const updateBuilding = updateDocument(Building);
export const deleteBuilding = deleteDocument(Building);

export const createOrganization = createDocument(Organization);
export const getOrganizations = getDocuments(Organization);
export const getOrganizationById = getDocumentById(Organization);
export const updateOrganization = updateDocument(Organization);
export const deleteOrganization = deleteDocument(Organization);

export const createJobPosition = createDocument(JobPosition);
export const getJobPositions = getDocuments(JobPosition);
export const getJobPositionById = getDocumentById(JobPosition);
export const updateJobPosition = updateDocument(JobPosition);
export const deleteJobPosition = deleteDocument(JobPosition);

export const createCharacter = createDocument(Character);
export const getCharacters = getDocuments(Character);
export const getCharacterById = getDocumentById(Character);
export const updateCharacter = updateDocument(Character);
export const deleteCharacter = deleteDocument(Character);

export const createPhysicalTraits = createDocument(PhysicalTraits);
export const getPhysicalTraits = getDocuments(PhysicalTraits);
export const getPhysicalTraitsById = getDocumentById(PhysicalTraits);
export const updatePhysicalTraits = updateDocument(PhysicalTraits);
export const deletePhysicalTraits = deleteDocument(PhysicalTraits);

export const createSkills = createDocument(Skills);
export const getSkills = getDocuments(Skills);
export const getSkillsById = getDocumentById(Skills);
export const updateSkills = updateDocument(Skills);
export const deleteSkills = deleteDocument(Skills);

export const createPsychologicalTraits = createDocument(PsychologicalTraits);
export const getPsychologicalTraits = getDocuments(PsychologicalTraits);
export const getPsychologicalTraitsById = getDocumentById(PsychologicalTraits);
export const updatePsychologicalTraits = updateDocument(PsychologicalTraits);
export const deletePsychologicalTraits = deleteDocument(PsychologicalTraits);

export const createSocialTraits = createDocument(SocialTraits);
export const getSocialTraits = getDocuments(SocialTraits);
export const getSocialTraitsById = getDocumentById(SocialTraits);
export const updateSocialTraits = updateDocument(SocialTraits);
export const deleteSocialTraits = deleteDocument(SocialTraits);

export const createResources = createDocument(Resources);
export const getResources = getDocuments(Resources);
export const getResourcesById = getDocumentById(Resources);
export const updateResources = updateDocument(Resources);
export const deleteResources = deleteDocument(Resources);

export const createLocation = createDocument(Location);
export const getLocation = getDocuments(Location);
export const getLocationById = getDocumentById(Location);
export const updateLocation = updateDocument(Location);
export const deleteLocation = deleteDocument(Location);

export const createBehavioralPatterns = createDocument(BehavioralPatterns);
export const getBehavioralPatterns = getDocuments(BehavioralPatterns);
export const getBehavioralPatternsById = getDocumentById(BehavioralPatterns);
export const updateBehavioralPatterns = updateDocument(BehavioralPatterns);
export const deleteBehavioralPatterns = deleteDocument(BehavioralPatterns);

export const createSpecialConditions = createDocument(SpecialConditions);
export const getSpecialConditions = getDocuments(SpecialConditions);
export const getSpecialConditionsById = getDocumentById(SpecialConditions);
export const updateSpecialConditions = updateDocument(SpecialConditions);
export const deleteSpecialConditions = deleteDocument(SpecialConditions);

export const createRelationshipEvent = createDocument(RelationshipEvent);
export const getRelationshipEvents = getDocuments(RelationshipEvent);
export const getRelationshipEventById = getDocumentById(RelationshipEvent);
export const updateRelationshipEvent = updateDocument(RelationshipEvent);
export const deleteRelationshipEvent = deleteDocument(RelationshipEvent);

export const createCharacterRelationship = createDocument(CharacterRelationship);
export const getCharacterRelationships = getDocuments(CharacterRelationship);
export const getCharacterRelationshipById = getDocumentById(CharacterRelationship);
export const updateCharacterRelationship = updateDocument(CharacterRelationship);
export const deleteCharacterRelationship = deleteDocument(CharacterRelationship);