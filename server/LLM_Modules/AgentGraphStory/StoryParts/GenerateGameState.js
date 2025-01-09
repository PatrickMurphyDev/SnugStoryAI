// A Class to define and manage the overall State of the Game
export class GenerateGameState {
    /**
     * @param {BaseMessage[]} messages - Sequence of messages
     * @param {string} environment - Story environment
     * @param {number} maxCharacters - Number of characters
     * @param {Character[]} characters - Characters in the story
     * @param {StoryDetails} [storyDetails] - Details about the murder mystery
     * @param {number} [selectedCharacterId] - Index of the selected character
     * @param {number} numGuessesLeft - Number of guesses the player has
     * @param {string} result - Store the guesser result and evaluate Correct/Incorrect
     */
    constructor(
        messages,
        environment,
        maxCharacters,
        characters,
        storyDetails = null,
        selectedCharacterId = null,
        numGuessesLeft,
        result
    ) {
        this.messages = messages;
        this.environment = environment;
        this.maxCharacters = maxCharacters;
        this.characters = characters;
        this.storyDetails = storyDetails;
        this.selectedCharacterId = selectedCharacterId;
        this.numGuessesLeft = numGuessesLeft;
        this.result = result;
    }
}
