const whereToGoAction = new WhereToGo();
const nextStep = whereToGoAction.execute(state);

const characterCreator = new CreateCharacters();
const characters = await characterCreator.execute(state, llm);

const storyCreator = new CreateStory();
const story = await storyCreator.execute(state, llm);

const narratorAction = new Narrator();
const narration = await narratorAction.execute(state, llm);
