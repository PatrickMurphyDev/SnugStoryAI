// Imports (replace `llm` and `console` with the appropriate implementations in your project)
const { ChatPromptTemplate } = require('openai'); // Example for handling LLM prompts


// Sherlock Question Generation Function

async function getQuestion(state) {
  /**
   * Part of the Conversation Sub-Graph.
   * Generates an investigative question from Sherlock Holmes to ask a character.
   *
   * @param {Object} state - The ConversationState object containing:
   *   - messages: Array of previous conversation messages.
   *   - character: Character object with persona and details.
   *   - story_details: Object containing crime details.
   * @returns {string} - Generated question content from Sherlock AI assistance.
   */
  const { messages, character, story_details: story } = state;

  const conversationHistory = messages
    .map((msg) => `${msg.type}: ${msg.content}`)
    .join('\n');

  const systemMessage = `
    You are Sherlock Holmes, the renowned detective. You are interviewing ${character.name} about the murder of ${story.victim_name}.
    The murder occurred around ${story.time_of_death} at ${story.location_found}. The murder weapon was ${story.murder_weapon}, and the cause of death was ${story.cause_of_death}.

    Here's the crime scene description: ${story.crime_scene_details}
    Here are some initial clues: ${story.initial_clues}

    Here's the conversation history with ${character.name}:
    ${conversationHistory}

    Considering the above information, formulate an insightful and relevant question to ask ${character.name} to further investigate the case.
    The question should be phrased in a manner befitting Sherlock Holmes's inquisitive nature.
    Make a new line for every sentence to make it easier to read.
  `.trim();

  const prompt = {
    role: 'system',
    content: systemMessage,
  };

  const chain = ChatPromptTemplate.fromMessages([
    prompt,
    { role: 'user', content: "Generate an investigative question" },
  ]);

  // Generate the question via LLM (replace with your API call)
  const question = await chain.invoke(messages);

  console.log(`
    🔍 Asked by Sherlock AI 🤖🕵️
    ========================================
    ${question.content}
    ========================================
  `);

  return question.content;
}
