// Function to ask a question
async function askQuestion(state) {
  /**
   * Part of the Conversation Sub-Graph.
   * Handles the question-asking process, allowing either AI-generated Sherlock questions
   * or direct player input.
   *
   * @param {Object} state - The ConversationState object containing:
   *   - messages: Array of previous conversation messages.
   *   - character: Character object with persona and details.
   *   - story_details: Object containing crime details.
   * @returns {Object} - Adds the question asked to the conversation history.
   */

  const { character } = state;

  while (true) {
    try {
      let question = await getPlayerInput(`Ask your question to ${character.name}:`);
      return { messages: [{ role: "user", content: question }] };
    } catch (error) {
      console.error("Invalid input. Please enter a valid question.");
    }
  }
}

module.exports = { askQuestion };
