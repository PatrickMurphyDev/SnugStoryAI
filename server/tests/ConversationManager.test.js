const ConversationManager = require("../controllers/ConversationManager");

describe("ConversationManager", () => {
  let conversationManager;

  beforeEach(() => {
    conversationManager = new ConversationManager();
  });

  test("getCurrentConversation should return null initially", () => {
    expect(conversationManager.getCurrentConversation()).toBeNull();
  });

  test("addConversation should add a new conversation and return its id", () => {
    const participants = [
      "000000000000000000000001",
      "000000000000000000000002",
    ];
    const conversation = {
      island_id: "66dc506deaae235d2dbe4a3a",
      topic: "Test Topic",
      participants: participants,
      messages: [],
    };
    const id = conversationManager.addConversation(conversation, participants);

    //expect(id).toBe(0);
    expect(id).not.toBeNull();
    //expect(conversationManager.ConversationHistory.length).toBe(1);
  });


/*
  test("addMessageToConversation should add a message to the specified conversation", () => {
    const participants = [
      "000000000000000000000001",
      "000000000000000000000002",
    ];
    const conversation = {
      island_id: "66dc506deaae235d2dbe4a3a",
      topic: "Test Topic",
      participants: participants,
      messages: [],
    };
    const id = conversationManager.addConversation(conversation, participants);

    const message = { content: "Hello", sender: "000000000000000000000001" };
    conversationManager.addMessageToConversation(id, message);

   /*  const updatedConversation = conversationManager.getConversationByIndex(id);
    expect(updatedConversation.messages.length).toBe(1);
    expect(updatedConversation.messages[0]).toEqual(
      expect.objectContaining(message)
    ); 
  });*/
});
/*
  test("setCurrentConversation should set the current conversation", () => {
    const conversation = {
      island_id: "66dc506deaae235d2dbe4a3a",
      topic: "Test Topic",
    };
    const participants = [
      "000000000000000000000001",
      "000000000000000000000002",
    ];
    const id = conversationManager.addConversation(conversation, participants);

    conversationManager.setCurrentConversation(id);
    expect(conversationManager.getCurrentConversation()).toEqual(
      expect.objectContaining(conversation)
    );
  });
 */
/*
  test("getPastConversations should return filtered conversations", () => {
    conversationManager.addConversation(
      { island_id: "66dc506deaae235d2dbe4a3a", topic: "Topic 1" },
      ["000000000000000000000001", "000000000000000000000002"]
    );
    conversationManager.addConversation(
      { island_id: "66dc506deaae235d2dbe4a3a", topic: "Topic 2" },
      ["000000000000000000000002", "000000000000000000000003"]
    );
    conversationManager.addConversation(
      { island_id: "66dc506deaae235d2dbe4a3a", topic: "Topic 3" },
      ["000000000000000000000001", "000000000000000000000003"]
    );

    const pastConversations = conversationManager.getPastConversations([
      "000000000000000000000001",
    ]);
    expect(pastConversations.length).toBe(2);
    expect(pastConversations[0].topic).toBe("Topic 1");
    expect(pastConversations[1].topic).toBe("Topic 3");
  });

  test("removeConversation should remove the specified conversation", () => {
    const id = conversationManager.addConversation(
      { island_id: "66dc506deaae235d2dbe4a3a", topic: "To be removed" },
      ["000000000000000000000001"]
    );
    expect(conversationManager.ConversationHistory.length).toBe(1);

    const result = conversationManager.removeConversation(id);
    expect(result).toBe(true);
    expect(conversationManager.ConversationHistory.length).toBe(0);
  });

  test("searchConversationsByKeywords should return conversations containing the keywords", () => {
    conversationManager.addConversation(
      {
        island_id: "66dc506deaae235d2dbe4a3a",
        messages: [
          { content: "I love apples", sender: "000000000000000000000001" },
        ],
      },
      ["000000000000000000000001"]
    );
    const id = conversationManager.addConversation(
      {
        messages: [
          { content: "I love bananas", sender: "000000000000000000000002" },
        ],
      },
      ["000000000000000000000002"]
    );
    conversationManager.addMessageToConversation(id, {
      content: "I love banana",
      sender: "000000000000000000000002",
    });

    const result = conversationManager.searchConversationsByKeywords([
      "banana",
    ]);
    expect(result.length).toBe(1);
    console.log(result);
    expect(result[0].id).toBe(1);
  });

  test("getConversationMessages should return paginated messages", () => {
    const id = conversationManager.addConversation(
      { island_id: "66dc506deaae235d2dbe4a3a", topic: "Pagination Test" },
      ["000000000000000000000001"]
    );
    for (let i = 0; i < 25; i++) {
      conversationManager.addMessageToConversation(id, {
        content: `Message ${i}`,
        sender: "000000000000000000000001",
      });
    }

    const messages = conversationManager.getConversationMessages(id, 2, 10);
    expect(messages.length).toBe(10);
    expect(messages[0].text).toBe("Message 14");
    expect(messages[9].text).toBe("Message 5");
  });

  test("getParticipantCount should return the correct number of participants", () => {
    const id = conversationManager.addConversation(
      { island_id: "66dc506deaae235d2dbe4a3a" },
      [
        "000000000000000000000001",
        "000000000000000000000002",
        "000000000000000000000003",
      ]
    );
    expect(conversationManager.getParticipantCount(id)).toBe(3);
  });*/