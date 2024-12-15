const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    llmodel: {type: Number, default: 0}, // 0: no ai, 1: llama3, 2: openaiGPT4, 3: UncensoredLlama2
    senderIsAI: {type: Number, default: 0},
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
