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


// SERVER STATE - Displayed on /ping
let isDBConnected = false;
let isAIConnected = false;
let isAIProcessing = false;

// SETUP AI Instances
const ollama = new Ollama.Ollama();
ollama.setModel("phi3:mini");//llama3");

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
  return res.json({ msg: "Ping Successful ||  DB Connected: "+isDBConnected + " ||  AI Connected: " + isAIConnected + " ||  AI Status: " + (isAIProcessing ? "Processing..." : "Ready.")});
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const promptAI = async (data, sockets) => {
  var { sendUserSocket, fromUserSocket } = sockets;
  console.log("Send AI");``
  const response = await ollama.generate(data.msg);
  socket.to(sendUserSocket).emit("msg-recieve", response.output);
  io.to(fromUserSocket).emit("msg-recieve", response.output);


  //persist
  const Messages = require("./models/messageModel");
  const newMsg = await Messages.create({
    message: { text: response.output },
    users: [data.from, data.to],
    sender: mongoose.Types.ObjectId(process.env.AIUUID),
  });
}

const io = socket(server, {
  cors: {
    origin: "*",//"http://localhost:3005",
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
    const sendUserSocket = onlineUsers.get(data.to);
    const fromUserSocket = onlineUsers.get(data.from);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }

    // if AI requested
    if (data.modelOption !== 0) {
      console.log("Send AI");
      socket.to(sendUserSocket).emit("msg-start-ai", data.msg);
      io.to(fromUserSocket).emit("msg-start-ai", data.msg);
      isAIProcessing = true;
      const response = await ollama.generate(data.msg);
      socket.to(sendUserSocket).emit("msg-recieve-ai", response.output);
      io.to(fromUserSocket).emit("msg-recieve-ai", response.output);


      //persist
      const Messages = require("./models/messageModel");
      const newMsg = await Messages.create({
        message: { text: response.output },
        users: [data.from, data.to],
        sender: mongoose.Types.ObjectId(process.env.AIUUID),
      });
      isAIProcessing = false;
      console.log('AI Response');
    }
  });

});
