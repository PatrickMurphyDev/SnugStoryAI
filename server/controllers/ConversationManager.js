class ConversationManager {
  constructor() {
    this.ConversationHistory = [];
    this.ConversationHistoryParticipantsMap = new Map();
  }

  addConversation(conversation, participants) {
    const conversationId = this.ConversationHistory.length;
    this.ConversationHistory.push({
      ...conversation,
      id: conversationId,
      creationTime: Date.now()
    });
    this.ConversationHistoryParticipantsMap.set(conversationId, participants);
    return conversationId;
  }

  getPastConversations(npcKeys, limit = Infinity, exclusive = false) {
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
      .slice(0, limit);
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
}

module.exports = ConversationManager;
