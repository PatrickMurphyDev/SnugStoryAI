const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ConversationSchema = new Schema({
  island_id: { type: Schema.Types.ObjectId, ref: "Island", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "Character" }],
  messages: [{
    sender: { type: Schema.Types.ObjectId, ref: "Character" },
    content: { type: String},
    timestamp: { type: Date, default: Date.now }
  }],
  start_time: { type: Date, default: Date.now, immutable: true },
  end_time: { type: Date },
  charactersMentioned: [{ type: String}],
  charactersMentionedId: [{ type: Schema.Types.ObjectId, ref: "Character" }],
  topic: { type: String },
  summary: { type: String},
  keywords: [{ type: String},],
  playerDetailsList: [{ type: String},],
  npcDetailsList: [{ type: String},],
  relationsipEffect: { type: Number, default: 0 },
});

const Conversation = model("Conversation", ConversationSchema);

module.exports = { Conversation };