const { default: ollama } = require("ollama");
class LLMConversation {
    constructor(
      msgs = [],
      sysPrompt = "",
      modelSetting = "llama3",
      formatJSON = false
    ) {
      this.SystemPrompt = sysPrompt;
      this.OutputFormat = formatJSON;
      this.LLMModel = modelSetting;
      this.ConversationHistory = Array.isArray(msgs) ? msgs : [];

      if(this.SystemPrompt !== ""){
        this.ConversationHistory.unshift({ role: "system", content: this.SystemPrompt});
      }
    }
  
    getConversationHistory() {
      return this.ConversationHistory;
    }
  
    async prompt(msg, modelSetting = this.LLMModel) {
      this.ConversationHistory.push({ role: "user", content: msg });
      const sendProps = {
        model: modelSetting,
        messages: this.ConversationHistory,
        ...(this.OutputFormat && { format: "json" }),
      };
      let respAI = await ollama.chat(sendProps);
      return this.saveResponse(respAI);
    }

    // save resp
    saveResponse(resp){
        this.ConversationHistory.push({role: "assistant", content: resp.message.content})
        return resp;
    }
}

module.exports = LLMConversation;