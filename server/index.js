const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const Ollama = require("ollama-node");
const {getCharacterAttributeField, getCharacters, getCharacterById, updateCharacter, deleteCharacter, createCharacter, getIslands, getIslandById, createIsland, updateIsland, deleteIsland} = require("./controllers/crud");


app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.options('*', cors());

app.get("/api/characterattributefield/:aid", getCharacterAttributeField);

app.get("/api/characters", getCharacters);
app.get("/api/characters/:id", getCharacterById);
app.post("/api/characters", createCharacter);
app.put("/api/characters/:id", updateCharacter);
app.delete("/api/characters/:id", deleteCharacter);

app.get("/api/islands", getIslands);
app.get("/api/islands/:id", getIslandById);
app.post("/api/islands", createIsland);
app.put("/api/islands/:id", updateIsland);
app.delete("/api/islands/:id", deleteIsland);


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

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
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
    
    const newMsg = await storeMessage(
      data.msg,
      data.to,
      data.from,
      true
    );

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
          }
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
