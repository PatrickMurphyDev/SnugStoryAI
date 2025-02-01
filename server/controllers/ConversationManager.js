const ConversationModel = require('../models/v3/Interaction/ConversationModel');

class ConversationManager {
  constructor() {
    this.ConversationHistory = [];
    this.ConversationHistoryParticipantsMap = new Map();
    this.currentConversation = null;
  }
  getPastConversations(npcKeys, convoReturnLimit = Infinity, exclusive = false, convoMsgReturnLimit = Infinity) {
    const npcSet = new Set(npcKeys);
    const filteredConversations = this.ConversationHistory.filter(conversation => {
      const participants = this.ConversationHistoryParticipantsMap.get(conversation.id);
      if (exclusive) {
        return npcSet.size === participants.length && participants.every(npc => npcSet.has(npc));
      } else {
        return participants.some(npc => npcSet.has(npc));
      }
    });

    return filteredConversations
      .sort((a, b) => b.creationTime - a.creationTime)
      .slice(0, convoReturnLimit)
      .map(conversation => ({
        ...conversation,
        messages: conversation.messages.slice(-convoMsgReturnLimit)
      }));
  }


  addConversation(conversation, participants) {
    const conversationId = this.ConversationHistory.length;
    const newConversation = {
      ...conversation,
      index: conversationId,
      messages: conversation.messages || []
    };

    this.ConversationHistory.push(newConversation);
    this.ConversationHistoryParticipantsMap.set(conversationId, participants);
    ConversationModel.create(newConversation);
    //console.log(`Added new conversation: ${conversationId}`);
    return conversationId;
  }

  getCurrentConversation() {
    return this.currentConversation;
  }

  setCurrentConversation(conversationId) {
    this.currentConversation = this.getConversationByIndex(conversationId);
  }

  addMessageToConversation(conversationId, message) {
    const conversation = this.getConversationByIndex(conversationId);
    if (conversation) {
      conversation.messages.push({
        ...message,
        timestamp: Date.now()
      });
    }
  }
  getConversationByIndex(index) {
    if (index >= 0 && index < this.ConversationHistory.length) {
      return this.ConversationHistory[index];
    }
    return null;
  }

  getConversationIndexesInvolving(npcKeys) {
    const npcSet = new Set(npcKeys);
    return this.ConversationHistory.reduce((indexes, conversation, index) => {
      const participants = this.ConversationHistoryParticipantsMap.get(conversation.id);
      if (participants.some(npc => npcSet.has(npc))) {
        indexes.push(index);
      }
      return indexes;
    }, []);
  }

  removeConversation(conversationId) {
    const index = this.ConversationHistory.findIndex(c => c.id === conversationId);
    if (index !== -1) {
      this.ConversationHistory.splice(index, 1);
      this.ConversationHistoryParticipantsMap.delete(conversationId);
      return true;
    }
    return false;
  }

  searchConversationsByKeywords(keywords) {
    const keywordSet = new Set(keywords.map(k => k.toLowerCase()));
    return this.ConversationHistory.filter(conversation =>
      conversation.messages.some(message =>
        message.text.toLowerCase().split(' ').some(word => keywordSet.has(word))
      )
    );
  }

  getConversationMessages(conversationId, page = 1, pageSize = 20) {
    const conversation = this.getConversationByIndex(conversationId);
    if (!conversation) return [];

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return conversation.messages
      .slice()
      .reverse()
      .slice(startIndex, endIndex);
  }

  getParticipantCount(conversationId) {
    const participants = this.ConversationHistoryParticipantsMap.get(conversationId);
    return participants ? participants.length : 0;
  }
}

module.exports = ConversationManager;

