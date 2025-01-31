// Import the filesystem module
const fs = require("fs");

// Example input JSON data

let inputData = {
  Item1: {
    id: 1,
    key: "Item1",
    type: 1,
    name: "Item",
    icon: ["🥅", ""],
    description: "Item1 Item",
    details: {
      props: {
        weight: 1,
      },
      img: "CrabItem2",
    },
  },
  Item2: {
    id: 2,
    key: "Item2",
    type: 1,
    name: "Crab Trap",
    description: "A basic trap for catching small crabs.",
    icon: ["🥅", ""],
    details: {
      props: {
        weight: 10,
        buyPrice: 35,
        salePrice: 6,
        soldBy: "unit",
      },
      img: "CrabItem2",
    },
  },
  Item3: {
    id: 3,
    key: "Item3",
    type: 2,
    name: "Hermit Crab",
    description: "Small Crab sold as pets.",
    icon: ["🦀", "🐚"],
    details: {
      props: {
        soldBy: "unit",
        weight: 1,
        buyPrice: 7,
        salePrice: 4,
      },
      img: "CrabItem2",
    },
  },
  Item4: {
    id: 4,
    key: "Item4",
    type: 2,
    name: "Red Rock Crab",
    description: "Crab with a large claww.",
    icon: ["🦀", "🟥"],
    details: {
      props: {
        soldBy: "weight",
        weight: 2,
        buyPrice: 11,
        salePrice: 8,
      },
      img: "CrabItem",
    },
  },
  Item5: {
    id: 5,
    key: "Item5",
    type: 2,
    name: "Snow Crab",
    description: "Long sweet tasting legs on this crab.",
    icon: ["🦀", "❄️"],
    details: {
      props: {
        soldBy: "weight",
        weight: 2.8,
        buyPrice: 16,
        salePrice: 12,
      },
      img: "CrabItem",
    },
  },
  Item6: {
    id: 6,
    key: "Item6",
    type: 2,
    name: "Dungeness Crab",
    description: "The bread and butter of the crabbing industry.",
    icon: ["🦀", ""],
    details: {
      props: {
        soldBy: "weight",
        weight: 3.5,
        buyPrice: 20,
        salePrice: 15,
      },
      img: "CrabItem",
    },
  },
  Item7: {
    id: 7,
    key: "Item7",
    type: 2,
    name: "King Crab",
    description: "The crab to rule them all.",
    icon: ["🦀", "👑"],
    details: {
      props: {
        soldBy: "weight",
        weight: 13,
        buyPrice: 55,
        salePrice: 32,
      },
      img: "CrabItem2",
    },
  },
  Item8: {
    id: 8,
    key: "Item8",
    type: 2,
    name: "Crab Bait",
    description: "Crab can't resist chicken liver.",
    icon: ["🦀", "B"],
    details: {
      props: {
        soldBy: "weight",
        weight: 1,
        buyPrice: 2,
        salePrice: 1,
      },
      img: "CrabItem2",
    },
  },
  Item9: {
    id: 9,
    icon: ["🍷", ""],
    key: "Item9",
    type: 1,
    name: "Red Wine Bottle",
    description: "A fine bottle of red wine, perfect for a romantic evening.",
    details: {
      props: {
        weight: 1,
        buyPrice: 40,
        salePrice: 25,
        soldBy: "unit",
        soldAt: ["Bar", "B&B in an Old Lighthouse", "Seafood Restaurant"],
      },
      img: "CrabItem2",
    },
  },
  Item10: {
    id: 10,
    icon: ["🍝", ""],
    key: "Item10",
    type: 1,
    name: "Spaghetti Dinner",
    description:
      "A delicious spaghetti meal for two. Sets the perfect romantic mood.",
    details: {
      props: {
        weight: 1,
        buyPrice: 30,
        salePrice: 20,
        soldBy: "unit",
        soldAt: ["Seafood Restaurant", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item11: {
    id: 11,
    icon: ["🍰", ""],
    key: "Item11",
    type: 1,
    name: "Slice of Cake",
    description: "A sweet treat to share, adding charm to any date.",
    details: {
      props: {
        weight: 1,
        buyPrice: 12,
        salePrice: 8,
        soldBy: "unit",
        soldAt: ["Cafe", "Bakery", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item12: {
    id: 12,
    icon: ["🍓", ""],
    key: "Item12",
    type: 1,
    name: "Strawberries",
    description: "A box of fresh strawberries. Simple yet romantic.",
    details: {
      props: {
        weight: 1,
        buyPrice: 8,
        salePrice: 5,
        soldBy: "unit",
        soldAt: ["General Store", "Cafe", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item13: {
    id: 13,
    icon: ["💐", ""],
    key: "Item13",
    type: 1,
    name: "Bouquet of Flowers",
    description: "A colorful bouquet that is sure to impress.",
    details: {
      props: {
        weight: 1,
        buyPrice: 25,
        salePrice: 15,
        soldBy: "unit",
        soldAt: ["General Store", "Cafe", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item14: {
    id: 14,
    icon: ["🌹", ""],
    key: "Item14",
    type: 1,
    name: "Single Rose",
    description: "A romantic gesture in its simplest form.",
    details: {
      props: {
        weight: 1,
        buyPrice: 10,
        salePrice: 5,
        soldBy: "unit",
        soldAt: ["General Store", "Cafe"],
      },
      img: "CrabItem2",
    },
  },
  Item15: {
    id: 15,
    icon: ["🕯️", ""],
    key: "Item15",
    type: 1,
    name: "Candle Set",
    description: "Elegant candles to light up a romantic dinner.",
    details: {
      props: {
        weight: 1,
        buyPrice: 15,
        salePrice: 10,
        soldBy: "unit",
        soldAt: ["General Store", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item16: {
    id: 16,
    icon: ["🍤", ""],
    key: "Item16",
    type: 1,
    name: "Shrimp Platter",
    description: "A luxurious seafood platter for two.",
    details: {
      props: {
        weight: 1,
        buyPrice: 35,
        salePrice: 20,
        soldBy: "unit",
        soldAt: ["Seafood Restaurant", "Bar"],
      },
      img: "CrabItem2",
    },
  },
  Item17: {
    id: 17,
    icon: ["🍪", ""],
    key: "Item17",
    type: 1,
    name: "Box of Cookies",
    description: "A box of freshly baked cookies. Perfect for a cozy date.",
    details: {
      props: {
        weight: 1,
        buyPrice: 18,
        salePrice: 12,
        soldBy: "unit",
        soldAt: ["Bakery", "Cafe", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item18: {
    id: 18,
    icon: ["🍹", ""],
    key: "Item18",
    type: 1,
    name: "Tropical Cocktails",
    description:
      "A pair of colorful tropical drinks to set a fun and flirty tone.",
    details: {
      props: {
        weight: 1,
        buyPrice: 25,
        salePrice: 15,
        soldBy: "unit",
        soldAt: ["Bar", "Seafood Restaurant"],
      },
      img: "CrabItem2",
    },
  },
  Item19: {
    id: 19,
    icon: ["🍇", "🧀"],
    key: "Item19",
    type: 1,
    name: "Grapes and Cheese Plate",
    description: "A refined plate of grapes and assorted cheeses.",
    details: {
      props: {
        weight: 1,
        buyPrice: 28,
        salePrice: 18,
        soldBy: "unit",
        soldAt: ["Bar", "Seafood Restaurant", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item20: {
    id: 20,
    icon: ["🎶"],
    key: "Item20",
    type: 1,
    name: "Portable Music Player",
    description: "Play soft tunes for a romantic ambiance.",
    details: {
      props: {
        weight: 1,
        buyPrice: 75,
        salePrice: 50,
        soldBy: "unit",
        soldAt: ["General Store", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item21: {
    id: 21,
    icon: ["☕", "☕"],
    key: "Item21",
    type: 1,
    name: "Coffee for Two",
    description:
      "Warm cups of coffee to share during an intimate conversation.",
    details: {
      props: {
        weight: 1,
        buyPrice: 12,
        salePrice: 8,
        soldBy: "unit",
        soldAt: ["Cafe", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item22: {
    id: 22,
    icon: ["🍯", ""],
    key: "Item22",
    type: 1,
    name: "Jar of Honey",
    description: "A sweet gift with a heartfelt touch.",
    details: {
      props: {
        weight: 1,
        buyPrice: 25,
        salePrice: 15,
        soldBy: "unit",
        soldAt: ["Cafe", "General Store", "Bakery"],
      },
      img: "CrabItem2",
    },
  },
  Item23: {
    id: 23,
    icon: ["🥖", ""],
    key: "Item23",
    type: 1,
    name: "Fresh Baguette",
    description: "A warm baguette, perfect for a romantic picnic.",
    details: {
      props: {
        weight: 1,
        buyPrice: 10,
        salePrice: 5,
        soldBy: "unit",
        soldAt: ["Bakery", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item24: {
    id: 24,
    icon: ["🌸", ""],
    key: "Item24",
    type: 1,
    name: "Cherry Blossom Branch",
    description: "A delicate branch of cherry blossoms to set a serene tone.",
    details: {
      props: {
        weight: 1,
        buyPrice: 30,
        salePrice: 20,
        soldBy: "unit",
        soldAt: ["General Store", "Cafe", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item25: {
    id: 25,
    icon: ["🦀", ""],
    key: "Item25",
    type: 1,
    name: "Crab",
    description:
      "A common crab, freshly caught. The foundation of your business.",
    details: {
      props: {
        weight: 1,
        buyPrice: 20,
        salePrice: 15,
        soldBy: "unit",
        soldAt: ["Seafood Restaurant", "Fishing & Bait Shop", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item26: {
    id: 26,
    icon: ["🪝", ""],
    key: "Item26",
    type: 1,
    name: "Basic Crab Trap",
    description:
      "A simple crab trap. Catches a small number of crabs over time.",
    details: {
      props: {
        weight: 1,
        buyPrice: 70,
        salePrice: 50,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item27: {
    id: 27,
    icon: ["⚓", ""],
    key: "Item27",
    type: 1,
    name: "Weighted Crab Trap",
    description:
      "A sturdy trap that works well in deeper waters for higher crab yields.",
    details: {
      props: {
        weight: 1,
        buyPrice: 150,
        salePrice: 100,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop", "Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item28: {
    id: 28,
    icon: ["🚤", ""],
    key: "Item28",
    type: 1,
    name: "Small Fishing Boat",
    description:
      "A small motorboat, enabling access to more productive fishing spots.",
    details: {
      props: {
        weight: 1,
        buyPrice: 750,
        salePrice: 500,
        soldBy: "unit",
        soldAt: ["Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item29: {
    id: 29,
    icon: ["🛥️", ""],
    key: "Item29",
    type: 1,
    name: "Mid-Range Fishing Boat",
    description: "A mid-sized boat with more storage for crabs and traps.",
    details: {
      props: {
        weight: 1,
        buyPrice: 1500,
        salePrice: 1000,
        soldBy: "unit",
        soldAt: ["Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item30: {
    id: 30,
    icon: ["🐟", ""],
    key: "Item30",
    type: 1,
    name: "Fish Bait",
    description: "A container of fish scraps used to lure crabs into traps.",
    details: {
      props: {
        weight: 1,
        buyPrice: 10,
        salePrice: 5,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item31: {
    id: 31,
    icon: ["🧪", ""],
    key: "Item31",
    type: 1,
    name: "Health Potion",
    description:
      "A potion that restores a significant amount of health when consumed.",
    details: {
      props: {
        weight: 1,
        buyPrice: 50,
        salePrice: 30,
        soldBy: "unit",
        soldAt: ["General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item32: {
    id: 32,
    icon: ["🧪", ""],
    key: "Item32",
    type: 1,
    name: "Scent Booster",
    description: "A chemical booster to increase the effectiveness of bait.",
    details: {
      props: {
        weight: 1,
        buyPrice: 30,
        salePrice: 20,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop"],
      },
      img: "CrabItem2",
    },
  },
  Item33: {
    id: 33,
    icon: ["🪝", ""],
    key: "Item33",
    type: 1,
    name: "Advanced Crab Trap",
    description: "A premium trap with better efficiency and durability.",
    details: {
      props: {
        weight: 1,
        buyPrice: 300,
        salePrice: 200,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop", "Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item34: {
    id: 34,
    icon: ["🔧", ""],
    key: "Item34",
    type: 1,
    name: "Trap Repair Kit",
    description: "A kit to repair damaged traps and extend their lifespan.",
    details: {
      props: {
        weight: 1,
        buyPrice: 25,
        salePrice: 15,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item35: {
    id: 35,
    icon: ["🌊", ""],
    key: "Item35",
    type: 1,
    name: "Sonar Device",
    description: "A device to locate high-density crab areas in deeper waters.",
    details: {
      props: {
        weight: 1,
        buyPrice: 750,
        salePrice: 500,
        soldBy: "unit",
        soldAt: ["Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item36: {
    id: 36,
    icon: ["⚙️", ""],
    key: "Item36",
    type: 1,
    name: "Boat Engine Upgrade",
    description:
      "Increases boat speed, enabling faster trips to crab-rich waters.",
    details: {
      props: {
        weight: 1,
        buyPrice: 500,
        salePrice: 300,
        soldBy: "unit",
        soldAt: ["Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item37: {
    id: 37,
    icon: ["💡", ""],
    key: "Item37",
    type: 1,
    name: "Night Vision Lamp",
    description:
      "A powerful lamp for nighttime crabbing, allowing for extended operations.",
    details: {
      props: {
        weight: 1,
        buyPrice: 400,
        salePrice: 250,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item38: {
    id: 38,
    icon: ["🛳️", ""],
    key: "Item38",
    type: 1,
    name: "Luxury Fishing Vessel",
    description:
      "A top-tier fishing vessel with massive storage and crab sorting technology.",
    details: {
      props: {
        weight: 1,
        buyPrice: 5000,
        salePrice: 3000,
        soldBy: "unit",
        soldAt: ["Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item39: {
    id: 39,
    icon: ["📦", ""],
    key: "Item39",
    type: 1,
    name: "Crab Storage Box",
    description: "A durable container for safely storing crabs on the go.",
    details: {
      props: {
        weight: 1,
        buyPrice: 75,
        salePrice: 50,
        soldBy: "unit",
        soldAt: ["General Store", "Fishing & Bait Shop"],
      },
      img: "CrabItem2",
    },
  },
  Item40: {
    id: 40,
    icon: ["🌡️", ""],
    key: "Item40",
    type: 1,
    name: "Water Temperature Gauge",
    description:
      "Measures water temperature to help locate optimal crab habitats.",
    details: {
      props: {
        weight: 1,
        buyPrice: 250,
        salePrice: 150,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop", "Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item41: {
    id: 41,
    icon: ["🪙", ""],
    key: "Item41",
    type: 1,
    name: "Crab Sorting Table",
    description:
      "Increases efficiency by sorting crabs into sellable and keepable sizes.",
    details: {
      props: {
        weight: 1,
        buyPrice: 450,
        salePrice: 300,
        soldBy: "unit",
        soldAt: ["General Store", "Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item42: {
    id: 42,
    icon: ["🍯", ""],
    key: "Item42",
    type: 1,
    name: "Jar of Honey",
    description:
      "A jar of golden honey. Restores energy and can be used in cooking.",
    details: {
      props: {
        weight: 1,
        buyPrice: 25,
        salePrice: 15,
        soldBy: "unit",
        soldAt: ["Cafe", "General Store", "Bakery"],
      },
      img: "CrabItem2",
    },
  },
  Item43: {
    id: 43,
    icon: ["🥛", ""],
    key: "Item43",
    type: 1,
    name: "Bottle of Milk",
    description:
      "A fresh bottle of milk. Can be consumed for a small energy boost or used in recipes.",
    details: {
      props: {
        weight: 1,
        buyPrice: 15,
        salePrice: 10,
        soldBy: "unit",
        soldAt: ["Cafe", "B&B in an Old Lighthouse", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item44: {
    id: 44,
    icon: ["🥚", ""],
    key: "Item44",
    type: 1,
    name: "Egg Carton",
    description:
      "A carton of fresh eggs. A staple ingredient for many recipes.",
    details: {
      props: {
        weight: 1,
        buyPrice: 12,
        salePrice: 8,
        soldBy: "unit",
        soldAt: ["Bakery", "General Store", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item45: {
    id: 45,
    icon: ["🍋", ""],
    key: "Item45",
    type: 1,
    name: "Lemon",
    description: "A tart and juicy lemon. Perfect for beverages or cooking.",
    details: {
      props: {
        weight: 1,
        buyPrice: 8,
        salePrice: 5,
        soldBy: "unit",
        soldAt: ["Cafe", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item46: {
    id: 46,
    icon: ["🫖", ""],
    key: "Item46",
    type: 1,
    name: "Teapot",
    description: "A charming teapot for brewing tea. Popular with locals.",
    details: {
      props: {
        weight: 1,
        buyPrice: 30,
        salePrice: 20,
        soldBy: "unit",
        soldAt: ["Cafe", "General Store", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item47: {
    id: 47,
    icon: ["🌮", ""],
    key: "Item47",
    type: 1,
    name: "Taco",
    description:
      "A deliciously stuffed taco. Restores a moderate amount of hunger.",
    details: {
      props: {
        weight: 1,
        buyPrice: 18,
        salePrice: 12,
        soldBy: "unit",
        soldAt: ["Bar", "Seafood Restaurant"],
      },
      img: "CrabItem2",
    },
  },
  Item48: {
    id: 48,
    icon: ["🍶", ""],
    key: "Item48",
    type: 1,
    name: "Bottle of Sake",
    description: "A bottle of fine sake. Popular at celebrations.",
    details: {
      props: {
        weight: 1,
        buyPrice: 40,
        salePrice: 25,
        soldBy: "unit",
        soldAt: ["Bar", "Seafood Restaurant", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item49: {
    id: 49,
    icon: ["🍵", ""],
    key: "Item49",
    type: 1,
    name: "Cup of Tea",
    description: "A warm cup of tea that restores energy and boosts focus.",
    details: {
      props: {
        weight: 1,
        buyPrice: 15,
        salePrice: 10,
        soldBy: "unit",
        soldAt: ["Cafe", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item50: {
    id: 50,
    icon: ["🧀", ""],
    key: "Item50",
    type: 1,
    name: "Cheese Wheel",
    description: "A hearty wheel of cheese. Perfect for meals or snacks.",
    details: {
      props: {
        weight: 1,
        buyPrice: 30,
        salePrice: 20,
        soldBy: "unit",
        soldAt: ["General Store", "B&B in an Old Lighthouse", "Cafe"],
      },
      img: "CrabItem2",
    },
  },
  Item51: {
    id: 51,
    icon: ["🥥", ""],
    key: "Item51",
    type: 1,
    name: "Coconut",
    description: "A tropical fruit with refreshing water and tasty flesh.",
    details: {
      props: {
        weight: 1,
        buyPrice: 20,
        salePrice: 15,
        soldBy: "unit",
        soldAt: ["General Store", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item52: {
    id: 52,
    icon: ["🍺", ""],
    key: "Item52",
    type: 1,
    name: "Mug of Ale",
    description: "A refreshing mug of ale, perfect after a long day.",
    details: {
      props: {
        weight: 1,
        buyPrice: 18,
        salePrice: 12,
        soldBy: "unit",
        soldAt: ["Bar", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item53: {
    id: 53,
    icon: ["🍦", ""],
    key: "Item53",
    type: 1,
    name: "Ice Cream Cone",
    description: "A sweet and cold treat. Restores a small amount of energy.",
    details: {
      props: {
        weight: 1,
        buyPrice: 12,
        salePrice: 8,
        soldBy: "unit",
        soldAt: ["Cafe", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item54: {
    id: 54,
    icon: ["🫧", ""],
    key: "Item54",
    type: 1,
    name: "Bubble Wand",
    description: "A fun toy that creates shimmering bubbles.",
    details: {
      props: {
        weight: 1,
        buyPrice: 10,
        salePrice: 5,
        soldBy: "unit",
        soldAt: ["General Store", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item55: {
    id: 55,
    icon: ["🪴", ""],
    key: "Item55",
    type: 1,
    name: "Potted Plant",
    description: "A decorative potted plant to brighten up any space.",
    details: {
      props: {
        weight: 1,
        buyPrice: 25,
        salePrice: 18,
        soldBy: "unit",
        soldAt: ["General Store", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
  Item56: {
    id: 56,
    icon: ["🍹", ""],
    key: "Item56",
    type: 1,
    name: "Fruit Cocktail",
    description: "A refreshing mix of fruits in a chilled drink.",
    details: {
      props: {
        weight: 1,
        buyPrice: 25,
        salePrice: 15,
        soldBy: "unit",
        soldAt: ["Bar", "Cafe"],
      },
      img: "CrabItem2",
    },
  },
  Item57: {
    id: 57,
    icon: ["🍎", ""],
    key: "Item57",
    type: 1,
    name: "Apple",
    description:
      "A fresh, juicy apple. Restores a small amount of hunger and energy.",
    details: {
      props: {
        weight: 1,
        buyPrice: 8,
        salePrice: 5,
        soldBy: "unit",
        soldAt: ["Cafe", "General Store", "Bakery"],
      },
      img: "CrabItem2",
    },
  },
  Item58: {
    id: 58,
    icon: ["🌾", ""],
    key: "Item58",
    type: 1,
    name: "Wheat Bundle",
    description: "A bundle of wheat. Useful for crafting or feeding livestock.",
    details: {
      props: {
        weight: 1,
        buyPrice: 15,
        salePrice: 10,
        soldBy: "unit",
        soldAt: ["General Store", "Bakery"],
      },
      img: "CrabItem2",
    },
  },
  Item59: {
    id: 59,
    icon: ["🍞", ""],
    key: "Item59",
    type: 1,
    name: "Loaf of Bread",
    description:
      "A freshly baked loaf of bread. Restores a moderate amount of hunger.",
    details: {
      props: {
        weight: 1,
        buyPrice: 18,
        salePrice: 12,
        soldBy: "unit",
        soldAt: ["Bakery", "Cafe", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item60: {
    id: 60,
    icon: ["🌊", ""],
    key: "Item60",
    type: 1,
    name: "Ocean Water",
    description:
      "A bottle of seawater. Can be used for certain crafting recipes or farming tasks.",
    details: {
      props: {
        weight: 1,
        buyPrice: 5,
        salePrice: 3,
        soldBy: "unit",
        soldAt: ["Marina Office", "Fishing & Bait Shop"],
      },
      img: "CrabItem2",
    },
  },
  Item61: {
    id: 61,
    icon: ["🪵", ""],
    key: "Item61",
    type: 1,
    name: "Wood Plank",
    description: "A sturdy plank of wood, essential for building and crafting.",
    details: {
      props: {
        weight: 1,
        buyPrice: 12,
        salePrice: 8,
        soldBy: "unit",
        soldAt: ["General Store", "Marina Office"],
      },
      img: "CrabItem2",
    },
  },
  Item62: {
    id: 62,
    icon: ["🍀", ""],
    key: "Item62",
    type: 1,
    name: "Lucky Clover",
    description:
      "A rare four-leaf clover. Increases luck temporarily when held.",
    details: {
      props: {
        weight: 1,
        buyPrice: 30,
        salePrice: 20,
        soldBy: "unit",
        soldAt: ["B&B in an Old Lighthouse", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item63: {
    id: 63,
    icon: ["🎣", ""],
    key: "Item63",
    type: 1,
    name: "Fishing Rod",
    description:
      "A sturdy fishing rod. Essential for catching fish and other aquatic creatures.",
    details: {
      props: {
        weight: 1,
        buyPrice: 60,
        salePrice: 40,
        soldBy: "unit",
        soldAt: ["Fishing & Bait Shop", "Marina Office", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item64: {
    id: 64,
    icon: ["🪙", ""],
    key: "Item64",
    type: 1,
    name: "Gold Coin",
    description: "A shiny gold coin. Valuable currency accepted everywhere.",
    details: {
      props: {
        weight: 1,
        buyPrice: 200,
        salePrice: 100,
        soldBy: "unit",
        soldAt: ["General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item65: {
    id: 65,
    icon: ["🐟", ""],
    key: "Item65",
    type: 1,
    name: "Fresh Fish",
    description:
      "A freshly caught fish. Can be sold, cooked, or used in crafting recipes.",
    details: {
      props: {
        weight: 1,
        buyPrice: 15,
        salePrice: 10,
        soldBy: "unit",
        soldAt: ["Seafood Restaurant", "Fishing & Bait Shop", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item66: {
    id: 66,
    icon: ["🍇", ""],
    key: "Item66",
    type: 1,
    name: "Grapes",
    description:
      "A bunch of juicy grapes. Restores a small amount of energy and hunger.",
    details: {
      props: {
        weight: 1,
        buyPrice: 10,
        salePrice: 7,
        soldBy: "unit",
        soldAt: ["Cafe", "B&B in an Old Lighthouse", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item67: {
    id: 67,
    icon: ["🎩", ""],
    key: "Item67",
    type: 1,
    name: "Top Hat",
    description: "A fancy top hat. Increases charm when worn.",
    details: {
      props: {
        weight: 1,
        buyPrice: 80,
        salePrice: 50,
        soldBy: "unit",
        soldAt: ["Clothing Store", "General Store"],
      },
      img: "CrabItem2",
    },
  },
  Item68: {
    id: 68,
    icon: ["🎨", ""],
    key: "Item68",
    type: 1,
    name: "Paint Set",
    description:
      "A set of vibrant paints. Can be used for artistic creations or customization.",
    details: {
      props: {
        weight: 1,
        buyPrice: 75,
        salePrice: 50,
        soldBy: "unit",
        soldAt: ["General Store", "B&B in an Old Lighthouse"],
      },
      img: "CrabItem2",
    },
  },
};

// Parse the input JSON data
const rawData = JSON.parse(inputData);

// Function to format the data
function formatData(rawData) {
  const formattedData = [];

  for (const key in rawData) {
    if (rawData.hasOwnProperty(key)) {
      formattedData.push(rawData[key]);
    }
  }

  return formattedData;
}

// Format the data
const formattedData = formatData(rawData);

// Output the formatted data
console.log(JSON.stringify(formattedData, null, 2));

// Optional: Save the formatted data to a file
fs.writeFileSync(
  "formattedItemsData.json",
  JSON.stringify(formattedData, null, 2)
);

console.log("Data formatted and saved to formattedItemsData.json");
