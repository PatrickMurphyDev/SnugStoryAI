import ArrayShuffle from "./ArrayShuffle";
import { IslandTemplate } from "./IslandTemplateTile";

const hexChars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const randColorHex = function(){
  let r = hexChars[Math.floor(Math.random() * 16)];
  let g = hexChars[Math.floor(Math.random() * 16)];
  let b = hexChars[Math.floor(Math.random() * 16)];
  let randColorHex = "#" + r + r + g + g + b + b;
  return randColorHex;
}
// Extract and shuffle required and optional building names
const civicLotNamesReq = ArrayShuffle([...IslandTemplate.Buildings.civic.required]);
const civicLotNamesOpt = ArrayShuffle([...IslandTemplate.Buildings.civic.optional]);
const publicLotNamesReq = ArrayShuffle([...IslandTemplate.Buildings.private.required]);
const publicLotNamesOpt = ArrayShuffle([...IslandTemplate.Buildings.private.optional]);

// Concatenate all lot names into a single array
const lotNames = [
  ...civicLotNamesReq,
  ...publicLotNamesReq,
  ...civicLotNamesOpt,
  ...publicLotNamesOpt,
];

// Generate a lot with random name and color
let LotChoiceIndex = 0;
const genLot = function () {
  //[Math.floor(Math.random()*lotNames.length)]
  return {
    name: lotNames[LotChoiceIndex++],
    fillColor: randColorHex(),
  };
};

// set coords of each residential lot 
// COUNT=====16
const resLotPos = IslandTemplate.Buildings.residential;

// set each non residential lot
// COUNT = 19
let lotPos = IslandTemplate.Buildings.nonResidential;

let Residents = IslandTemplate.Residents;

export { resLotPos, lotPos, Residents };
