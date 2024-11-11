const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const Ollama = require("ollama-node");
const IslandTemplate = require("./IslandTemplateServer");
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
  createSavedGame,
  getSavedGameById,
  getSavedGames,
  updateSavedGame,
  deleteSavedGame
} = require("./controllers/crud");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.options("*", cors());

app.get("/api/characterattributefield/:aid", getCharacterAttributeField);

// REST API endpoints for Island
app.post("/api/islands", createIsland);
app.get("/api/islands", getIslands);
app.get("/api/islands/user/:id", getIslandsByUserId);
app.get("/api/islands/:id", getIslandById);
app.put("/api/islands/:id", updateIsland);
app.delete("/api/islands/:id", deleteIsland);

// REST API endpoints for Area
app.post("/api/areas", createArea);
app.get("/api/areas", getAreas);
app.get("/api/areas/:id", getAreaById);
app.put("/api/areas/:id", updateArea);
app.delete("/api/areas/:id", deleteArea);

// REST API endpoints for IslandPropertyLot
app.post("/api/islandpropertylots", createIslandPropertyLot);
app.get("/api/islandpropertylots", getIslandPropertyLots);
app.get("/api/islandpropertylots/:id", getIslandPropertyLotById);
app.put("/api/islandpropertylots/:id", updateIslandPropertyLot);
app.delete("/api/islandpropertylots/:id", deleteIslandPropertyLot);

// REST API endpoints for Building
app.post("/api/buildings", createBuilding);
app.get("/api/buildings", getBuildings);
app.get("/api/buildings/:id", getBuildingById);
app.put("/api/buildings/:id", updateBuilding);
app.delete("/api/buildings/:id", deleteBuilding);

// REST API endpoints for Organization
app.post("/api/organizations", createOrganization);
app.get("/api/organizations", getOrganizations);
app.get("/api/organizations/:id", getOrganizationById);
app.put("/api/organizations/:id", updateOrganization);
app.delete("/api/organizations/:id", deleteOrganization);

// REST API endpoints for JobPosition
app.post("/api/jobpositions", createJobPosition);
app.get("/api/jobpositions", getJobPositions);
app.get("/api/jobpositions/:id", getJobPositionById);
app.put("/api/jobpositions/:id", updateJobPosition);
app.delete("/api/jobpositions/:id", deleteJobPosition);

// REST API endpoints for Character
app.post("/api/characters", createCharacter);
app.get("/api/characters", getCharacters);
app.get("/api/characters/:id", getCharacterById);
app.put("/api/characters/:id", updateCharacter);
app.delete("/api/characters/:id", deleteCharacter);

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


// REST API endpoints for SaveGame
app.post("/api/savedgame", createSavedGame);
app.get("/api/savedgame", getSavedGames);
app.get("/api/savedgame/:id", getSavedGameById);
app.put("/api/savedgame/:id", updateSavedGame);
app.delete("/api/savedgame/:id", deleteSavedGame);

// SERVER STATE - Displayed on /ping
let isDBConnected = false;
let isAIConnected = false;
let isAIProcessing = false;
let lastToChar = -1;
let promptCount = 0;

// SETUP AI Instances
const ollama = new Ollama.Ollama();
ollama.setModel("llama3"); //"phi3:mini" "rp");"llama3"

const getPresentCharactersData = function(NPCIDs){
  return [IslandTemplate.summarizeResident(IslandTemplate.Residents[parseInt(NPCIDs[0])]), IslandTemplate.summarizeResident(IslandTemplate.Residents[parseInt(NPCIDs[1])])];
}

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

// Ping Page Route
// == Display Server State
app.get("/ping", (_req, res) => {
  return res.json({
    msg:
      "Ping Successful ||  DB Connected: " +
      isDBConnected +
      " ||  AI Connected: " +
      isAIConnected +
      " ||  AI Status: " +
      (isAIProcessing ? "Processing..." : "Ready."),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(5006, () =>
  console.log(`Server started on 5006`)
);

// initialize socket server
const io = socket(server, {
  cors: {
    origin: "*", //"http://localhost:3005",
    credentials: true,
  },
});

const storeSavedGame = async (userid,name,usrLoc,simTimeData) => {
  const {SavedGame} = require("./models/models");
  //return await SavedGame.create({
  //  savedUser
  //});
};

const storeMessage = async (msg, to, from, selfSent) => {
  const Messages = require("./models/messageModel");
  return await Messages.create({
    message: { text: msg },
    users: [from, to],
    sender: from,
  });
};

const broadcastMsg = (sockets, msg, params) => {
  sockets[0].to(sockets[2]).emit(msg, params);
  sockets[1].to(sockets[3]).emit(msg, params);
};

function buildAIPromptTXT(data,dataPrefix,convoHistory) {
  let sendMsg = "";
  if (dataPrefix.length > 0) {
    sendMsg += "#You are required to roleplay as the character " + dataPrefix[0].name
    sendMsg += ", do not announce who you are role playing as.";
    sendMsg += "using the following character data: ";
    sendMsg += JSON.stringify(dataPrefix);
    sendMsg += "# It is "+data.timeOfDay+". ";
  }
  sendMsg += " #Limit your response to 2 sentences or less.# ";
  sendMsg += "Ellie: " + data.msg;
  
  return sendMsg;
};

// TODO: Implement the PromptAI function
const promptAI = async (data, socketList, convoHistory) => { 
  console.log("Send AI");
  let dataPrefix = [];
  if(lastToChar !== data.to) {
    lastToChar = data.to;
    promptCount = 0;
  }
  if (promptCount <= 0) {
    dataPrefix = getPresentCharactersData([data.to,data.from]); // initial setting
  }
  
  promptCount++;
  // start ai processing
  broadcastMsg(socketList, "msg-start-ai", data.msg);
  isAIProcessing = true;

  let sendMsg = buildAIPromptTXT(data, dataPrefix, convoHistory);
  const response = await ollama.generate(sendMsg);

  broadcastMsg(socketList, "msg-recieve-ai", response.output);
  isAIProcessing = false;

  console.log("Store Data:  " + response.output);
  const newMsg = await storeMessage(
    response.output,
    data.to,
    data.from,
    false
  );
  return newMsg;
};

const socketAddUser = (userId, socketID) => {
  global.onlineUsers.set(userId, socketID);
};

io.on("connection", async (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userID)=>{return socketAddUser(userID, socket.id);});

  socket.on("send-msg", async (data) => {
    console.log(data);
    const convoHistory = data[1] || [];
    data = data[0];
    const sendUserSocket = global.onlineUsers.get(data.to);
    const fromUserSocket = global.onlineUsers.get(data.from);
    const socketList = [socket, io, sendUserSocket, fromUserSocket];

    if (sendUserSocket) {
      console.log("sendUseSocket msg-recieve conditional - if send to user is online");
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }

    // save persistant store msg sent by user
    const newMsg = await storeMessage(data.msg, data.to, data.from, true);

    // if AI requested
    if (data.llmodel !== 0) {
      const newPrompt = await promptAI(data, socketList, convoHistory);
      return newPrompt;
    }
  });
});
