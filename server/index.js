const express = require("express");
const cors = require("cors");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const SocketManager = require("./controllers/sockets/SocketManager");

const global = {};
global.onlineUsers = new Map();

const {
  getCharacterAttributeField,
  createCharacterPersonality,
  getCharacterPersonality,
  getCharacterPersonalityById,
  updateCharacterPersonality,
  createIsland,
  getIslands,
  getIslandById,
  getIslandsByUserId,
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
  createCharacterTrait,
  getCharacterTraits,
  getCharacterTraitById,
  updateCharacterTrait,
  deleteCharacterTrait,
  createTrait,
  getTraits,
  getTraitById,
  updateTrait,
  deleteTrait,
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
  getCharacterDetails,
  getCharacterDetailsById,
  updateCharacterDetails,
  deleteCharacterDetails,
  createCharacterDetails,
} = require("./controllers/crud");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.options("*", cors());

//app.get("/api/characterattributefield/:aid", getCharacterAttributeField);

// REST API endpoints for Island
app.post("/api/v3/island", createIsland);
app.get("/api/v3/island", getIslands);
app.get("/api/v3/island/user/:id", getIslandsByUserId);
app.get("/api/v3/island/:id", getIslandById);
app.put("/api/v3/island/:id", updateIsland);
app.delete("/api/v3/island/:id", deleteIsland);

// REST API endpoints for Area
app.post("/api/v3/area", createArea);
app.get("/api/v3/area", getAreas);
app.get("/api/v3/area/:id", getAreaById);
app.put("/api/v3/area/:id", updateArea);
app.delete("/api/v3/area/:id", deleteArea);

// REST API endpoints for IslandPropertyLot
app.post("/api/islandpropertylots", createIslandPropertyLot);
app.get("/api/islandpropertylots", getIslandPropertyLots);
app.get("/api/islandpropertylots/:id", getIslandPropertyLotById);
app.put("/api/islandpropertylots/:id", updateIslandPropertyLot);
app.delete("/api/islandpropertylots/:id", deleteIslandPropertyLot);

// REST API endpoints for Building
app.post("/api/v3/building", createBuilding);
app.get("/api/v3/building", getBuildings);
app.get("/api/v3/building/:id", getBuildingById);
app.put("/api/v3/building/:id", updateBuilding);
app.delete("/api/v3/building/:id", deleteBuilding);

// REST API endpoints for Organization
app.post("/api/v3/organization", createOrganization);
app.get("/api/v3/organization", getOrganizations);
app.get("/api/v3/organization/:id", getOrganizationById);
app.put("/api/v3/organization/:id", updateOrganization);
app.delete("/api/v3/organization/:id", deleteOrganization);

// REST API endpoints for JobPosition
app.post("/api/v3/jobposition", createJobPosition);
app.get("/api/v3/jobposition", getJobPositions);
app.get("/api/v3/jobposition/:id", getJobPositionById);
app.put("/api/v3/jobposition/:id", updateJobPosition);
app.delete("/api/v3/jobposition/:id", deleteJobPosition);

// REST API endpoints for Character
app.post("/api/v3/character", createCharacter);
app.get("/api/v3/character", getCharacters);
app.get("/api/v3/character/:id", getCharacterById);
app.put("/api/v3/character/:id", updateCharacter);
app.delete("/api/v3/character/:id", deleteCharacter);

// REST API endpoints for CharacterDetails
app.post("/api/characterDetails", createCharacterDetails);
app.get("/api/characterDetails", getCharacterDetails);
app.get("/api/characterDetails/:id", getCharacterDetailsById);
app.put("/api/characterDetails/:id", updateCharacterDetails);
app.delete("/api/characterDetails/:id", deleteCharacterDetails);

// REST API endpoints for CharacterPersonality
app.post("/api/characterpersonality", createCharacterPersonality);
app.get("/api/characterpersonality", getCharacterPersonality);
app.get("/api/characterpersonality/:id", getCharacterPersonalityById);
app.put("/api/characterpersonality/:id", updateCharacterPersonality);

// REST API endpoints for CharacterTrait
app.post("/api/charactertraits", createCharacterTrait);
app.get("/api/charactertraits", getCharacterTraits);
app.get("/api/charactertraits/:id", getCharacterTraitById);
app.put("/api/charactertraits/:id", updateCharacterTrait);
app.delete("/api/charactertraits/:id", deleteCharacterTrait);

// REST API endpoints for Trait
app.post("/api/traits", createTrait);
app.get("/api/traits", getTraits);
app.get("/api/traits/:id", getTraitById);
app.put("/api/traits/:id", updateTrait);
app.delete("/api/traits/:id", deleteTrait);

// REST API endpoints for Resources
app.post("/api/resources", createResources);
app.get("/api/resources", getResources);
app.get("/api/resources/:id", getResourcesById);
app.put("/api/resources/:id", updateResources);
app.delete("/api/resources/:id", deleteResources);

// REST API endpoints for Location
app.post("/api/location", createLocation);
app.get("/api/location", getLocation);
app.get("/api/location/:id", getLocationById);
app.put("/api/location/:id", updateLocation);
app.delete("/api/location/:id", deleteLocation);

// REST API endpoints for BehavioralPatterns
app.post("/api/behavioralpatterns", createBehavioralPatterns);
app.get("/api/behavioralpatterns", getBehavioralPatterns);
app.get("/api/behavioralpatterns/:id", getBehavioralPatternsById);
app.put("/api/behavioralpatterns/:id", updateBehavioralPatterns);
app.delete("/api/behavioralpatterns/:id", deleteBehavioralPatterns);

// REST API endpoints for SpecialConditions
app.post("/api/specialconditions", createSpecialConditions);
app.get("/api/specialconditions", getSpecialConditions);
app.get("/api/specialconditions/:id", getSpecialConditionsById);
app.put("/api/specialconditions/:id", updateSpecialConditions);
app.delete("/api/specialconditions/:id", deleteSpecialConditions);

// REST API endpoints for RelationshipEvent
app.post("/api/relationshipevents", createRelationshipEvent);
app.get("/api/relationshipevents", getRelationshipEvents);
app.get("/api/relationshipevents/:id", getRelationshipEventById);
app.put("/api/relationshipevents/:id", updateRelationshipEvent);
app.delete("/api/relationshipevents/:id", deleteRelationshipEvent);

// REST API endpoints for CharacterRelationship
app.post("/api/characterrelationships", createCharacterRelationship);
app.get("/api/characterrelationships", getCharacterRelationships);
app.get("/api/characterrelationships/:id", getCharacterRelationshipById);
app.put("/api/characterrelationships/:id", updateCharacterRelationship);
app.delete("/api/characterrelationships/:id", deleteCharacterRelationship);

// SERVER STATE - Displayed on /ping
let isDBConnected = false;

// SETUP DB Instances
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
    isDBConnected = true;
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/messages", messageRoutes);
  

// Ping Page Route
// == Display Server State
app.get("/ping", (_req, res) => {
  return res.json({
    msg:
      "Ping Successful ||  DB Connected: " +
      isDBConnected +
      " ||  AI Connected: " +
      socketManager.isAIConnected +
      " ||  AI Status: " +
      (socketManager.isAIProcessing ? "Processing..." : "Ready."),
  });
});

const server = app.listen(5006, () => console.log(`Server started on 5006`));

// initialize socket server
const io = socket(server, {
  cors: {
    origin: "*", //"http://localhost:3005",
    credentials: true,
  },
});

// Initialize SocketManager
const socketManager = new SocketManager(io);
socketManager.init();
