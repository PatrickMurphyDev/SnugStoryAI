const {
  Island,
  Area,
  IslandPropertyLot,
  Building,
  Organization,
  JobPosition,
  Character,
} = require("./Model/models");

const mongoose = require("mongoose");
const { default: ollama } = require("ollama");
const buildingDataConfig = require("./data_collections/IslandTemplate.json");
const buildingJobsDataConfig = require("./data_collections/BuildingJobs.json");

const LLMModelsNames = {'default':0,'llama':0,'phi':1,'uncensored':2};
const LLMModels = ['llama3','phi3:mini','llama2-uncensored'];
const characterGenStepsEnum = {
  characterBasicDetails: "characterBasicDetails",
  characterRelationshipsSummary: "characterRelationshipsSummary",
  characterRelationship: "characterRelationship",
  characterTraitsSummary: "characterTraitsSummary",
  characterTrait: "characteTrait",
};
const NonProfitBuildingsList = {};

mongoose.connect(`mongodb://127.0.0.1:27017/island_project`);

class LLMConversation {
  constructor(msgs = [], sysPrompt = "", modelSetting = "llama3", formatJSON = false) {
    this.SystemPrompt = sysPrompt;
    this.OutputFormat = formatJSON;
    this.LLMModel = modelSetting;
    this.ConversationHistory = Array.isArray(msgs) ? msgs : [];
  }

  getConversationHistory() {
    return this.ConversationHistory;
  }

  async prompt(msg, modelSetting = this.LLMModel) {
    this.ConversationHistory.push({ role: "user", content: msg });
    const sendProps = { 
      model: modelSetting, 
      messages: this.ConversationHistory,
      ...(this.OutputFormat && { format: "json" })
    };
    return ollama.chat(sendProps);
  }
}

const createNewIsland = async (llmConversation) => {
  const queryDescIsland = "in 100 words describe a fictional island in the pacific northwest off the coast of Washington state with a population of 100 people.";
  const islandDescRespAI = await llmConversation.prompt(queryDescIsland);
  const name_temp = `NewIsland_${new Date().toLocaleString("fr-CA").replace(/[,| ]/g, "")}`;
  const newIsland = {
    _id: new mongoose.Types.ObjectId(),
    name: name_temp,
    location: "50 Miles off the Coast of Washington State, USA",
    description: islandDescRespAI.message.content,
  };

  return Island.create(newIsland);
};

const createNewArea = async (islandId) => {
  const newArea = {
    _id: new mongoose.Types.ObjectId(),
    island_id: islandId,
    type: "General",
    name: "general area",
    income_level: "$$",
    description: "General Area Whole Island",
  };

  return Area.create(newArea);
};

const createNewLotAndBuilding = async (islandId, buildingName, isCivic, llmConversation) => {
  const newLot = await IslandPropertyLot.create({
    island_id: islandId,
    type: isCivic ? "Civic" : "Private",
    coordinates: "0,0",
    description: `new lot: ${buildingName}`,
  });

  const newBuilding = await Building.create({
    _id: new mongoose.Types.ObjectId(),
    island_id: islandId,
    lot_id: newLot._id,
    type: buildingName,
    name: buildingName,
    address: "Location Address",
    description: "describe this building",
  });

  const orgNamePrompt = `Generate a name for a ${buildingName} business`;
  const orgDescPrompt = `Generate a 150 word description of a ${buildingName} business`;
  
  const orgNameResponse = await llmConversation.prompt(orgNamePrompt);
  const orgDescResponse = await llmConversation.prompt(orgDescPrompt);

  const newOrganization = await Organization.create({
    island_id: islandId,
    building_id: newBuilding._id,
    name: orgNameResponse.message.content,
    type: isCivic
      ? NonProfitBuildingsList[buildingName]
        ? "NonProfit"
        : "Civic"
      : "Private",
    description: orgDescResponse.message.content,
    address: "remove me, lot only",
  });

  return { newLot, newBuilding, newOrganization };
};

