export const IslandTemplate = {
  //"Residents":["Leah","Maureen","Rob","Justine","Deb", "Callum"],
  Residents: [
    {
      key: "AndiMcNuttly",
      name: "Andi McNuttly",
      age: 36,
      gender: "Female",
      skills: [],
      bio: "Marina Harbor Master",
      attributes: [],
      img: "Leah64.png",
    },
    {
      key: "MitchBrowning",
      name: "Mitch Browning",
      age: 52,
      gender: "Male",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Kaylor64.png",
    },
    {
      name: "BriannaClark",
      age: 19,
      gender: "Female",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Rob64.png",
    },
    {
      name: "Maureen",
      age: 27,
      gender: "Female",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Maureen64.png",
    },
    {
      name: "Deb",
      age: 26,
      gender: "Female",
      skills: [
        { mainCategory: "Social", subCategory: "Social Media", value: 78 },
      ],
      bio: "Born on May 2, 1996, Deborah “Deb” Chubb grew up in Dallas, Texas, though currently, she resides in Redondo Beach, California, and likes to travel.",
      attributes: [{title:"Social Style", value:"Quirky"}, {title:"Observation", value:"Easily Distracted"}, {title:"Morality", value:"Good"}],
      img: "Deb64.png",
    },
    {
      name: "Callum",
      age: 26,
      gender: "Male",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Callum64.png",
    },
  ],
  Buildings: {
    civic: {
      placed: [
        "Town Hall",
        "Fire Department",
        "Police Department",
        "Lighthouse",
      ],
      required: ["Library", "Post Office", "Park", "School", "Medical Clinic"],
      optional: ["Church", "Outdoor Concert Venue", "Skate Park"],
    },
    private: {
      placed: ["General Store", "Harbor"],
      required: ["Fishing Tackle Store", "Hotel", "Resturant", "Bar", "Gym"],
      optional: [
        "Clothing Store",
        "Hardware Store",
        "Mechanic",
        "Art Gallery",
        "Law Office",
        "Apartment Building",
      ],
    },
    nonResidential:
    [
      { id: 0, x: 700, y: 650, name: "Town Hall", fillColor: "#aabbff" },
      { id: 1, x: 680, y: 765, name: "Fire Dept.", fillColor: "#aa0000" },
      { id: 2, x: 750, y: 800, name: "Police Dept.", fillColor: "#0000aa" },
      { id: 3, x: 615, y: 845, name: "Harbor Master", fillColor: "#008888" },
      { id: 4, x: 560, y: 800, name: "Undef"},
      { id: 5, x: 490, y: 755, name: "Undef"},
      { id: 6, x: 530, y: 710, name: "General Store", fillColor: "#aabbff" },
      { id: 7, x: 600, y: 740, name: "Undef"},
      { id: 8, x: 648, y: 678, name: "Undef"},
      { id: 9, x: 710, y: 718, name: "Undef"},
      { id: 10, x: 758, y: 570, name: "Undef"},
      { id: 11, x: 804, y: 600, name: "Undef"},
      { id: 12, x: 816, y: 842, name: "Undef"},
      { id: 13, x: 488, y: 610, name: "Undef"},
      { id: 14, x: 620, y: 528, name: "Undef"},
      { id: 15, x: 854, y: 930, name: "Lighthouse" },
      { id: 16, x: 906, y: 448, name: "Undef"},
      { id: 17, x: 1018, y: 502, name: "Undef"},
      { id: 18, x: 1170, y: 562, name: "Undef"},
    ],
    residential: [
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
      { x: 790, y: 936, name: "Keeper's" },]
  },
  Image: {
    source: "images/SnugIslandminEmpty.png", // not used
    size: {x:800,y:600}
  }
};
