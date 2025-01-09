// Imports (replace `llm` and `console` with the appropriate implementations in your project)

// Character Introduction Function
async function characterIntroduction(state) {
  /**
   * Part of the Conversation Sub-Graph.
   * Generates and displays a character's introduction to Sherlock Holmes in the murder mystery game.
   *
   * @param {Object} state - The ConversationState object containing:
   *   - messages: Array of previous conversation messages.
   *   - character: Character object with persona and details.
   *   - story_details: Object containing crime details.
   * @returns {Object} - Adds the introduction messages to the conversation history.
   */

  const { character, story_details: story } = state;

  const characterInstructions = `
    You are playing the role of a character with the below persona:
    ${character.persona}
    
    You are being interviewed by Sherlock Holmes in relation to the following crime:
    Crime details:
    - Victim: ${story.victim_name}
    - Time of death: ${story.time_of_death}
    - Location: ${story.location_found}

    Please greet and introduce yourself to Sherlock Holmes.
    Your tone should be conversational and address Sherlock Holmes directly.
    Make sure that you do not reveal your role or incriminate yourself.
  `;

  const systemMessage = {
    role: 'system',
    content: characterInstructions.trim(),
  };

  const humanMessage = {
    role: 'user',
    content: "Introduce yourself to Sherlock Holmes",
  };

  // Generate narration via LLM (replace `llm.invoke` with your LLM API call)
  const narration = await llm.invoke([systemMessage, humanMessage]);

  // Display the introduction (replace with your actual output function)
  console.log(`Character Introduction: ${narration.content}`);

  return { messages: [narration] };
}

module.exports = characterIntroduction