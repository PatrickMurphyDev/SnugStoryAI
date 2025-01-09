```
# Creating the Conversation Graph to act as the Conversation Loop

# Update the graph
conversation_builder = StateGraph(ConversationState)

# Add nodes
conversation_builder.add_node("character_introduction", character_introduction)
conversation_builder.add_node("ask_question", ask_question)
conversation_builder.add_node("answer_question", answer_question)

# Add edges
conversation_builder.add_edge(START, "character_introduction")
conversation_builder.add_edge("character_introduction", "ask_question")
conversation_builder.add_conditional_edges("ask_question",where_to_go,{"continue": "answer_question", "end": END})
conversation_builder.add_edge("answer_question", "ask_question")

conversation_graph = conversation_builder.compile()
# View
display(Image(conversation_graph.get_graph(xray=1).draw_mermaid_png()))
```

