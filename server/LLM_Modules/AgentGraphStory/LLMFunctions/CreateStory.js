
const LLMAction = require("../LLMAction");

// Story creation class
class CreateStory extends LLMAction {
    constructor() {
        super();
        this.instructions = `You are crafting the central murder mystery for our story. Using the provided environment and characters, create a compelling murder scenario.
Include specific details about the crime while maintaining mystery about the killer's identity.

Environment:
{{environment}}

Characters:
{{characters}}

Follow these guidelines when creating the murder scenario:

1. For the victim describe:
   - Where and how the body was found
   - The approximate time of death
   - The cause of death and murder weapon
   - The condition of the crime scene

2. Include crucial evidence and clues:
   - Physical evidence at the scene
   - Witness statements or last known sightings
   - Any suspicious circumstances
   - Environmental factors that might be relevant

3. Create a mix of:
   - True clues that lead to the killer
   - Red herrings that create suspense
   - Background circumstances that add depth

4. Consider:
   - The timing of the murder
   - Access to the location
   - Potential motives
   - Physical evidence
   - Witness reliability

5. For the Character Brief:
   - Mention the important points
   - DO not mention who the killer is

Important:
- DO NOT reveal or hint at the killer's identity
- Include enough detail to make the mystery solvable
- Ensure all clues are consistent with the environment and characters
- Make the scenario complex enough to be interesting but clear enough to be solvable

Format your response to provide the specific details requested in the StoryDetails schema: {victimName, timeOfDeath, locationFound, murderWeapon, causeOfDeath, crimeSceneDetails, witnesses, initialClues, npcBrief}`;
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
        const environment = state.getEnvironment();
        const characters = state.getCharacters();
        const characterList = JSON.stringify(characters);

        const systemMessage = this.instructions
            .replace("{{environment}}", environment)
            .replace("{{characters}}", characterList);

        const result = await llm.invoke([
            { role: "system", content: systemMessage },
            { role: "user", content: "Generate mystery surrounding the death of Ellie's Father" }
        ]);

        return { storyDetails: result };
    }
}

module.exports = CreateStory;