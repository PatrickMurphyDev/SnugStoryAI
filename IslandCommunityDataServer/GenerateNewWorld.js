//import
const {
  Island,
  Area,
  IslandPropertyLot,
  Building,
  Organization,
  JobPosition,
  Character,
  //CharacterTrait,
  //Trait,
} = require("./models");
const mongoose = require("mongoose");
const { default: ollama } = require("ollama");
const buildingDataConfig = require("./data_collections/IslandTemplate.json");
const buildingJobsDataConfig = require("./data_collections/BuildingJobs.json");

const db = mongoose.connect(`mongodb://127.0.0.1:27017/island_project`);
// const ollama = new Ollama.Ollama();
// ollama.setModel("llama3");

const LLMPrompt = async function (messages, formatJSON, modelSetting) {
  let msgs = [];
  msgs = [{ role: "user", content: messages }];

  let sendProps = { model: modelSetting || "llama3", messages: msgs };
  if(formatJSON){
    sendProps['format'] = 'json';
  }
  //console.log(sendProps);
  return ollama.chat(sendProps);
};

// setup
// create new island, save id
const main = async function () {
  console.log("-----------------");
  console.log("-----------------");
  console.log("-----------------");
  console.log("-----------------");
  console.log("-----------------");
  console.log("-----------------");
  const queryDescIsland =
    "in 100 words describe a fictional island in the pacific northwest of of the coast of washington state with a poplulation of 100 people.";
  const islandDescRespAI = await LLMPrompt(queryDescIsland);
  //console.log(islandDescRespAI);

  const newIsland = {
    _id: new mongoose.Types.ObjectId(),
    name:
      "NewIsland_" + new Date().toLocaleString("fr-CA").replace(/[,| ]/g, ""),
    location: "Puget Sound, Wa, USA",
    description: islandDescRespAI.message.content,
  };

  console.log("New Island:");
  console.log(newIsland);
  const islandObject = await Island.create(newIsland);
  console.log(islandObject);
  
  console.log("-----------------");
  console.log("-----------------");
  console.log("-----------------");
  console.log("-----------------");
  console.log("-----------------");
  console.log("-----------------");
  console.log("New Area:");
  const newArea = {
    _id: new mongoose.Types.ObjectId(),
    island_id: newIsland._id,
    type: "General",
    name: "general area",
    income_level: "$$",
    description: "General Area Whole Island",
  };
  console.log(newArea);
  const newGeneralArea = await Area.create(newArea);

  const CivicRequiredBuildingCount =
    buildingDataConfig.Buildings.civic.required.length;
  const RequiredBuildingList =
    buildingDataConfig.Buildings.civic.required.concat(
      buildingDataConfig.Buildings.private.required
    );
  const IslandPropertyLotCount = RequiredBuildingList.length;
  // add required lots and buildings
  //Choose Buildings
  for (let i = 0; i < IslandPropertyLotCount; i++) {
    // gen lot
    const newLotIsCivic =
      i + 1 < CivicRequiredBuildingCount ? "Civic" : "Private";
    const newLotBuildingName = RequiredBuildingList[i];

    const newLotObject = await IslandPropertyLot.create({
      island_id: newIsland._id,
      type: newLotIsCivic,
      coordinates: "0,0",
      description: "new lot: " + newLotBuildingName,
    });

    // Place Required Buildings
    /* Place Buildings with Set Lot Locations
    Randomly place remaining required buildings in random but suitable lot locations
Place Optional Buildings randomly in remaining commercial lots.  */
    // while not visualized lot id doesn't matter so just create building, TODO: when visualize generate all lots, then choose buildings seperate steps
    const tempBuildingDesc = "describe this building"; // get from building config file?
    const tempBuildingLocation = "Location Address"; // to do move to lot file exclusively
    // choose building
    const newBuilding = {
      _id: new mongoose.Types.ObjectId(),
      lot_id: newLotObject._id,
      type: newLotBuildingName,
      name: newLotBuildingName,
      address: tempBuildingLocation,
      description: tempBuildingDesc,
    };
    const newBuildingObject = await Building.create(newBuilding);
    // create organization if not already exist
    const newOrganizationObject = await Organization.create({
      building_id: newBuilding._id,
      name: "Generate a name for a " + newLotBuildingName + " business",
      type: !newBuildingObject.newLotIsCivic
        ? "Private"
        : NonProfitBuildingsList.hasOwnProperty(newLotBuildingName)
        ? "NonProfit"
        : "Civic",
      description:
        "Generate a 150 word description of a " +
        newLotBuildingName +
        " business",
      address: "remove me, lot only",
    });
    // create job positions list
    var buildingJobObj;
    for (var n = 0; n < buildingJobsDataConfig.length; n++) {
      if (
        buildingJobsDataConfig[n].buildingKey === newBuildingObject.buildingKey
      ) {
        buildingJobObj = buildingJobsDataConfig[n];
        break;
      }
    }
    for (var m = 0; m < buildingJobObj.jobPositionDesciptions.length; m++) {
      const newJobPosition = JobPosition.create({
        organization_id: newOrganizationObject._id,
        building_id: newBuilding._id,
        title: buildingJobObj.jobPositionDesciptions[m].position,
        description: "",
        requirements: [],
        salary: buildingJobObj.jobPositionDesciptions[m].payRange.low,
      });
      if (buildingJobObj.buildingKey === newBuilding.name) {
        buildingJobObj = buildingJobsDataConfig[n];
        break;
      }
    }
  }

  for await (const doc of JobPosition.find()) {
    const character_gen_queries = [
      "Generate a human with a random age between 18-65, they have worked as a " +
        doc.name +
        " for a random number of years with a maximum of their age minus 16. Describe their physical traits, mental health traits, and social traits. Where were they born, how long ago did they move to the island if not born here.",
    ];
    const format_resp_prompt =
      " format your response as a json object with the schema: ";
    const schema_prompt = `{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  biologicalGender: {
    type: String,
    enum: ["male", "female"],
    default: "female",
  },
  presentingGender: {
    type: String,
    enum: ["male", "female", "non-binary"],
    default: "female",
  },
  sexualOrientation: {
    type: String,
    enum: ["heterosexual", "homosexual", "bisexual", "asexual", "other"],
    default: "herosexual",
  },
  description: { type: String, required: false },
  occupation: {type: String, required: false},
  familyMembers: [{role: {type: String, enum: ['Mom','Dad','Step-Mom','Step-Dad','Grandpa','Grandma','Cousin','Aunt','Uncle']}, name:{type: String}, age:{type: Number}}],
  romanticRelationship: {status:{type: String, enum: ['Single', 'Married', 'In A Relationship', 'Friends With Benefits']}, partner: {name: {type: String}, age: {type: Number}}},
  goals: [
    {
      goalType: {
        type: String,
        enum: ["Story", "Scene", "Secondary", "Other"],
        default: "Story",
      },
      goalName: { type: String, required: true },
      goalDescription: { type: String, required: true },
    },
  ],
  lifeEvents:{
  toddler:[],
  childhood:[],
  preteen:[],
  teen:[],
  early20s:[]}
}`;
    const character = await LLMPrompt(
      character_gen_queries[0] + format_resp_prompt + schema_prompt, true
    );
    console.log(character);
  }

  
};
main()
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.error(e); // "oh, no!"
  });
/* /
    
  // for each job position unique
  // create character basic details
  // add some traits

Generate List of Character Basic Details
    Generate Name , Gender, Age, number of years on the island for each person on the island
        Start with one person each for required job positions
        Move to non required job positions, generate more until 90% of total job positions are filled
    Create Existing Relationships 
        Randomly select 20 percent males and 20% females of the 18-65 aged population, mark these characters as married.
        Loop through selected married people to choose match, prioritize age similarity, same Industry 
    Follow the same process but for people Dating  but not married, but use only 10% of each gender.
    Add same sex couples
    Remaining people single, divorced or widowed, probability determined by age
    Add 1-3 children for ⅓ of married couples 
    Add 4-7 retirees aged 66-100, choose 4 of Them to be married in two different couples. One of the couples has children on the island. Choose 1-3 characters that are 18-35 years younger than the average age of the retired couple. Update the selected adults with appropriate maiden or last name

*/