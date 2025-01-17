import LLMAction from "../LLMAction";

// Narrator (Dr. Watson) class
class Narrator extends LLMAction {
    constructor() {
        super();
        this.instructions = `
You are trusted assistant and friend of the legendary detective Sherlock Holmes - Dr. John Watson.
Sherlock has just arrived at the scene of the murder.`;
    }

    async execute(state, llm) {
        /**
         * Args:
         *  state: Object containing:
         *   - storyDetails: Complete information about the crime
         *  llm: AI language model object for generating text
         *
         * Returns:
         *  Object containing Dr. Watson's narration message
         */
        const { storyDetails } = state;
        const systemMessage = this.instructions
            .replace("{victim}", storyDetails.victimName)
            .replace("{time}", storyDetails.timeOfDeath)
            .replace("{location}", storyDetails.locationFound)
            .replace("{weapon}", storyDetails.murderWeapon)
            .replace("{cause}", storyDetails.causeOfDeath)
            .replace("{scene}", storyDetails.crimeSceneDetails);

        const narration = await llm.invoke([
            { role: "system", content: systemMessage },
            { role: "user", content: "Create an atmospheric narration of the crime scene" }
        ]);

        console.log("Crime Scene Narration:\n", narration.content);

        return { messages: [narration] };
    }
}

module.exports = Narrator;