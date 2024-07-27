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

      this.addSystemPrompt(this.SystemPrompt);
    }

    addSystemPrompt(sysPrompt){
      if(sysPrompt){
        this.SystemPrompt = sysPrompt;
      }
      if(this.SystemPrompt !== ""){
        if(this.ConversationHistory.length > 0){
          if(this.ConversationHistory[0].role === 'System'){
            console.log("Warning: AddSystemPrompt = System Prompt Already Set");
            // remove if present
            this.ConversationHistory.shift();
          }
        }
        this.ConversationHistory.unshift({ role: "System", content: this.SystemPrompt });
      }
    }
  
    getConversationHistory() {
      return this.ConversationHistory;
    }
    
    resetConversationHistory(){
      this.ConversationHistory = [];
      this.addSystemPrompt();
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