const {
  requestYesNo,
  requestNumber,
  requestString,
  requestConfirm,
  closeInterface,
} = require("../utils/consoleInputUtils.js");

const CreateStory = require("./LLMFunctions/CreateStory");

const GenerateGameState = require("./StoryParts/GenerateGameState");
const OpenAI = require("openai");
const { default: ollama } = require("ollama"); // CJS
const client = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama", // required but unused
});

var genState = createGameState("male", "tom", "english");

async function getCharacters() {
  // load characters from mongodb
  return [
    {
      id: "000000000000000000000001",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: false,
      is_active: true,
      nameObj: {
        first: "Ellie",
        last: "Tupee",
      },
      name: "Ellie",
      age: 28,
      gender: "female",
      details: {
        _id: {
          $oid: "672e7f1c18728437820b7179",
        },
        island_id: "66dc506deaae235d2dbe4a3a",
        character_id: "000000000000000000000001",
        presentingGender: "female",
        raceEthnicity: "white",
        sexualOrientation: "heterosexual",
        occupation: "Crab Fishermen",
        job_id: "672e893418728437820b717d",
        residence_id: "672e893418728437820b717d",
        description:
          "Newest island resident here to take over her estranged fathers crab fishing business after her father passed away.",
        appearance: {
          height: "5ft 6in",
          bodyType: "slim",
          hairColor: "brown",
          hairStyle: "ponytail",
          eyeDescriptor: "large",
          eyeColor: "brown",
          clothingStyle: "dresses and skirts",
        },
        goals: [
          {
            goalType: "Story",
            goalName: "Main Goal",
            goalDescription: "Repair and grow the crab business",
          },
          {
            goalType: "Story",
            goalName: "Secondary Goal",
            goalDescription: "Find a new boyfriend and eventually get married",
          },
        ],
        traits: "672e893418728437820b717d",
        resources_id: "672e893418728437820b717d",
        behavioral_patterns_id: "672e893418728437820b717d",
        special_conditions_id: "672e893418728437820b717d",
      },
    },
    {
      id: "000000000000000000000002",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: {
        first: "Addison",
        last: "Clark",
      },
      name: "Addison",
      age: 54,
      gender: "male",
      details: {
        presentingGender: "male",
        raceEthnicity: "white",
        sexualOrientation: "heterosexual",
        occupation: "Hotel Owner",
        description: "Father of Brianna Clark, owner of the Lighthouse B&B.",
        appearance: {
          height: "5ft 11in",
          bodyType: "slim",
          hairColor: "brown",
          hairStyle: "side part",
          eyeDescriptor: "tired",
          eyeColor: "brown",
          clothingStyle: "tux and tie",
        },
        goals: [
          {
            goalType: "Story",
            goalName: "Main Goal",
            goalDescription:
              "Wants to turn the island into a tourism resort destination, even if the island loses its character.",
          },
        ],
        traits: "672e893418728437820b717d",
      },
    },
    {
      id: "000000000000000000000003",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: {
        first: "Andi",
        last: "McNuttly",
      },
      name: "Andi",
      age: 32,
      gender: "female",
      details: {
        presentingGender: "male",
        raceEthnicity: "white",
        sexualOrientation: "homosexual",
        occupation: "Harbor Master",
        description: "Runs the Marina and is well known around town.",
        appearance: {
          height: "5ft 10in",
          bodyType: "athletic",
          hairColor: "red",
          hairStyle: "messy hair held up by hat",
          eyeDescriptor: "determined",
          eyeColor: "green",
          clothingStyle: "overalls",
        },
        goals: [
          {
            goalType: "Story",
            goalName: "Main Goal",
            goalDescription: "Expand the Northern Marina",
          },
        ],
        CharacterPersonality: ["Sassy", "witty", "silly"],
        traits: "672e893418728437820b717d",
      },
    },
    {
      id: "000000000000000000000004",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: {
        first: "Betty",
        last: "Last",
      },
      name: "Betty",
      age: 30,
      gender: "female",
      details: {
        presentingGender: "female",
        raceEthnicity: "white",
        sexualOrientation: "heterosexual",
        occupation: "Bakery Owner",
        description: "Owner of the local bakery and single.",
        appearance: {
          height: "5ft 4in",
          bodyType: "slim",
          hairColor: "blonde",
          hairStyle: "messy bun",
          eyeDescriptor: "sparkling",
          eyeColor: "blue",
          clothingStyle: "apron and sundresses",
        },
        goals: [
          {
            goalType: "Story",
            goalName: "Main Goal",
            goalDescription:
              "Want's to sell her bakery and move to the main land.",
          },
        ],
        traits: "672e893418728437820b717d",
      },
    },
    {
      id: "000000000000000000000005",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: { first: "Brianna", last: "Clark" },
      name: "Brianna",
      age: 19,
      gender: "Female",
      details: {
        id: "000000000000000000000005",
        island_id: "66dc506deaae235d2dbe4a3a",
        img_src: "images/CharacterProfileImages/BriannaClark.png",
        race: "White",
        ethnicity: "",
        sexualOrientation: "Heterosexual",
        occupation: "Receptionist",
        employer: "Medical Clinic",
        job_id: "",
        residence_id: "",
        personalityTraits: "Flirty",
        goals: [
          {
            goalType: "Story",
            goalName: "Main Goal",
            goalDescription: "Find a significant other.",
          },
        ],
        description: "",
      },
    },
    {
      id: "000000000000000000000006",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: { first: "Briggs", last: "" },
      name: "Briggs",
      age: 55,
      gender: "Male",
      details: {
        island_id: "66dc506deaae235d2dbe4a3a",
        img_src: "images/CharacterProfileImages/Briggs.png",
        race: "White",
        ethnicity: "",
        sexualOrientation: "Heterosexual",
        occupation: "Fishing Boat Capt.",
        employer: "East West Pass",
        job_id: "",
        residence_id: "",
        personalityTraits: "Calm",
        goals: [],
        description: "",
      },
    },
    {
      id: "000000000000000000000007",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: { first: "Brittany", last: "Connors" },
      name: "Brittany",
      age: 28,
      gender: "Female",
      details: {
        id: "000000000000000000000007",
        island_id: "66dc506deaae235d2dbe4a3a",
        img_src: "images/CharacterProfileImages/BrittanyConnors.png",
        race: "White",
        ethnicity: "",
        sexualOrientation: "bisexual",
        occupation: "Fitness Instructor",
        employer: "Gym",
        job_id: "",
        residence_id: "",
        personalityTraits: "Calm",
        goals: [],
        description: "twins with lucas and dating chad",
      },
    },
    {
      id: "000000000000000000000008",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: {
        first: "Chad",
        last: "Ellington",
      },
      name: "Chad",
      age: 32,
      gender: "male",
      details: {
        presentingGender: "male",
        raceEthnicity: "white",
        sexualOrientation: "heterosexual",
        occupation: "Personal Trainer",
        description: "Owner of the local bakery and single.",
        appearance: {
          height: "5ft 10in",
          bodyType: "athletic",
          hairColor: "brown",
          hairStyle: "gelled hair spiked",
          eyeDescriptor: "determined",
          eyeColor: "blue",
          clothingStyle: "workout",
        },
        goals: [
          {
            goalType: "Story",
            goalName: "Main Goal",
            goalDescription: "Have the lowest BMI and highest bench press",
          },
        ],
        traits: "672e893418728437820b717d",
      },
    },
    {
      id: "000000000000000000000009",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: { first: "Charlie", last: "Mallard" },
      name: "Charlie",
      age: 48,
      gender: "Male",
      details: {
        id: "000000000000000000000009",
        island_id: "66dc506deaae235d2dbe4a3a",
        img_src: "images/CharacterProfileImages/CharlieMallard.png",
        race: "White",
        ethnicity: "",
        sexualOrientation: "Heterosexual",
        occupation: "Police Chief / Detective",
        employer: "Police / Fire Station",
        job_id: "",
        residence_id: "",
        personalityTraits: "Calm",
        goals: "",
        description: "",
      },
    },
    {
      id: "000000000000000000000010",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: { first: "Chealsea", last: "King" },
      name: "Chealsea",
      age: 22,
      gender: "Female",
      details: {
        id: "000000000000000000000010",
        island_id: "66dc506deaae235d2dbe4a3a",
        img_src: "images/CharacterProfileImages/ChealseaKing.png",
        race: "Asian/Pacific Island, Black",
        ethnicity: "Half Japanese Half Black",
        sexualOrientation: "Heterosexual",
        occupation: "Waitstaff",
        employer: "Resturant 2",
        job_id: "",
        residence_id: "",
        personalityTraits: "Calm",
        goals: "",
        description: "",
      },
    },
    {
      id: "000000000000000000000011",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: { first: "Christian", last: "Lumley" },
      name: "Christian",
      age: 29,
      gender: "Male",
      details: {
        id: "000000000000000000000011",
        island_id: "66dc506deaae235d2dbe4a3a",
        img_src: "images/CharacterProfileImages/ChristianLumley.png",
        race: "White, Native American",
        ethnicity: "Yakima Tribe",
        sexualOrientation: "Heterosexual",
        occupation: "Lawyer",
        employer: "Police / Fire Station",
        job_id: "",
        residence_id: "",
        personalityTraits: "Calm",
        goals: "",
        description: "",
      },
    },
    {
      id: "000000000000000000000012",
      island_id: "66dc506deaae235d2dbe4a3a",
      is_npc: true,
      is_active: true,
      nameObj: { first: "Clara", last: "Dickson" },
      name: "Clara",
      age: 24,
      gender: "Female",
      details: {
        id: "000000000000000000000012",
        island_id: "66dc506deaae235d2dbe4a3a",
        img_src: "images/CharacterProfileImages/ClaraDickson.png",
        race: "White",
        ethnicity: "",
        sexualOrientation: "Heterosexual",
        occupation: "Chef",
        employer: "The Bethel",
        job_id: "",
        residence_id: "",
        personalityTraits: "Calm",
        goals: "",
        description: "dating marissa the cop",
      },
    },
  ];
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
