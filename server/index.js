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

//const ai = new Ollama();

const ollama = new Ollama.Ollama();

ollama.setModel("llama3");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const promptAI = async (data, sockets) => {
  var { sendUserSocket, fromUserSocket } = sockets;
  console.log("Send AI");
  const response = await ollama.generate(data.msg);
  socket.to(sendUserSocket).emit("msg-recieve", response.output);
  io.to(fromUserSocket).emit("msg-recieve", response.output);


  //persist
  const Messages = require("./models/messageModel");
  const newMsg = await Messages.create({
    message: { text: response.output },
    users: [data.from, data.to],
    sender: mongoose.Types.ObjectId("666ae36b12096f7d9718397c"),
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
      const response = await ollama.generate(data.msg);
      socket.to(sendUserSocket).emit("msg-recieve", response.output);
      io.to(fromUserSocket).emit("msg-recieve", response.output);


      //persist
      const Messages = require("./models/messageModel");
      const newMsg = await Messages.create({
        message: { text: response.output },
        users: [data.from, data.to],
        sender: mongoose.Types.ObjectId("666ae36b12096f7d9718397c"),
      });
    }
  });

});
