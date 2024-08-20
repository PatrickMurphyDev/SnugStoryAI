export const IslandTemplate = {
  //"Residents":["Leah","Maureen","Rob","Justine","Deb", "Callum"],
  Residents: [
    {
      name: "Leah",
      age: 26,
      gender: "Female",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Leah64.png",
    },
    {
      name: "Rob",
      age: 24,
      gender: "Male",
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
    }
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
    nonResidential:[
        { id: 0, x: 275*2, y: 1370*2, name: "Bar", fillColor: "#aa0000" },
        { id: 2, x: 400*2, y: 1370*2, name: "General Store", fillColor: "#0000aa" },
        { id: 3, x: 525*2, y: 1370*2, name: "School", fillColor: "#008888" },
        { id: 1, x: 275*2, y: 1535*2, name: "Bar", fillColor: "#aa0000" },
        { id: 4, x: 400*2, y: 1535*2, name: "General Store", fillColor: "#0000aa" },
        { id: 5, x: 525*2, y: 1535*2, name: "School", fillColor: "#008888" },
        { id: 6, x: 670*2, y: 1535*2, name: "General Store", fillColor: "#aabbff" },
        { id: 15, x: 1024*2, y: 1600*2, name: "Lighthouse" },
      ],
    residential: [
        {x:680, y:1650},
        { x: 640*2, y: 940*2 },
        { x: 115*2, y: 1585*2 },
      ]
  },
  Image: {
    source: "images/SnugIsland.png",
    size: {x:2048,y:2048}
  }
};
