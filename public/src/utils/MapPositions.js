import ArrayShuffle from './ArrayShuffle';
import {IslandTemplate} from './IslandTemplate';

const resLotPos = [
    { x: 210, y: 736 },
    { x: 267, y: 686 },
    { x: 322, y: 611 },
    { x: 387, y: 552 },
    { x: 459, y: 504 },
    { x: 552, y: 446 },
    { x: 619, y: 411 },
    { x: 694, y: 392 },
    { x: 755, y: 386 },
    { x: 805, y: 379 },
    { x: 998, y: 771 },
    { x: 1059, y: 742 },
    { x: 1106, y: 733 },
    { x: 1176, y: 720 },
    { x: 314, y: 771 },
    { x: 790, y: 936, name: "Keeper's" },
  ];

  let charNames = ["Leah","Maureen","Rob","Justine","Deb", "Callum"];
  console.log(IslandTemplate);
  let civicLotNamesReq = IslandTemplate.Buildings.civic.required;
  let civicLotNamesOpt = IslandTemplate.Buildings.civic.optional;
  let publicLotNamesReq = IslandTemplate.Buildings.private.required;
  let publicLotNamesOpt = IslandTemplate.Buildings.private.optional;
  ArrayShuffle(civicLotNamesReq);
  ArrayShuffle(civicLotNamesOpt);
  ArrayShuffle(publicLotNamesReq);
  ArrayShuffle(publicLotNamesOpt);
  let lotNames = [...civicLotNamesReq, ...publicLotNamesReq, ...civicLotNamesOpt, ...publicLotNamesOpt];
  
  let LotChoiceIndex = 0;
  const hexChars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
  const genLot = function(){
    let r  = hexChars[Math.floor(Math.random()*16)];
    let g  = hexChars[Math.floor(Math.random()*16)];
    let b  = hexChars[Math.floor(Math.random()*16)];
    //[Math.floor(Math.random()*lotNames.length)]
    return {name: lotNames[LotChoiceIndex++], fillColor: "#"+r+r+g+g+b+b};
  }

  let lotPos = [
    { id: 0, x: 700, y: 650, name: "Town Hall", fillColor: "#aabbff" },
    { id: 1, x: 680, y: 765, name: "Fire Dept.", fillColor: "#aa0000" },
    { id: 2, x: 750, y: 800, name: "Police Dept.", fillColor: "#0000aa" },
    { id: 3, x: 615, y: 845, name: "Harbor Master", fillColor: "#008888" },
    { id: 4, x: 560, y: 800, ...genLot()},
    { id: 5, x: 490, y: 755, ...genLot()},
    { id: 6, x: 530, y: 710, name: "General Store", fillColor: "#aabbff"},
    { id: 7, x: 600, y: 740, ...genLot()},
    { id: 8, x: 648, y: 678, ...genLot()},
    { id: 9, x: 710, y: 718, ...genLot()},
    { id: 10, x: 758, y: 570, ...genLot()},
    { id: 11, x: 804, y: 600, ...genLot()},
    { id: 12, x: 816, y: 842, ...genLot()},
    { id: 13, x: 488, y: 610, ...genLot()},
    { id: 14, x: 620, y: 528, ...genLot()},
    { id: 15, x: 854, y: 930, name: "Lighthouse"},
    { id: 16, x: 906, y: 448, ...genLot()},
    { id: 17, x: 1018, y: 502, ...genLot()},
    { id: 18, x: 1170, y: 562, ...genLot()},
  ];

  charNames.forEach((v, i)=>{
    let randLot = lotPos[Math.floor(Math.random()*lotPos.length)];
    if(randLot.characters){
        randLot.characters.push(v);
    }else{
        randLot.characters = [v];
    }
  });

  export {resLotPos, lotPos};
