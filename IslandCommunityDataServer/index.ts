import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {
  createIsland,
  getIslands,
  getIslandById,
  updateIsland,
  deleteIsland,
  createArea,
  getAreas,
  getAreaById,
  updateArea,
  deleteArea,
  createIslandPropertyLot,
  getIslandPropertyLots,
  getIslandPropertyLotById,
  updateIslandPropertyLot,
  deleteIslandPropertyLot,
  createBuilding,
  getBuildings,
  getBuildingById,
  updateBuilding,
  deleteBuilding,
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  createJobPosition,
  getJobPositions,
  getJobPositionById,
  updateJobPosition,
  deleteJobPosition,
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  createPhysicalTraits,
  getPhysicalTraits,
  getPhysicalTraitsById,
  updatePhysicalTraits,
  deletePhysicalTraits,
  createSkills,
  getSkills,
  getSkillsById,
  updateSkills,
  deleteSkills,
  createPsychologicalTraits,
  getPsychologicalTraits,
  getPsychologicalTraitsById,
  updatePsychologicalTraits,
  deletePsychologicalTraits,
  createSocialTraits,
  getSocialTraits,
  getSocialTraitsById,
  updateSocialTraits,
  deleteSocialTraits,
  createResources,
  getResources,
  getResourcesById,
  updateResources,
  deleteResources,
  createLocation,
  getLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
  createBehavioralPatterns,
  getBehavioralPatterns,
  getBehavioralPatternsById,
  updateBehavioralPatterns,
  deleteBehavioralPatterns,
  createSpecialConditions,
  getSpecialConditions,
  getSpecialConditionsById,
  updateSpecialConditions,
  deleteSpecialConditions,
  createRelationshipEvent,
  getRelationshipEvents,
  getRelationshipEventById,
  updateRelationshipEvent,
  deleteRelationshipEvent,
  createCharacterRelationship,
  getCharacterRelationships,
  getCharacterRelationshipById,
  updateCharacterRelationship,
  deleteCharacterRelationship,
} from './crud';

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/island_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// REST API endpoints for Island
app.post('/islands', createIsland);
app.get('/islands', getIslands);
app.get('/islands/:id', getIslandById);
app.put('/islands/:id', updateIsland);
app.delete('/islands/:id', deleteIsland);

// REST API endpoints for Area
app.post('/areas', createArea);
app.get('/areas', getAreas);
app.get('/areas/:id', getAreaById);
app.put('/areas/:id', updateArea);
app.delete('/areas/:id', deleteArea);

// REST API endpoints for IslandPropertyLot
app.post('/islandpropertylots', createIslandPropertyLot);
app.get('/islandpropertylots', getIslandPropertyLots);
app.get('/islandpropertylots/:id', getIslandPropertyLotById);
app.put('/islandpropertylots/:id', updateIslandPropertyLot);
app.delete('/islandpropertylots/:id', deleteIslandPropertyLot);

// REST API endpoints for Building
app.post('/buildings', createBuilding);
app.get('/buildings', getBuildings);
app.get('/buildings/:id', getBuildingById);
app.put('/buildings/:id', updateBuilding);
app.delete('/buildings/:id', deleteBuilding);

// REST API endpoints for Organization
app.post('/organizations', createOrganization);
app.get('/organizations', getOrganizations);
app.get('/organizations/:id', getOrganizationById);
app.put('/organizations/:id', updateOrganization);
app.delete('/organizations/:id', deleteOrganization);

// REST API endpoints for JobPosition
app.post('/jobpositions', createJobPosition);
app.get('/jobpositions', getJobPositions);
app.get('/jobpositions/:id', getJobPositionById);
app.put('/jobpositions/:id', updateJobPosition);
app.delete('/jobpositions/:id', deleteJobPosition);

// REST API endpoints for Character
app.post('/characters', createCharacter);
app.get('/characters', getCharacters);
app.get('/characters/:id', getCharacterById);
app.put('/characters/:id', updateCharacter);
app.delete('/characters/:id', deleteCharacter);

// REST API endpoints for PhysicalTraits
app.post('/physicaltraits', createPhysicalTraits);
app.get('/physicaltraits', getPhysicalTraits);
app.get('/physicaltraits/:id', getPhysicalTraitsById);
app.put('/physicaltraits/:id', updatePhysicalTraits);
app.delete('/physicaltraits/:id', deletePhysicalTraits);

// REST API endpoints for Skills
app.post('/skills', createSkills);
app.get('/skills', getSkills);
app.get('/skills/:id', getSkillsById);
app.put('/skills/:id', updateSkills);
app.delete('/skills/:id', deleteSkills);

// REST API endpoints for PsychologicalTraits
app.post('/psychologicaltraits', createPsychologicalTraits);
app.get('/psychologicaltraits', getPsychologicalTraits);
app.get('/psychologicaltraits/:id', getPsychologicalTraitsById);
app.put('/psychologicaltraits/:id', updatePsychologicalTraits);
app.delete('/psychologicaltraits/:id', deletePsychologicalTraits);

// REST API endpoints for SocialTraits
app.post('/socialtraits', createSocialTraits);
app.get('/socialtraits', getSocialTraits);
app.get('/socialtraits/:id', getSocialTraitsById);
app.put('/socialtraits/:id', updateSocialTraits);
app.delete('/socialtraits/:id', deleteSocialTraits);

// REST API endpoints for Resources
app.post('/resources', createResources);
app.get('/resources', getResources);
app.get('/resources/:id', getResourcesById);
app.put('/resources/:id', updateResources);
app.delete('/resources/:id', deleteResources);

// REST API endpoints for Location
app.post('/location', createLocation);
app.get('/location', getLocation);
app.get('/location/:id', getLocationById);
app.put('/location/:id', updateLocation);
app.delete('/location/:id', deleteLocation);

// REST API endpoints for BehavioralPatterns
app.post('/behavioralpatterns', createBehavioralPatterns);
app.get('/behavioralpatterns', getBehavioralPatterns);
app.get('/behavioralpatterns/:id', getBehavioralPatternsById);
app.put('/behavioralpatterns/:id', updateBehavioralPatterns);
app.delete('/behavioralpatterns/:id', deleteBehavioralPatterns);

// REST API endpoints for SpecialConditions
app.post('/specialconditions', createSpecialConditions);
app.get('/specialconditions', getSpecialConditions);
app.get('/specialconditions/:id', getSpecialConditionsById);
app.put('/specialconditions/:id', updateSpecialConditions);
app.delete('/specialconditions/:id', deleteSpecialConditions);

// REST API endpoints for RelationshipEvent
app.post('/relationshipevents', createRelationshipEvent);
app.get('/relationshipevents', getRelationshipEvents);
app.get('/relationshipevents/:id', getRelationshipEventById);
app.put('/relationshipevents/:id', updateRelationshipEvent);
app.delete('/relationshipevents/:id', deleteRelationshipEvent);

// REST API endpoints for CharacterRelationship
app.post('/characterrelationships', createCharacterRelationship);
app.get('/characterrelationships', getCharacterRelationships);
app.get('/characterrelationships/:id', getCharacterRelationshipById);
app.put('/characterrelationships/:id', updateCharacterRelationship);
app.delete('/characterrelationships/:id', deleteCharacterRelationship);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
