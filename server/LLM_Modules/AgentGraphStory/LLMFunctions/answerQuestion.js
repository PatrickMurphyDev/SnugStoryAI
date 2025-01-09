// Function to generate an answer to the question

async function answerQuestion(state) {
  /**
   * Part of the Conversation Sub-Graph.
   * Generates a character's response to a question during the investigation.
   *
   * @param {Object} state - The ConversationState object containing:
   *   - messages: Array of previous conversation messages.
   *   - character: Character object with persona and details.
   *   - story_details: Object containing crime details.
   * @returns {Object} - Adds the response from the character to the conversation history.
   */
  const { messages, character, story_details: story } = state;
  const lastMessage = messages[messages.length - 1];

  const answerInstructions = `
    You are playing the role of a character with the below persona:
    ${character.persona}
    
    You are being interviewed by Sherlock Holmes in relation to the following crime:
    Crime Scene Details:
      Victim: ${story.victim_name}
      Time: ${story.time_of_death}
      Location: ${story.location_found}
      Weapon: ${story.murder_weapon}
      Cause of Death: ${story.cause_of_death}

    Scene Description:
    ${story.crime_scene_details}

    All Characters and their relationships:
    ${story.npc_brief}

    Based on the message history, answer the question as the character would, considering:
    1. Your character's personality and background.
    2. Your knowledge of the crime.
    3. Your relationships with other characters.
    4. Your potential motives or alibis.

    Important:
    - Stay in character.
    - Only reveal information this character would know.
    - Maintain consistency with the story details.
    - You can lie if your character would have a reason to do so.

    Question to answer:
    ${lastMessage.content}
  `.trim();

  const prompt = {
    role: "system",
    content: answerInstructions,
  };

  const chain = ChatPromptTemplate.fromMessages([
    prompt,
    { role: "user", content: "Generate a response to the question." },
  ]);

  // Generate the answer via LLM (replace with your API call)
  const answer = await chain.invoke(messages);

  // Display the character's answer (replace with your actual output function)
  console.log(`Character's Answer: ${answer.content}`);

  return { messages: [{ role: "assistant", content: answer.content }] };
}

module.exports = { answerQuestion };