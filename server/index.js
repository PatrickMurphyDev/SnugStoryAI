const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const Ollama = require("ollama-node");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// SERVER STATE - Displayed on /ping
let isDBConnected = false;
let isAIConnected = false;
let isAIProcessing = false;

// SETUP AI Instances
const ollama = new Ollama.Ollama();
ollama.setModel("llama3");//"phi3:mini");

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

const storeMessage = async (msg, to, from) => {
  const Messages = require("./models/messageModel");
  return await Messages.create({
    message: { text: msg },
    users: [from, to],
    sender: mongoose.Types.ObjectId(process.env.AIUUID),
  });
};

const broadcastMsg = (sockets, msg, params) => {
  sockets[0].to(sockets[2]).emit(msg, params);
  sockets[1].to(sockets[3]).emit(msg, params);
};

const promptAI = async (data, sockets) => {
  var { sendUserSocket, fromUserSocket } = sockets;
  console.log("Send AI");
  ``;
  const response = await ollama.generate(data.msg);
  broadcastMsg(
    [socket, io, sendUserSocket, fromUserSocket],
    "msg-recieve",
    response.output
  );

  //persist
  const newMsg = await storeMessage(response.output, data.to, data.from);
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

    // if AI requested
    if (data.modelOption !== 0) {
      broadcastMsg(
        socketList,
        "msg-start-ai",
        data.msg
      );
      console.log("Send AI");
      isAIProcessing = true;
      const response = await ollama.generate(data.msg);
      broadcastMsg(
        socketList,
        "msg-recieve-ai",
        response.output
      );
      const newMsg = await storeMessage(response.output, data.to, data.from);
    }
  });
});
