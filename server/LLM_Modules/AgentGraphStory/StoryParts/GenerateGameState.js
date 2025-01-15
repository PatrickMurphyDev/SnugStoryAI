// A Class to define and manage the overall State of the Game
class GenerateGameState {
    /**
     * @param {string} environment - Story environment
     * @param {Character[]} characters - Characters in the story
     * @param {BaseMessage[]} messages - Sequence of messages
     * @param {number} maxCharacters - Number of characters
     * @param {number} numGuessesLeft - Number of guesses the player has
     * @param {string} result - Store the guesser result and evaluate Correct/Incorrect
     * @param {StoryDetails} [storyDetails] - Details about the murder mystery
     * @param {number} [selectedCharacterId] - Index of the selected character
     */
    constructor(
        environment,
        characters,
        messages = [],
        maxCharacters = 10,
        numGuessesLeft = 10,
        result = null,
        storyDetails = null,
        selectedCharacterId = null,
    ) {
        this.platerDetails = {gender: '', name: 'Unamed', education: 'General Studies'}
        this.environment = environment;
        this.characters = characters;
        this.messages = messages;
        this.maxCharacters = maxCharacters;
        this.numGuessesLeft = numGuessesLeft;
        this.result = result;
        this.storyDetails = storyDetails;
        this.selectedCharacterId = selectedCharacterId;
    }

    setGender(gender) {
        this.platerDetails.gender = gender;
    }
    setName(name) {
        this.platerDetails.name = name;
    }
    
    setEducation(education) {
        this.platerDetails.education = education;
    }

    setSelectedCharacterID(id){
        this.selectedCharacterId = id;
    }

    setNPCCount(newCount) {
        this.maxCharacters = newCount;
    }

}

module.exports = GenerateGameState;