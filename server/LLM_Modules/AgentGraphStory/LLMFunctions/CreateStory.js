
const LLMAction = require("../LLMAction");

// Story creation class
class CreateStory extends LLMAction {
    constructor() {
        super();
        this.instructions = `
You are crafting the central murder mystery for our story. Using the provided environment and characters, create a compelling murder scenario.
...`;
    }

    async execute(state, llm) {
        /**
         * Args:
         *  state: Object containing:
         *   - environment: Description of the game's setting
         *   - characters: List of character objects
         *  llm: AI language model object for generating structured outputs
         *
         * Returns:
         *  Object containing the complete story details
         */
        const { environment, characters } = state;
        const characterList = characters.map(char => char.persona).join("\n");

        const systemMessage = this.instructions
            .replace("{{environment}}", environment)
            .replace("{{characters}}", characterList);

        const result = await llm.invoke([
            { role: "system", content: systemMessage },
            { role: "user", content: "Generate the murder mystery scenario" }
        ]);

        return { storyDetails: result };
    }
}

module.exports = CreateStory;