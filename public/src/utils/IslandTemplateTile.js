const apiInterface = () => {
  return {
    getNPCKeyList: () => {
      return [
        "EllieTupee",
        "AddisonClark",
        "AndiMcNuttly",
        "BettyLast",
        "BriannaClark",
        "BriggsLast",
        "BrittanyConnors",
        "ChadEllington",
        "CharlieMallard",
        "ChealseaKing",
        "ChristianLumley",
        "ClaraDickson",
        "DaeHoNyguen",
        "DanteVenezia",
        "DarrelEason",
        "DylanMcNuttly",
        "HenryTurner",
        "JaviLopez",
        "JeanWong",
        "JenSlate",
        "JoeRomano",
        "KarenOMalley",
        "KatieCarrington",
        "KelleighHawk",
        "KennyMcNeil",
        "KonanNoah",
        "KorganLuna",
        "KovaApak",
        "KyleSueco",
        "LauraHale",
        "LennyCarver",
        "LindaLast",
        "LindseyLast",
        "LukasMallard",
        "LynnMcNeil",
        "MandyLast",
        "MaraMcNeil",
        "MarieLast",
        "MarissabelLast",
        "MarkDickson",
        "MateoRomano",
        "MelindaCooper",
        "MikeCarpenter",
        "MitchBrowning",
        "NataliaChenchko",
        "PeteyOBrian",
        "RyderKonieg",
        "ScottAnkor",
        "ShannonDickson",
        "StephanieVenezia",
        "TeddyMcNuttly",
        "WalterMcNeil",
        "WesLast",
      ];
    },
    getBuildings: () => {
      return [
        {
          id: "townhalltabernacle",
          name: "The Tabernacle",
          location: { x: 775, y: 1080 },
          lotDetails: { imgFileSrc: "TownHall2x.png", BGKey: "BGTabernacle", imgSize: { x: 160*1.15, y: 171*1.15 }, },
        },
        {
          id: "RedRoofHouse10",
          name: "House",
          location: { x: 1200, y: 1100 },
          lotDetails: { imgFileSrc: "houseRedRoof12x.png", BGKey: "BGBar" },
        },
        {
          id: "MayorsHouse10",
          name: "Mayors House",
          location: { x: 895, y: 960 },
          lotDetails: { imgFileSrc: "MayorsHouse2x.png", BGKey: "BGBar", NPCKey: "ChristianLumley" },
        },
        {
          id: "Gym",
          name: "Buff Gym",
          location: { x: 560, y: 1280 },
          lotDetails: { 
            imgSize: { x: 460 * .21, y: 509 *.21 }, imgFileSrc: "gymHalf.png", BGKey: "BGGym", NPCKey: "ChadEllington" },
        },
        {
          id: "FamilyHouse",
          name: "Family Home",
          location: { x: 240, y: 1200 },
          lotDetails: {
            imgFileSrc: "Hospital2x.png",
            BGKey: "BGMedical",
            NPCKey: "BriannaClark",
            actions: [
              { text: "Shop"},
            ],
          },
        },
        {
          id: "Hospital",
          name: "Medical Center",
          location: { x: 500, y: 800 },
          lotDetails: {
            imgFileSrc: "MedicalHALF.png",
            BGKey: "BGMedical",
            NPCKey: "BriannaClark",
            actions: [
              { text: "Heal"},
              { text: "Shop"},
            ],
          },
        },
        {
          id: "BaitShop",
          name: "Early Bird Gets the Worm Bait Shop",
          location: { x: 807, y: 1970 },
          lotDetails: {
            imgFileSrc: "baitshopHalf.png",
            BGKey: "BGBaitshop",
            NPCKey: "LukasMallard",
            actions: [
              { text: "Shop"},
            ],
          },
        },
        {
          id: "Marina",
          name: "Harbor Master",
          location: { x: 740, y: 1630 },
          lotDetails: {
            imgFileSrc: "Marina2x.png",
            BGKey: "BGMarina",
            NPCKey: "AndiMcNuttly",
            imgSize: { x: 869 / 5.8, y: 795 / 5.8 },
          },
        },
        {
          id: "ClothingStore",
          name: "Sister's Closet",
          location: { x: 424, y: 1550 },
          lotDetails: {
            imgFileSrc: "ClothingStore2x.png",
            BGKey: "BGClothes",
            imgSize: { x: 922 / 8, y: 1039 / 8 },
            NPCKey: "MateoRomano",
            actions: [
              { text: "Shop"},
              { text: "Information"},
            ],
          },
        },
        {
          id: "School",
          name: "School",
          location: { x: 425, y: 1275 },
          lotDetails: {
            imgFileSrc: "School2x.png",
            BGKey: "BGSchool",
            imgSize: { x: 927 / 8, y: 1085 / 8 },
            NPCKey: "HenryTurner",
            actions: [
              { text: "Shop"},
              { text: "Information"},
            ],
          },
        },
        {
          id: "GeneralStore",
          name: "FoodTown",
          location: { x: 296, y: 1405 },
          lotDetails: {
            imgFileSrc: "GeneralStore2x.png",
            BGKey: "BGFoodTown",
            imgSize: { x: 964 / 8, y: 1013 / 8 },
            NPCKey: "MarkDickson",
            actions: [
              { text: "Sell All Crab"},
            ],
          },
        },
        {
          id: "Bakery",
          name: "Batter's Up Bakery",
          location: { x: 510, y: 1150 },
          lotDetails: {
            imgFileSrc: "Bakery2x.png",
            BGKey: "BGBakery",
            imgSize: { x: 977 / 8, y: 1181 / 8 },
            NPCKey: "BettyLast",
            actions: [
              { text: "Shop"},
              { text: "Information"},
            ],
          },
        },
        {
          id: "Police",
          name: "Police",
          location: { x: 427, y: 1405 },
          lotDetails: {
            imgFileSrc: "Police2x.png",
            BGKey: "BGPolice",
            imgSize: { x: 975 / 8.25, y: 1012 / 8.25 },
            NPCKey: "CharlieMallard",
            actions: [
              { text: "Shop"},
              { text: "Information"},
            ],
          },
        },
        {
          id: "Resturant1",
          name: "Off The Hook",
          location: { x: 1666, y: 1225 },
          lotDetails: {
            imgFileSrc: "Resturant12x.png",
            BGKey: "BGCafe", // Update
            imgSize: { x: 899 / 5, y: 470 / 5 },
            NPCKey: "ScottAnkor",
            actions: [
              { text: "Invite Date"},
              { text: "Order Takeout"},
            ],
          },
        },
        {
          id: "Lighthouse",
          name: "Lighthouse B&B",
          location: { x: 1164, y: 1615 },
          lotDetails: {
            imgFileSrc: "Lighthouse2x.png",
            BGKey: "BGHotel", // Lighthouse
            imgSize: { x: 1024 / 5, y: 1076 / 5 },
            NPCKey: "AddisonClark",
            actions: [
              { text: "Invite Date"},
              { text: "Order Takeout"},
              { text: "Chat w/ Bri"},
            ],
          },
        },
        {
          id: "PlayerCabin",
          name: "Homestead",
          location: { x: 1100, y: 1230 },
          lotDetails: {
            imgFileSrc: "pnwHouse2x.png",
            //BGKey: "BGCabin0"
            imgSize: { x: 1024 / 9.2, y: 949 / 9.2 },
            actions: [
              { text: "Sleep"},
              { text: "Storage"},
            ],
          },
        },
      ];
    },
    getJobPositions: () => {
      return [];
    },
    getCharacterSchedule: (id) => {
      let characterSchedules = [];
      const matchID = function (schedule) {
        if (schedule.character_id === id) {
          return schedule;
        }
        return null;
      };
      return characterSchedules.map(matchID);
    },
    getCharacters: () => {
      return [
        {
          id: "000000000000000000000001",
          island_id: "66dc506deaae235d2dbe4a3a",
          is_npc: false,
          is_active: true,
          nameObj: {
            first: "Ellie",
            last: "Wigg",
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
      ];
    },
    getBackgroundImages: () => {
      return ["BGDocks", "BGMarina", "BGGym", "BGFoodTown", "BGMedical", "BGSchool", "BGCafe", "BGClothes","BGPolice"];
    }
  };
};

const GUIElements = [
  {
    x: 200,
    y: -150,
    h: 150,
    w: 600,
    GUIType: "Panel",
    text: "Inventory",
  },
  {
    x: 0,
    y: -200,
    h: 200,
    w: 200,
    GUIType: "PlayerProfileImageCirclePanel",
    isCircle: true,
    text: "Ellie Tupee",
  },
  {
    x: 800,
    y: -200,
    h: 200,
    w: 200,
    GUIType: "Panel",
    PanelType: "Detail",
    text: "UI Details Options",
  },
  {
    x: 300,
    y: 300,
    h: 200,
    w: 400,
    GUIType: "AlertWindow",
    title: "Welcome Newcomer!",
    text: "Lukas Swan Introduces himself...",
  },
];

export const IslandTemplate = {
  NPCKEYS: apiInterface().getNPCKeyList(),
  BGKeys: apiInterface().getBackgroundImages(),
  Residents: apiInterface().getCharacters(),
  Buildings: apiInterface().getBuildings(),
  sceneImageLayers: {
    bg: "bg",
    path: "path",
    buildings: "buildings",
    foliage: "",
  },
  Image: {
    source: "images/SnugIslandminEmpty.png",
    size: { x: 2048 + 16, y: 2048 },
  },
  INPUTKEY_TO_STATE_MAP: {
    KeyW: "isMovingUp",
    ArrowUp: "isMovingUp",
    KeyS: "isMovingDown",
    ArrowDown: "isMovingDown",
    KeyA: "isMovingLeft",
    ArrowLeft: "isMovingLeft",
    KeyD: "isMovingRight",
    ArrowRight: "isMovingRight",
  },
  KEYCODEMAP: {
    KeyW: 1,
    ArrowUp: 1,
    KeyS: 3,
    ArrowDown: 3,
    KeyA: 4,
    ArrowLeft: 4,
    KeyD: 2,
    ArrowRight: 2,
  },
  DEFAULTLOTPROPERTIES: {
    size: { width: 32, height: 32 },
    zoneType: "Commercial",
    price: 100000,
    fillColor: "#000000",
  },
  VIEW_ZOOM_SETTINGS: [.15, .3, .4, .6, .8, .9, 1.2],
  VIEW_ZOOM_SETTING: 5,
  VIEW_ZOOM_MULTIPLIER: 7.5,
  GUIElements: GUIElements,
};
