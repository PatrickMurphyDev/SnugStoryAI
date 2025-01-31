const ConversationManager = require('../controllers/ConversationManager');

describe('ConversationManager', () => {
  let conversationManager;

  beforeEach(() => {
    conversationManager = new ConversationManager();
  });

  test('addConversation should add a new conversation and return its id', () => {
    const conversation = { topic: 'Test Topic' };
    const participants = ['NPC1', 'NPC2'];
    const id = conversationManager.addConversation(conversation, participants);

    expect(id).toBe(0);
    expect(conversationManager.ConversationHistory.length).toBe(1);
    expect(conversationManager.ConversationHistoryParticipantsMap.get(0)).toEqual(participants);
  });

  test('getCurrentConversation should return null initially', () => {
    expect(conversationManager.getCurrentConversation()).toBeNull();
  });

  test('setCurrentConversation should set the current conversation', () => {
    const conversation = { topic: 'Test Topic' };
    const participants = ['NPC1', 'NPC2'];
    const id = conversationManager.addConversation(conversation, participants);

    conversationManager.setCurrentConversation(id);
    expect(conversationManager.getCurrentConversation()).toEqual(expect.objectContaining(conversation));
  });

  test('addMessageToConversation should add a message to the specified conversation', () => {
    const conversation = { topic: 'Test Topic' };
    const participants = ['NPC1', 'NPC2'];
    const id = conversationManager.addConversation(conversation, participants);

    const message = { text: 'Hello', sender: 'NPC1' };
    conversationManager.addMessageToConversation(id, message);

    const updatedConversation = conversationManager.getConversationByIndex(id);
    expect(updatedConversation.messages.length).toBe(1);
    expect(updatedConversation.messages[0]).toEqual(expect.objectContaining(message));
  });

  test('getPastConversations should return filtered conversations', () => {
    conversationManager.addConversation({ topic: 'Topic 1' }, ['NPC1', 'NPC2']);
    conversationManager.addConversation({ topic: 'Topic 2' }, ['NPC2', 'NPC3']);
    conversationManager.addConversation({ topic: 'Topic 3' }, ['NPC1', 'NPC3']);

    const pastConversations = conversationManager.getPastConversations(['NPC1']);
    expect(pastConversations.length).toBe(2);
    expect(pastConversations[0].topic).toBe('Topic 1');
    expect(pastConversations[1].topic).toBe('Topic 3');
  });

  test('removeConversation should remove the specified conversation', () => {
    const id = conversationManager.addConversation({ topic: 'To be removed' }, ['NPC1']);
    expect(conversationManager.ConversationHistory.length).toBe(1);

    const result = conversationManager.removeConversation(id);
    expect(result).toBe(true);
    expect(conversationManager.ConversationHistory.length).toBe(0);
  });

  test('searchConversationsByKeywords should return conversations containing the keywords', () => {
    conversationManager.addConversation({ messages: [{ text: 'I love apples', sender: 'NPC1' }] }, ['NPC1']);
    const id = conversationManager.addConversation({ messages: [{ text: 'I love bananas', sender: 'NPC2' }] }, ['NPC2']);
    conversationManager.addMessageToConversation(id, { text: 'I love banana', sender: 'NPC2' });

    const result = conversationManager.searchConversationsByKeywords(['banana']);
    expect(result.length).toBe(1); 
    console.log(result);
    expect(result[0].id).toBe(1);
  });

  test('getConversationMessages should return paginated messages', () => {
    const id = conversationManager.addConversation({ topic: 'Pagination Test' }, ['NPC1']);
    for (let i = 0; i < 25; i++) {
      conversationManager.addMessageToConversation(id, { text: `Message ${i}`, sender: 'NPC1' });
    }

    const messages = conversationManager.getConversationMessages(id, 2, 10);
    expect(messages.length).toBe(10);
    expect(messages[0].text).toBe('Message 14');
    expect(messages[9].text).toBe('Message 5');
  });

  test('getParticipantCount should return the correct number of participants', () => {
    const id = conversationManager.addConversation({ topic: 'Participant Count Test' }, ['NPC1', 'NPC2', 'NPC3']);
    expect(conversationManager.getParticipantCount(id)).toBe(3);
  });
});