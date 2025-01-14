const {
  requestYesNo,
  requestNumber,
  requestString,
  requestConfirm,
  closeInterface,
} = require("../utils/consoleInputUtils");
const GenerateGameState = require("./StoryParts/GenerateGameState");

async function getCharacters(){
  // load characters from mongodb 
  return [{
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
          goalDescription:
            "Find a new boyfriend and eventually get married",
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
      description:
        "Father of Brianna Clark, owner of the Lighthouse B&B.",
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
  }];
}

async function execute(state, callback) {
  const characterCreator = CreateCharacters();
  const characters = await characterCreator.execute(state, llm);

  const storyCreator = new CreateStory();
  const story = await storyCreator.execute(state, llm);

  const narratorAction = new Narrator();
  const narration = await narratorAction.execute(state, llm);

  callback([nextStep, characters, story, narration]);
}

function getMessages() {
  return [];  
}

function getEnvironmentDescription() {
  return "A magical island nestled between two coastal mountains, known for its breathtaking beaches, enchanting landscapes, and lush gardens. The island is home to a diverse population of creatures and flora, making it an ideal setting for a magical adventure game.";
}

function getStoryDetails() {
  return {
    title: "The Magical Adventure",
    author: "Dr. Lucy McCoy",
    genre: "Adventure, Fantasy, RPG",
    releaseDate: "July 15, 2022",
    description: "In a world where magic and technology coexist, players embark on an adventure to uncover the secrets of the magical island, where the beauty of nature and the mysteries of the universe intertwine. As they navigate through the enchanting world, they will encounter various challenges, discover hidden treasures, and face the dangers that lie ahead.",
  };
}

async function run() {
  const pGender = await requestString("What gender is the Player? (Male, Female, Non-Binary, etc.)");
  const pName = await requestString("Enter the Player's First Name");
  const pEducation = await requestString("Enter the Player's College Major: (Computer Science, Biology, Psychology, etc.)");
  const npcCount = await requestNumber("Enter Number of NonPlayer Characters");
  console.log('');
  console.log('');
  console.log(`Player Gender: ${pGender}`);
  console.log(`Player Name: ${pName}`);
  console.log(`Player College Degree: ${pEducation}`);
  console.log(`Number of Non-Player Characters: ${npcCount}`);
  const confirmed = await requestConfirm("Are you sure you want to proceed?");
  if (confirmed) {
    console.log("Confirmed!");
    const selectedCharID = 0; // await requestSelectCharacter(characters)
    const resultTxt = "";
    execute(new GenerateGameState(getMessages(), getEnvironmentDescription(), npcCount, getCharacters(), getStoryDetails(), selectedCharID, 10, resultTxt), (returned) => console.log(returned));
  } else {
    console.log("Not confirmed.");
  }

  closeInterface();
}

run();
