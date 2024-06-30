const {
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
  } = require('../Model/models');
  
  // Generic CRUD operation functions
  const createDocument = (Model) => async (req, res) => {
    try {
      const document = new Model(req.body);
      await document.save();
      res.status(201).send(document);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  const getDocuments = (Model) => async (req, res) => {
    try {
      const documents = await Model.find();
      res.send(documents);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const getDocumentById = (Model) => async (req, res) => {
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
  
  const updateDocument = (Model) => async (req, res) => {
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
  
  const deleteDocument = (Model) => async (req, res) => {
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
  module.exports = {
    createIsland: createDocument(Island),
    getIslands: getDocuments(Island),
    getIslandById: getDocumentById(Island),
    updateIsland: updateDocument(Island),
    deleteIsland: deleteDocument(Island),
  
    createArea: createDocument(Area),
    getAreas: getDocuments(Area),
    getAreaById: getDocumentById(Area),
    updateArea: updateDocument(Area),
    deleteArea: deleteDocument(Area),
  
    createIslandPropertyLot: createDocument(IslandPropertyLot),
    getIslandPropertyLots: getDocuments(IslandPropertyLot),
    getIslandPropertyLotById: getDocumentById(IslandPropertyLot),
    updateIslandPropertyLot: updateDocument(IslandPropertyLot),
    deleteIslandPropertyLot: deleteDocument(IslandPropertyLot),
  
    createBuilding: createDocument(Building),
    getBuildings: getDocuments(Building),
    getBuildingById: getDocumentById(Building),
    updateBuilding: updateDocument(Building),
    deleteBuilding: deleteDocument(Building),
  
    createOrganization: createDocument(Organization),
    getOrganizations: getDocuments(Organization),
    getOrganizationById: getDocumentById(Organization),
    updateOrganization: updateDocument(Organization),
    deleteOrganization: deleteDocument(Organization),
  
    createJobPosition: createDocument(JobPosition),
    getJobPositions: getDocuments(JobPosition),
    getJobPositionById: getDocumentById(JobPosition),
    updateJobPosition: updateDocument(JobPosition),
    deleteJobPosition: deleteDocument(JobPosition),
  
    createCharacter: createDocument(Character),
    getCharacters: getDocuments(Character),
    getCharacterById: getDocumentById(Character),
    updateCharacter: updateDocument(Character),
    deleteCharacter: deleteDocument(Character),
    
    createCharacterDetails: createDocument(Character),
    getCharacterDetails: getDocuments(Character),
    getCharacterDetailsById: getDocumentById(Character),
    updateCharacterDetails: updateDocument(Character),
    deleteCharacterDetails: deleteDocument(Character),
  
    createCharacterTrait: createDocument(CharacterTrait),
    getCharacterTraits: getDocuments(CharacterTrait),
    getCharacterTraitById: getDocumentById(CharacterTrait),
    updateCharacterTrait: updateDocument(CharacterTrait),
    deleteCharacterTrait: deleteDocument(CharacterTrait),
  
    createTrait: createDocument(Trait),
    getTraits: getDocuments(Trait),
    getTraitById: getDocumentById(Trait),
    updateTrait: updateDocument(Trait),
    deleteTrait: deleteDocument(Trait),
  
    createResources: createDocument(Resources),
    getResources: getDocuments(Resources),
    getResourcesById: getDocumentById(Resources),
    updateResources: updateDocument(Resources),
    deleteResources: deleteDocument(Resources),
  
    createLocation: createDocument(Location),
    getLocation: getDocuments(Location),
    getLocationById: getDocumentById(Location),
    updateLocation: updateDocument(Location),
    deleteLocation: deleteDocument(Location),
  
    createBehavioralPatterns: createDocument(BehavioralPatterns),
    getBehavioralPatterns: getDocuments(BehavioralPatterns),
    getBehavioralPatternsById: getDocumentById(BehavioralPatterns),
    updateBehavioralPatterns: updateDocument(BehavioralPatterns),
    deleteBehavioralPatterns: deleteDocument(BehavioralPatterns),
  
    createSpecialConditions: createDocument(SpecialConditions),
    getSpecialConditions: getDocuments(SpecialConditions),
    getSpecialConditionsById: getDocumentById(SpecialConditions),
    updateSpecialConditions: updateDocument(SpecialConditions),
    deleteSpecialConditions: deleteDocument(SpecialConditions),
  
    createRelationshipEvent: createDocument(RelationshipEvent),
    getRelationshipEvents: getDocuments(RelationshipEvent),
    getRelationshipEventById: getDocumentById(RelationshipEvent),
    updateRelationshipEvent: updateDocument(RelationshipEvent),
    deleteRelationshipEvent: deleteDocument(RelationshipEvent),
  
    createCharacterRelationship: createDocument(CharacterRelationship),
    getCharacterRelationships: getDocuments(CharacterRelationship),
    getCharacterRelationshipById: getDocumentById(CharacterRelationship),
    updateCharacterRelationship: updateDocument(CharacterRelationship),
    deleteCharacterRelationship: deleteDocument(CharacterRelationship),
  };
  