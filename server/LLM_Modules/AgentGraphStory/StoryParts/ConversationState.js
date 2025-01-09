// A Class to define and manage the State for the conversation
export class ConversationState {
    /**
     * @param {BaseMessage[]} messages - Sequence of messages
     * @param {Character} character - Character being interviewed
     * @param {StoryDetails} [storyDetails] - Details about the murder mystery
     */
    constructor(messages, character, storyDetails = null) {
        this.messages = messages;
        this.character = character;
        this.storyDetails = storyDetails;
    }
}
