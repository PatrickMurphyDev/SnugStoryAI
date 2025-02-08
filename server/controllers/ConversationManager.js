const ConversationModel = require('../models/v3/Interaction/ConversationModel');

class ConversationManager {
  constructor() {
    this.currentConversation = null;
  }

  
// Is Used in SocketManager.js
  async addConversation(conversation, participants) {
    const newConversation = new ConversationModel.Conversation({
      ...conversation,
      participants,
      messages: conversation.messages || []
    });

    const savedConversation = await newConversation.save();
    this.currentConversation = savedConversation;
    return savedConversation._id;
  }
  
  async setCurrentConversation(conversationId) {
    this.currentConversation = await ConversationModel.Conversation.findById(conversationId);
  }
  getCurrentConversation() {
    return this.currentConversation;
  }

  async getConversation(id) {
    return await ConversationModel.Conversation.findById(id);
  }

  async addMessageToConversation(conversationId, message) {
    await ConversationModel.Conversation.findByIdAndUpdate(
      this.currentConversation._id,
      { 
        $push: { 
          messages: {
            ...message,
            timestamp: Date.now()
          }
        }
      }
    );
  }
/*


  async getConversationById(id) {
    return await ConversationModel.Conversation.findById(id);
  }

  async getConversationIndexesInvolving(npcKeys) {
    const conversations = await ConversationModel.Conversation.find(
      { participants: { $in: npcKeys } },
      '_id'
    );
    return conversations.map(conv => conv._id);
  }

  /*
   async getPastConversations(npcKeys, convoReturnLimit = Infinity, exclusive = false, convoMsgReturnLimit = Infinity) {
    let query;
    if (exclusive) {
      query = { participants: { $all: npcKeys, $size: npcKeys.length } };
    } else {
      query = { participants: { $in: npcKeys } };
    }

    const conversations = await ConversationModel.Conversation
      .find(query)
      .sort({ creationTime: -1 })
      .limit(convoReturnLimit)
      .lean();

    return conversations.map(conversation => ({
      ...conversation,
      messages: conversation.messages.slice(-convoMsgReturnLimit)
    }));
  }

/*
  async removeConversation(conversationId) {
    const result = await ConversationModel.Conversation.findByIdAndDelete(conversationId);
    return !!result;
  }
/*
  async searchConversationsByKeywords(keywords) {
    const keywordRegex = keywords.map(k => new RegExp(k, 'i'));
    return await ConversationModel.Conversation.find({
      'messages.content': { $in: keywordRegex }
    });
  }

/*
  async getConversationMessages(conversationId, page = 1, pageSize = 20) {
    const conversation = await ConversationModel.Conversation.findById(conversationId);
    if (!conversation) return [];

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return conversation.messages
      .slice()
      .reverse()
      .slice(startIndex, endIndex);
  }

  async getParticipantCount(conversationId) {
    const conversation = await ConversationModel.Conversation.findById(conversationId);
    return conversation ? conversation.participants.length : 0;
  }*/
}

module.exports = ConversationManager;