const createJobPositions = async (islandId, organizationId, buildingId, buildingKey) => {
  const buildingJobObj = buildingJobsDataConfig.find(
    (job) => job.buildingKey === buildingKey
  );

  if (!buildingJobObj) return;

  const jobPromises = buildingJobObj.jobPositionDesciptions.map(jobDescription =>
    JobPosition.create({
      island_id: islandId,
      organization_id: organizationId,
      building_id: buildingId,
      title: jobDescription.position,
      description: "",
      requirements: [],
      salary: jobDescription.payRange.low,
    })
  );

  await Promise.all(jobPromises);
};

const generateCharacter = async (step, optionsObject, llmConversation) => {
  const queryPartsByStep = {
    characterBasicDetails: {
      questionPrompt: `Generate a fictional human character with a random age between 18-65, ${getBirthdatePrompt()}, choose their birthplace with a 45% chance they were born on the island, choose their gender, name(first, middle (optional), last), they are currently employed as a ${getJobDetailsString(optionsObject)}`,
      outputSchema: `{
        name:{first: String, middle: String, last: String},
        birth: {
          place: {type: String, valueFormat: "City, (if born in USA, AU or CAN include State and then a ',' comma) Country " },
          date: { year: {type: Number}, month: {type: Number}, day: {type: Number}}},
        biologicalGender: { type: String, enum: ["male", "female"], default: "female" },
        age: Number,
        description: String}`
    },
    // ... other steps
  };

  const formatRespPrompt = " format your response as a json object with the schema: ";
  const fullPrompt = queryPartsByStep[step].questionPrompt + formatRespPrompt + queryPartsByStep[step].outputSchema;

  return llmConversation.prompt(fullPrompt);
};

const getBirthdatePrompt = () => "give them a random birthdate they could have been born assuming the current_date in the story is equal to today's reallife date unless I have previously specified otherwise";

const getJobDetailsString = (optionsObject) => 
  `${optionsObject.jobTitle} working for ${optionsObject.jobOrganizationName} a ${optionsObject.jobOrganizationType} business, earning ${optionsObject.jobSalary} dollars USD a year.`;

const main = async () => {
  const llmConversation = new LLMConversation([], "", "llama3", true);

  try {
    const newIsland = await createNewIsland(llmConversation);
    console.log("New Island:", newIsland);

    const newArea = await createNewArea(newIsland._id);
    console.log("New Area:", newArea);

    const CivicRequiredBuildingCount = buildingDataConfig.Buildings.civic.required.length;
    const RequiredBuildingList = [
      ...buildingDataConfig.Buildings.civic.required,
      ...buildingDataConfig.Buildings.private.required,
    ];

    for (let i = 0; i < RequiredBuildingList.length; i++) {
      const isCivic = i < CivicRequiredBuildingCount;
      const buildingName = RequiredBuildingList[i];
      const { newBuilding, newOrganization } = await createNewLotAndBuilding(
        newIsland._id,
        buildingName,
        isCivic,
        llmConversation
      );
      await createJobPositions(
        newIsland._id,
        newOrganization._id,
        newBuilding._id,
        newBuilding.name
      );
    }

    const jobs = await JobPosition.find().populate('organization');
    const characterList = [];

    for (const job of jobs) {
      const character = await generateCharacter(
        characterGenStepsEnum.characterBasicDetails,
        { 
          jobTitle: job.title,
          jobSalary: job.salary,
          jobOrganizationName: job.organization.name,
          jobOrganizationType: job.organization.type
        },
        llmConversation
      );
      characterList.push(character);
      console.log(character);
    }

    for (let k = 0; k < characterList.length; k++) {
      const ch = characterList[k];
      const ch2 = await generateCharacter(
        characterGenStepsEnum.characterRelationshipsSummary,
        { 
          romantic: {connected:3, distant:2},
          social: {connected:3, distant:2},
          family: {connected:3, distant:2},
          career: {connected:3, distant:2}
        }
      );
    }
  } catch (e) {
    console.error("Error:", e);
  } finally {
    mongoose.disconnect();
  }
};

main();