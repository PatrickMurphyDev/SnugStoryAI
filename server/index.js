const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const Ollama = require("ollama-node");
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

// SERVER STATE - Displayed on /ping
let isDBConnected = false;
let isAIConnected = false;
let isAIProcessing = false;
let promptCount = 0;

// SETUP AI Instances
const ollama = new Ollama.Ollama();
ollama.setModel("rp"); //"phi3:mini");

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

const storeMessage = async (msg, to, from, selfSent) => {
  const Messages = require("./models/messageModel");
  return await Messages.create({
    message: { text: msg },
    users: [from, to],
    sender: selfSent ? from : mongoose.Types.ObjectId(process.env.AIUUID),
  });
};

const broadcastMsg = (sockets, msg, params) => {
  sockets[0].to(sockets[2]).emit(msg, params);
  sockets[1].to(sockets[3]).emit(msg, params);
};

// TODO: Implement the PromptAI function
const promptAI = async (data, sockets) => {
  var { sendUserSocket, fromUserSocket } = sockets;
  console.log("Send AI");

  const response = await ollama.generate(data.msg);
  broadcastMsg(
    [socket, io, sendUserSocket, fromUserSocket],
    "msg-recieve",
    response.output
  );

  //persist
  const newMsg = await storeMessage(response.output, data.to, data.from, true);
  return newMsg;
};

const io = socket(server, {
  cors: {
    origin: "*", //"http://localhost:3005",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", async (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", async (data) => {
    console.log(data);
    const sendUserSocket = onlineUsers.get(data.to);
    const fromUserSocket = onlineUsers.get(data.from);
    const socketList = [socket, io, sendUserSocket, fromUserSocket];
    if (sendUserSocket) {
      console.log("sendUseSocket msg-recieve conditional?");
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }

    const newMsg = await storeMessage(data.msg, data.to, data.from, true);

    // if AI requested
    if (data.llmodel !== 0) {
      let dataPrefix = [];
      if (promptCount <= 0) {
        // initial setting
        dataPrefix = [
          {
            name: "Jane Davis",
            gender: "Female",
            age: 59,
            appearance: {
              height: "tall",
              bodyType: "heavy",
              hairColor: "red",
              eyeColor: "hazel",
              clothingStyle: "goth",
            },
            personalityTraits: ["friendly", "shy"],
            backstory: "a traveler passing through town",
          },
          {
            name: "Michael Smith",
            gender: "Male",
            age: 38,
            appearance: {
              height: "tall",
              bodyType: "slim",
              hairColor: "red",
              eyeColor: "blue",
              clothingStyle: "athleisure",
            },
            personalityTraits: ["friendly", "shy"],
            backstory: "a regular who knows everyone",
          },
        ];
      }

      promptCount++;
      broadcastMsg(socketList, "msg-start-ai", data.msg);

      console.log("Send AI");
      isAIProcessing = true;

      let sendMsg = data.msg;
      if (dataPrefix.length > 0) {
        sendMsg = JSON.stringify(dataPrefix) + "   User Prompt: " + data.msg;
      }

      const response = await ollama.generate(sendMsg);

      broadcastMsg(socketList, "msg-recieve-ai", response.output);

      console.log("Store Data");
      const newMsg = await storeMessage(
        response.output,
        data.to,
        data.from,
        false
      );
      return newMsg;
    }
  });
});
