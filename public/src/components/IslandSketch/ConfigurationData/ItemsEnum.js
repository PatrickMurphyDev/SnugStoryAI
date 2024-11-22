export const ItemsEnum = {
  default: {
    id: 1,
    key: "default",
    type: 1,
    name: "Item",
    icon: ["🥅", ""],
    description: "Default Item",
    details: {
      props: {
        weight: 1,
      },
    },
  },
  crabtrap: {
    id: 2,
    key: "crabtrap",
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
    },
  },
  hermitcrab: {
    id: 3,
    key: "hermitcrab",
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
      img: "CrabItem2"
    },
  },
  redrockcrab: {
    id: 4,
    key: "redrockcrab",
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
      img: "CrabItem"
    },
  },
  snowcrab: {
    id: 5,
    key: "snowcrab",
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
      img: "CrabItem"
    },
  },
  dungenesscrab: {
    id: 6,
    key: "dungenesscrab",
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
      img: "CrabItem"
    },
  },
  kingcrab: {
    id: 7,
    key: "kingcrab",
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
      img: "CrabItem2"
    },
  },
  crabbait: {
    id: 8,
    key: "crabbait",
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
      img: "CrabItem2"
    },
  },
};
