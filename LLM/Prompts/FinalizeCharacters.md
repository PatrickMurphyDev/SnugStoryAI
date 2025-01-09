```js

// Character creation function
const characterInstructions = `
You are an AI character designer tasked with creating personas for a murder mystery game.
Your goal is to develop a cast of characters that fits the given environment and creates an engaging, interactive experience for players.
...
`;

async function createCharacters(state, llm) {
    /**
     * Args:
     *  state: Object containing:
     *   - environment: Description of the game's setting
     *   - maxCharacters: Maximum number of characters to create
     *  llm: AI language model object for generating structured outputs
     *
     * Returns:
     *  Object containing a list of generated characters
     */
    const { environment, maxCharacters } = state;

    const systemMessage = characterInstructions
        .replace("{{environment}}", environment)
        .replace("{{max_characters}}", maxCharacters.toString());

    const result = await llm.invoke([
        { role: "system", content: systemMessage },
        { role: "user", content: "Generate the set of characters" }
    ]);

    return { characters: result.characters };
}
```