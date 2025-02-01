const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ConversationSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "Character" }],
  messages: [{
    sender: { type: Schema.Types.ObjectId, ref: "Character" },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date },
  description: { type: String, required: false}
});

const Conversation = model("Conversation", ConversationSchema);

module.exports = { Conversation };