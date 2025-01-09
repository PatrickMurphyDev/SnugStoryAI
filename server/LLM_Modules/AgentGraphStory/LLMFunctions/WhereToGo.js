import LLMAction from "../LLMAction";

// Determines the next conversation state based on the last message
class WhereToGo extends LLMAction {
    execute(state) {
        /**
         * Args:
         *  state: Object containing:
         *   - messages: Array of previous conversation messages
         *
         * Returns:
         *  'end' or 'continue' based on the last message
         */
        const messages = state.messages;
        const lastMessage = messages[messages.length - 1];
        return lastMessage.content.includes("EXIT") ? "end" : "continue";
    }
}

module.exports = WhereToGo;