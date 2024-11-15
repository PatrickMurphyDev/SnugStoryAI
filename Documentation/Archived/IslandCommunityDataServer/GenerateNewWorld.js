const {
  Island,
  Area,
  IslandPropertyLot,
  Building,
  Organization,
  JobPosition,
  Character,
} = require("./models");
const mongoose = require("mongoose");
const { default: ollama } = require("ollama");
const buildingDataConfig = require("./data_collections/IslandTemplate.json");
const buildingJobsDataConfig = require("./data_collections/BuildingJobs.json");
const characterGenStepsEnum = {
  characterBasicDetails: "characterBasicDetails",
  characterRelationshipsSummary: "characterRelationshipsSummary",
  characterRelationship: "characterRelationship",
  characterTraitsSummary: "characterTraitsSummary",
  characterTrait: "characteTrait",
};
const NonProfitBuildingsList = {};

mongoose.connect(`mongodb://127.0.0.1:27017/island_project`);

const LLMPrompt = async (messages, formatJSON, modelSetting = "llama3") => {
  formatJSON = formatJSON === false ? false : true;
  let msgs = [];
  if (Array.isArray(messages)) {
    // todo make sure array items contains expected schema { role: String, content: String}
    msgs = messages;
  } else {
    // if messages is String then, add only user message to empty array.
    msgs.push({ role: "user", content: messages });
  }
  const sendProps = { model: modelSetting, messages: msgs };
  if (formatJSON) sendProps["format"] = "json";
  return ollama.chat(sendProps);
};

const createNewIsland = async () => {
  const queryDescIsland =
    "in 100 words describe a fictional island in the pacific northwest off the coast of Washington state with a population of 100 people.";
  const islandDescRespAI = await LLMPrompt(queryDescIsland, false);
  const name_temp = `NewIsland_${new Date()
    .toLocaleString("fr-CA")
    .replace(/[,| ]/g, "")}`;
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

const createNewLotAndBuilding = async (islandId, buildingName, isCivic) => {
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

  const newOrganization = await Organization.create({
    island_id: islandId,
    building_id: newBuilding._id,
    name: `Generate a name for a ${buildingName} business`,
    type: isCivic
      ? NonProfitBuildingsList[buildingName]
        ? "NonProfit"
        : "Civic"
      : "Private",
    description: `Generate a 150 word description of a ${buildingName} business`,
    address: "remove me, lot only",
  });

  return { newLot, newBuilding, newOrganization };
};

const createJobPositions = async (
  islandId,
  organizationId,
  buildingId,
  buildingKey
) => {
  const buildingJobObj = buildingJobsDataConfig.find(
    (job) => job.buildingKey === buildingKey
  );

  if (!buildingJobObj) return;

  for (const jobDescription of buildingJobObj.jobPositionDesciptions) {
    await JobPosition.create({
      island_id: islandId,
      organization_id: organizationId,
      building_id: buildingId,
      title: jobDescription.position,
      description: "",
      requirements: [],
      salary: jobDescription.payRange.low,
    });
  }
};

const generateCharacter = async (step, optionsObject) => {
  const jobDetailsToString = `${optionsObject.jobTitle} working for ${optionsObject.jobOrganizationName} a ${optionsObject.jobOrganizationType} business, earning ${optionsObject.jobSalary} dollars USD a year.`;
  const birthdatePrompt = "give them a random birthdate they could have been born assuming the current_date in the story is equal to today's reallife date unless I have previously specified otherwise";
  const queryPartsByStep = {
    characterBasicDetails: {
      questionPrompt: `Generate a fictional human character with a random age between 18-65, ${birthdatePrompt}, choose their birthplace with a 45% chance they were born on the island, choose their gender, name(first, middle (optional), last), they are currently employeed as a ${jobDetailsToString}`,
      outputSchema: `{
      name:{first: String, middle: String, last: String},
      birth: {
        place: {type: String, valueFormat: "City, (if born in USA, AU or CAN include State and then a ',' comma) Country " },
        date: { year: {type: Number}, month: {type: Number}, day: {type: Number}}},
      biologicalGender: { type: String, enum: ["male", "female"], default: "female" },
      age: Number,
      description: String}`,
    },
  };
  const formatRespPrompt =
    " format your response as a json object with the schema: ";
  /*const schemaPrompt = `{
      familyMembers: [{ role: { type: String, enum: ['Mom','Dad','Step-Mom','Step-Dad','Grandpa','Grandma','Cousin','Aunt','Uncle'] }, name: { type: String }, age: { type: Number } }],
      romanticRelationship: { status: { type: String, enum: ['Single', 'Married', 'In A Relationship', 'Friends With Benefits'] }, partner: { name: { type: String }, age: { type: Number } } },
    }`;*/

  return LLMPrompt(
    queryPartsByStep[step].questionPrompt +
      formatRespPrompt +
      queryPartsByStep[step].outputSchema,
    true
  );
};

const main = async () => {
  try {
    const newIsland = await createNewIsland();
    console.log("New Island:", newIsland);

    const newArea = await createNewArea(newIsland._id);
    console.log("New Area:", newArea);

    const CivicRequiredBuildingCount =
      buildingDataConfig.Buildings.civic.required.length;
    const RequiredBuildingList = [
      ...buildingDataConfig.Buildings.civic.required,
      ...buildingDataConfig.Buildings.private.required,
    ];
    const IslandPropertyLotCount = RequiredBuildingList.length;

    for (let i = 0; i < IslandPropertyLotCount; i++) {
      const isCivic = i < CivicRequiredBuildingCount;
      const buildingName = RequiredBuildingList[i];
      const { newBuilding, newOrganization } = await createNewLotAndBuilding(
        newIsland._id,
        buildingName,
        isCivic
      );
      await createJobPositions(
        newIsland._id,
        newOrganization._id,
        newBuilding._id,
        newBuilding.name
      );
    }

    for await (let job of JobPosition.find()) {
      console.log(job);
      job.
      const character = await generateCharacter(
        characterGenStepsEnum.characterBasicDetails,
        { 
          jobTitle: job.title,
          jobSalary: job.salary
        }
      );
      console.log(character);
    }
  } catch (e) {
    console.error("Error:", e);
  } finally {
    mongoose.disconnect();
  }
};

main();
