//import
const {
    Island,
    Area,
    IslandPropertyLot,
    Building,
    Organization,
    JobPosition,
    Character,
    CharacterTrait,
    Trait,
  } = require('./models');

  const buildingDataConfig = require('./data_collections/Buildings.json');
// setup
const newIsland = {"name":"NewIsland_"+(new Date().toLocaleString("fr-CA").replace(/[,| ]/g,'')), "location":"Puget Sound, Wa, USA", "areas": [], "description":"a new generated island"};

const islandObject = Island.create({"name":newIsland.name,"description":newIsland.description, "location":newIsland.location, "areas":newIsland.areas});
const newGeneralArea = Area.create({ island_id: islandObject.island_id, type: "general", name: "general area", income_level: "$$", description: "General Area Whole Island" });
const CivicRequiredBuildingCount = buildingDataConfig.Buildings.civic.required.length;
const RequiredBuildingList = buildingDataConfig.Buildings.civic.required.concat(buildingDataConfig.Buildings.private.required);
const IslandPropertyLotCount = RequiredBuildingList.length;
// add required lots and buildings
for(let i = 0; i<IslandPropertyLotCount; i++){
    // gen lot
    const newLotIsCivic = (i+1) < CivicRequiredBuildingCount ? 'Civic' : 'Private';
    const newLotBuildingName = RequiredBuildingList[i];

    const newLotObject = IslandPropertyLot.create({island_id: islandObject.island_id, type: newLotIsCivic, coordinates: "0,0", description: "new lot: " + newLotBuildingName });
    
    
    // while not visualized lot id doesn't matter so just create building, TODO: when visualize generate all lots, then choose buildings seperate steps
    const tempBuildingDesc = "describe this building"; // get from building config file?
    const tempBuildingLocation = "Location Address"; // to do move to lot file exclusively
     // choose building
    const newBuildingObject = Building.create({lot_id: newLotObject.lot_id, type: newLotBuildingName, name: newLotBuildingName, address: tempBuildingLocation, description: tempBuildingDesc});
   

    // create organization if not already exist
    // create job positions list
}

// for each job position unique 
    // create character basic details
    // add some traits

/* /
create new island, save id
Choose Buildings
Place Required Buildings
    Place Buildings with Set Lot Locations
    Randomly place remaining required buildings in random but suitable lot locations
Place Optional Buildings randomly in remaining commercial lots. 

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