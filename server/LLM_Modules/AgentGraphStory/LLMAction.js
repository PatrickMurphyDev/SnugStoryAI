// Base class LLMAction
class LLMAction {
    execute(state, llm) {
        throw new Error("Method 'execute()' must be implemented.");
    }
}

module.exports = LLMAction;