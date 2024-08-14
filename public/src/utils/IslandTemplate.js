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
      img: "Leah64.png"
    },
    {
      name: "Kaylor",
      age: 30,
      gender: "Female",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Kaylor64.png"
    },
    {
      name: "Rob",
      age: 24,
      gender: "Male",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Rob64.png"
    },
    {
      name: "Maureen",
      age: 27,
      gender: "Female",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Maureen64.png"
    },
    {
      name: "Deb",
      age: 26,
      gender: "Female",
      skills: [],
      bio: "bio",
      attributes: [],
      img: "Deb64.png"
    }/*,
    {
      name: "Callum",
      age: 26,
      gender: "Female",
      skills: [],
      bio: "bio",
      attributes: [],
      img: 'Callum64.png'
    },*/
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
  },
};
