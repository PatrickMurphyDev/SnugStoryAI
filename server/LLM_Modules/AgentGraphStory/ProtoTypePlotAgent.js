const {
  requestYesNo,
  requestNumber,
  requestString,
  requestConfirm,
  closeInterface,
} = require("../utils/consoleInputUtils.js");

const charTempData = require("../utils/tempCharData");

const { default: ollama } = require("ollama"); // CJS

const CreateStory = require("./LLMFunctions/CreateStory");
const GenerateGameState = require("./StoryParts/GenerateGameState");

//const OpenAI = require("openai");
//const client = new OpenAI({
// baseURL: "http://localhost:11434/v1",
// apiKey: "ollama", // required but unused
//});

var genState = createGameState("male", "tom", "english");

async function getCharacters() {
  // load characters from mongodb
  let retChars = [];
  let allCharData = charTempData;
  for (let charId in allCharData) {
    const char = allCharData[charId];
    let detObj = {};
    detObj.race = 
      char.details.race ||
      char.details.raceEthnicity ||
      char.details.ethnicity ||
      "White";
    
    if (char.details && char.details.ethnicity){
      detObj.ethnicity = char.details.ethnicity;
    }
    if (char.details && char.details.sexualOrientation && char.details.sexualOrientation !== "heterosexual" && char.details.sexualOrientation !== "Heterosexual"){
      detObj.sexualOrientation = char.details.sexualOrientation; 
    }
    if (char.details && char.details.occupation){
      detObj.occupation = char.details.occupation;
    }
    if (char.details && char.details.description){
      detObj.description = char.details.description;
    }
    if (char.details && char.details.appearance){
      detObj.appearance = {...char.details.appearance};
    }
    if (char.details && char.details.goals && (Array.isArray(char.details.goals) && char.details.goals.length > 0)){
      detObj.goals = {...char.details.goals};
    }
    retChars.push({
      id: char.id,
      gender: char.gender,
      age: char.age,
      firstName: char.nameObj.first,
      lastName: char.nameObj.last,
      details: detObj,
    });
  }

  console.log(retChars);
  return retChars;
}

async function execute(state, callback) {
  let llm = {
    invoke: async function (msgs, model) {
      const completion = await ollama.chat({
        model: model || "phi3:mini" || "llama3",
        messages: msgs,
      });

      console.log(completion);

      return completion.message.content;
    },
  };

  const environment =
    "Asbury's Reef is a rugged and isolated island nestled in the Pacific Northwest, home to a tight-knit community of just 50 residents. The island’s heart is a quaint fishing village where weathered boats bob in the harbor, and homes cling to rocky cliffs overlooking the stormy sea. Despite its picturesque charm, life on the island is harsh, with residents relying on their fishing trade and the occasional delivery from mainland supply boats to survive. Cut off from the conveniences of modern life, the island has an eerie timelessness, enhanced by the dense evergreen forests and ever-present mist that shroud much of the land. " +
    "Beneath the village’s quiet exterior lies a darker truth. A secretive cult wields significant influence over the island’s affairs, its reach extending to every corner of Asbury's Reef. Whispers of strange rituals and shadowy gatherings in the ancient woods are common among locals, though no one dares speak openly. The cult’s power is felt in the rigid social order and the unspoken rules that govern daily life, ensuring outsiders are met with guarded suspicion and a chilly reception. " +
    "Legends passed down through generations tell of the cult's origins, rooted in the island’s founding families who came seeking isolation. These stories, combined with the island's remote beauty, create a haunting atmosphere where secrets seem to linger in every shadow. Visitors rarely stay long, unnerved by the unsettling sense of being watched and the unshakable feeling that something is amiss on Asbury's Reef.";
  genState.setEnvironment(environment);

  const characters = await getCharacters();
  genState.setCharacters(characters);

  const storyCreator = new CreateStory();
  const story = await storyCreator.execute(state, llm);

  const narratorAction = new Narrator();
  const narration = await narratorAction.execute(state, llm);

  callback([nextStep, characters, story, narration]);
}

function createGameState(gender, name, education, npcCount) {
  const selectedCharID = 0;
  const resultTxt = `The player has chosen to play as ${name} a 25 year old ${gender}. ${name} recently graduated with a degree in ${education} They will be interacting with ${npcCount} non-player characters in this game.`;
  return new GenerateGameState(
    getEnvironmentDescription(),
    getCharacters(),
    getMessages(),
    npcCount,
    10,
    resultTxt,
    getStoryDetails(),
    selectedCharID
  );
}
function getMessages() {
  return [];
}

function getEnvironmentDescription() {
  return (
    "Asbury's Reef is a rugged and isolated island nestled in the Pacific Northwest, home to a tight-knit community of just 50 residents. The island’s heart is a quaint fishing village where weathered boats bob in the harbor, and homes cling to rocky cliffs overlooking the stormy sea. Despite its picturesque charm, life on the island is harsh, with residents relying on their fishing trade and the occasional delivery from mainland supply boats to survive. Cut off from the conveniences of modern life, the island has an eerie timelessness, enhanced by the dense evergreen forests and ever-present mist that shroud much of the land. " +
    "Beneath the village’s quiet exterior lies a darker truth. A secretive cult wields significant influence over the island’s affairs, its reach extending to every corner of Asbury's Reef. Whispers of strange rituals and shadowy gatherings in the ancient woods are common among locals, though no one dares speak openly. The cult’s power is felt in the rigid social order and the unspoken rules that govern daily life, ensuring outsiders are met with guarded suspicion and a chilly reception. " +
    "Legends passed down through generations tell of the cult's origins, rooted in the island’s founding families who came seeking isolation. These stories, combined with the island's remote beauty, create a haunting atmosphere where secrets seem to linger in every shadow. Visitors rarely stay long, unnerved by the unsettling sense of being watched and the unshakable feeling that something is amiss on Asbury's Reef."
  );
}

function getStoryDetails() {
  return {
    title: "The Magical Adventure",
    author: "Dr. Lucy McCoy",
    genre: "Adventure, Fantasy, RPG",
    releaseDate: "July 15, 2022",
    description:
      "In a world where magic and technology coexist, players embark on an adventure to uncover the secrets of the magical island, where the beauty of nature and the mysteries of the universe intertwine. As they navigate through the enchanting world, they will encounter various challenges, discover hidden treasures, and face the dangers that lie ahead.",
  };
}

async function runCMDLineGetUserInput() {
  const pGender = await requestString(
    "What gender is the Player? (Male, Female, Non-Binary, etc.)"
  );
  const pName = await requestString("Enter the Player's First Name");
  const pEducation = await requestString(
    "Enter the Player's College Major: (Computer Science, Biology, Psychology, etc.)"
  );
  const npcCount = await requestNumber("Enter Number of NonPlayer Characters");
  console.log("");
  console.log("");
  console.log(`Player Gender: ${pGender}`);
  genState.setGender(pGender);
  console.log(`Player Name: ${pName}`);
  genState.setName(pName);
  console.log(`Player College Degree: ${pEducation}`);
  genState.setEducation(pEducation);
  console.log(`Number of Non-Player Characters: ${npcCount}`);
  genState.setNPCCount(npcCount);
  const confirmed = await requestConfirm("Are you sure you want to proceed?");
  if (confirmed) {
    console.log("Confirmed!"); //createGameState(pGender, pName, pEducation, npcCount)
    execute(genState, (returned) => console.log(returned));
  } else {
    console.log("Not confirmed.");
  }

  closeInterface();
}

runCMDLineGetUserInput();
