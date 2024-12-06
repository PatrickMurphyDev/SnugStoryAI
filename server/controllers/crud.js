const {
    Area,
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
    CharacterAttributeField
  } = require('../models/models');

  const {Island} = require('../models/IslandModel');

  const {
    Character,
    CharacterDetails,
    CharacterTrait,
    Trait,
    CharacterPersonality} = require('../models/CharacterModel');

    const mongoose = require('mongoose');
  
  // Generic CRUD operation functions
  const createDocument = (Model) => async (req, res) => {
    try {
      const document = new Model(req.body);
      await document.save();
      res.status(201).send(document);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
  
  const getDocuments = (Model, filter) => async (req, res) => {
    try {
      let documents = false;
      if(filter){
        documents = await Model.find(filter);
      } else { 
        documents = await Model.find();
      }
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

  const getDocumentByCharacterId = (Model) => async (req, res) => {
    try {
      const vrID = mongoose.Types.ObjectId(req.params.id);
      console.log(req.params.id, vrID);
      const document = await Model.find({"character_id": {"$oid":req.params.id}});
      if (!document) {
        return res.status(404).send();
      }
      res.send(document);
    } catch (error) {
      res.status(500).send(error);
    }
  }; 

  const getDocumentWhere = (Model, where = {}) => async (req, res) => {
    try {
      let m = await Model.findOne(req.params);
      if(m){
        res.send(m);
      }else{
        res.send({'error':"no-data"});
      }
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
    getIslandsByUserId: getDocumentById(Island),
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
    
    createCharacterDetails: createDocument(CharacterDetails),
    getCharacterDetails: getDocuments(CharacterDetails),
    getCharacterDetailsById: getDocumentById(CharacterDetails),
    updateCharacterDetails: updateDocument(CharacterDetails),
    deleteCharacterDetails: deleteDocument(CharacterDetails),
    
    createCharacterPersonality: createDocument(CharacterPersonality),
    getCharacterPersonality: getDocuments(CharacterPersonality),
    getCharacterPersonalityById: getDocumentById(CharacterPersonality),
    updateCharacterPersonality: updateDocument(CharacterPersonality),
    deleteCharacterPersonality: deleteDocument(CharacterPersonality),
  
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

    getCharacterAttributeField: getDocumentWhere(CharacterAttributeField), // default uses req.params
  };
  