const hometownField = {
  aid: 1,
  an: "hometown",
  ad: "The place where the character was born or spent their early childhood.",
  ac: "background",
  ae: "Affects the character's cultural background, accent, and potentially their values and worldviews.",
  av: [
    { vn: "New York City, USA", vp: 0.032352, ve: 0.3 },
    { vn: "Los Angeles, USA", vp: 0.032352, ve: 0.3 },
    { vn: "London, UK", vp: 0.032352, ve: 0.3 },
    { vn: "Tokyo, Japan", vp: 0.032352, ve: 0.3 },
    { vn: "Sydney, Australia", vp: 0.032352, ve: 0.3 },
    { vn: "Paris, France", vp: 0.032352, ve: 0.3 },
    { vn: "Berlin, Germany", vp: 0.032352, ve: 0.3 },
    { vn: "Toronto, Canada", vp: 0.032352, ve: 0.3 },
    { vn: "Mumbai, India", vp: 0.032352, ve: 0.3 },
    { vn: "Cape Town, South Africa", vp: 0.032352, ve: 0.3 },
    { vn: "São Paulo, Brazil", vp: 0.032352, ve: 0.3 },
    { vn: "Shanghai, China", vp: 0.032352, ve: 0.3 },
    { vn: "Moscow, Russia", vp: 0.032352, ve: 0.3 },
    { vn: "Dubai, UAE", vp: 0.032352, ve: 0.3 },
    { vn: "Singapore, Singapore", vp: 0.032352, ve: 0.3 },
    { vn: "Barcelona, Spain", vp: 0.032352, ve: 0.3 },
    { vn: "Rome, Italy", vp: 0.032352, ve: 0.3 },
    { vn: "Buenos Aires, Argentina", vp: 0.032352, ve: 0.3 },
    { vn: "Mexico City, Mexico", vp: 0.032352, ve: 0.3 },
    { vn: "Istanbul, Turkey", vp: 0.032352, ve: 0.3 },
    { vn: "Athens, Greece", vp: 0.032352, ve: 0.3 },
    { vn: "Seoul, South Korea", vp: 0.032352, ve: 0.3 },
    { vn: "Bangkok, Thailand", vp: 0.032352, ve: 0.3 },
    { vn: "Cairo, Egypt", vp: 0.032352, ve: 0.3 },
    { vn: "Lagos, Nigeria", vp: 0.032352, ve: 0.3 },
    { vn: "Lima, Peru", vp: 0.032352, ve: 0.3 },
    { vn: "Jakarta, Indonesia", vp: 0.032352, ve: 0.3 },
    { vn: "Vienna, Austria", vp: 0.032352, ve: 0.3 },
    { vn: "Amsterdam, Netherlands", vp: 0.032352, ve: 0.3 },
    { vn: "Warsaw, Poland", vp: 0.032352, ve: 0.3 },
    { vn: "Budapest, Hungary", vp: 0.032352, ve: 0.3 },
    { vn: "Oslo, Norway", vp: 0.032352, ve: 0.3 },
    { vn: "Copenhagen, Denmark", vp: 0.032352, ve: 0.3 },
    { vn: "Helsinki, Finland", vp: 0.032352, ve: 0.3 },
    { vn: "Stockholm, Sweden", vp: 0.032352, ve: 0.3 },
    { vn: "Prague, Czech Republic", vp: 0.032352, ve: 0.3 },
    { vn: "Lisbon, Portugal", vp: 0.032352, ve: 0.3 },
    { vn: "Zurich, Switzerland", vp: 0.032352, ve: 0.3 },
    { vn: "Brussels, Belgium", vp: 0.032352, ve: 0.3 },
    { vn: "Dublin, Ireland", vp: 0.032352, ve: 0.3 },
    { vn: "Edinburgh, UK", vp: 0.032352, ve: 0.3 },
    { vn: "Manchester, UK", vp: 0.032352, ve: 0.3 },
    { vn: "Glasgow, UK", vp: 0.032352, ve: 0.3 },
    { vn: "Birmingham, UK", vp: 0.032352, ve: 0.3 },
    { vn: "Naples, Italy", vp: 0.032352, ve: 0.3 },
    { vn: "Florence, Italy", vp: 0.032352, ve: 0.3 },
    { vn: "Venice, Italy", vp: 0.032352, ve: 0.3 },
    { vn: "Marseille, France", vp: 0.032352, ve: 0.3 },
    { vn: "Lyon, France", vp: 0.032352, ve: 0.3 },
    { vn: "Nice, France", vp: 0.032352, ve: 0.3 },
  ],
};

const educationLevelField = {
  aid: 3,
  an: "education level",
  ad: "The highest level of education the character has completed.",
  ac: "background",
  ae: "Influences the character's knowledge, skills, job prospects, and social interactions.",
  av: [
    { vn: "No formal education", vp: 0.02, ve: 0.0 },
    { vn: "Primary school", vp: 0.05, ve: 0.1 },
    { vn: "Some high school", vp: 0.1, ve: 0.2 },
    { vn: "High school diploma", vp: 0.25, ve: 0.3 },
    { vn: "Some college", vp: 0.15, ve: 0.4 },
    { vn: "Associate's degree", vp: 0.1, ve: 0.5 },
    { vn: "Bachelor's degree", vp: 0.2, ve: 0.7 },
    { vn: "Some graduate school", vp: 0.05, ve: 0.75 },
    { vn: "Master's degree", vp: 0.06, ve: 0.8 },
    { vn: "Professional degree", vp: 0.01, ve: 0.85 },
    { vn: "Doctoral degree", vp: 0.01, ve: 0.9 },
    { vn: "Vocational training", vp: 0.05, ve: 0.5 },
    { vn: "Self-taught", vp: 0.02, ve: 0.4 },
    { vn: "Certificate program", vp: 0.05, ve: 0.6 },
    { vn: "Adult education courses", vp: 0.02, ve: 0.4 },
  ],
};

const occupationField = {
  aid: 4,
  an: "occupation",
  ad: "The character's current job or profession.",
  ac: "background",
  ae: "Affects the character's daily activities, income, and social interactions.",
  av: [
    { vn: "Software Developer", vp: 0.025, ve: 80000 },
    { vn: "Teacher", vp: 0.035, ve: 50000 },
    { vn: "Nurse", vp: 0.03, ve: 70000 },
    { vn: "Salesperson", vp: 0.04, ve: 45000 },
    { vn: "Accountant", vp: 0.02, ve: 60000 },
    { vn: "Retail Worker", vp: 0.05, ve: 30000 },
    { vn: "Construction Worker", vp: 0.03, ve: 50000 },
    { vn: "Truck Driver", vp: 0.02, ve: 45000 },
    { vn: "Administrative Assistant", vp: 0.04, ve: 40000 },
    { vn: "Doctor", vp: 0.01, ve: 200000 },
    { vn: "Lawyer", vp: 0.01, ve: 120000 },
    { vn: "Marketing Manager", vp: 0.015, ve: 90000 },
    { vn: "Mechanical Engineer", vp: 0.015, ve: 75000 },
    { vn: "Electrician", vp: 0.02, ve: 60000 },
    { vn: "Plumber", vp: 0.015, ve: 55000 },
    { vn: "Chef", vp: 0.01, ve: 45000 },
    { vn: "Graphic Designer", vp: 0.015, ve: 50000 },
    { vn: "Police Officer", vp: 0.02, ve: 60000 },
    { vn: "Firefighter", vp: 0.015, ve: 55000 },
    { vn: "Real Estate Agent", vp: 0.02, ve: 50000 },
    { vn: "Bartender", vp: 0.01, ve: 25000 },
    { vn: "Waiter/Waitress", vp: 0.02, ve: 25000 },
    { vn: "Artist", vp: 0.01, ve: 40000 },
    { vn: "Musician", vp: 0.01, ve: 40000 },
    { vn: "Actor", vp: 0.005, ve: 60000 },
    { vn: "Writer", vp: 0.01, ve: 50000 },
    { vn: "Scientist", vp: 0.01, ve: 80000 },
    { vn: "Data Analyst", vp: 0.02, ve: 65000 },
    { vn: "Pharmacist", vp: 0.01, ve: 120000 },
    { vn: "Architect", vp: 0.01, ve: 70000 },
    { vn: "Civil Engineer", vp: 0.015, ve: 75000 },
    { vn: "Dentist", vp: 0.005, ve: 150000 },
    { vn: "Veterinarian", vp: 0.005, ve: 90000 },
    { vn: "Social Worker", vp: 0.02, ve: 50000 },
    { vn: "Psychologist", vp: 0.01, ve: 70000 },
    { vn: "Personal Trainer", vp: 0.01, ve: 40000 },
    { vn: "IT Support Specialist", vp: 0.02, ve: 55000 },
    { vn: "Network Administrator", vp: 0.01, ve: 70000 },
    { vn: "HR Manager", vp: 0.015, ve: 75000 },
    { vn: "Project Manager", vp: 0.02, ve: 85000 },
    { vn: "Business Analyst", vp: 0.02, ve: 65000 },
    { vn: "Photographer", vp: 0.01, ve: 40000 },
    { vn: "Event Planner", vp: 0.01, ve: 50000 },
    { vn: "Travel Agent", vp: 0.005, ve: 40000 },
    { vn: "Chef", vp: 0.01, ve: 45000 },
    { vn: "Paralegal", vp: 0.015, ve: 50000 },
    { vn: "Bank Teller", vp: 0.02, ve: 35000 },
    { vn: "Librarian", vp: 0.01, ve: 55000 },
    { vn: "Researcher", vp: 0.01, ve: 60000 },
  ],
};

const hobbiesField = {
  aid: 5,
  an: "hobbies",
  ad: "Activities the character enjoys doing in their free time.",
  ac: "background",
  ae: "Shapes the character's personality, interests, and social circles.",
  av: [
    { vn: "Reading", vp: 0.15, ve: 0.5 },
    { vn: "Traveling", vp: 0.1, ve: 0.8 },
    { vn: "Cooking", vp: 0.1, ve: 0.6 },
    { vn: "Hiking", vp: 0.08, ve: 0.7 },
    { vn: "Photography", vp: 0.07, ve: 0.8 },
    { vn: "Gardening", vp: 0.05, ve: 0.4 },
    { vn: "Drawing", vp: 0.05, ve: 0.6 },
    { vn: "Painting", vp: 0.05, ve: 0.6 },
    { vn: "Writing", vp: 0.05, ve: 0.5 },
    { vn: "Dancing", vp: 0.04, ve: 0.8 },
    { vn: "Fishing", vp: 0.04, ve: 0.5 },
    { vn: "Running", vp: 0.04, ve: 0.7 },
    { vn: "Cycling", vp: 0.04, ve: 0.7 },
    { vn: "Playing Video Games", vp: 0.08, ve: 0.5 },
    { vn: "Knitting", vp: 0.02, ve: 0.3 },
    { vn: "Yoga", vp: 0.04, ve: 0.7 },
    { vn: "Swimming", vp: 0.04, ve: 0.7 },
    { vn: "Golfing", vp: 0.03, ve: 0.6 },
    { vn: "Baking", vp: 0.04, ve: 0.5 },
    { vn: "Sewing", vp: 0.02, ve: 0.3 },
    { vn: "Rock Climbing", vp: 0.03, ve: 0.8 },
    { vn: "Bird Watching", vp: 0.02, ve: 0.3 },
    { vn: "Collecting Stamps", vp: 0.01, ve: 0.2 },
    { vn: "Woodworking", vp: 0.02, ve: 0.5 },
    { vn: "Martial Arts", vp: 0.03, ve: 0.7 },
    { vn: "Singing", vp: 0.04, ve: 0.7 },
    { vn: "Playing Musical Instruments", vp: 0.04, ve: 0.7 },
    { vn: "Surfing", vp: 0.02, ve: 0.8 },
    { vn: "Skiing", vp: 0.02, ve: 0.7 },
    { vn: "Snowboarding", vp: 0.02, ve: 0.7 },
    { vn: "Chess", vp: 0.02, ve: 0.4 },
    { vn: "Board Games", vp: 0.03, ve: 0.5 },
    { vn: "Cooking", vp: 0.05, ve: 0.6 },
    { vn: "Meditation", vp: 0.03, ve: 0.6 },
    { vn: "Blogging", vp: 0.02, ve: 0.6 },
    { vn: "Volunteering", vp: 0.03, ve: 0.6 },
    { vn: "Astronomy", vp: 0.02, ve: 0.5 },
    { vn: "Camping", vp: 0.04, ve: 0.6 },
    { vn: "Bowling", vp: 0.03, ve: 0.4 },
    { vn: "Scrapbooking", vp: 0.01, ve: 0.3 },
    { vn: "Tattoo Art", vp: 0.01, ve: 0.6 },
    { vn: "Pottery", vp: 0.01, ve: 0.5 },
    { vn: "Jewelry Making", vp: 0.01, ve: 0.5 },
    { vn: "Puzzle Solving", vp: 0.02, ve: 0.4 },
    { vn: "Carpentry", vp: 0.02, ve: 0.5 },
    { vn: "Metalworking", vp: 0.01, ve: 0.4 },
    { vn: "Collecting Coins", vp: 0.01, ve: 0.2 },
    { vn: "Beekeeping", vp: 0.005, ve: 0.4 },
    { vn: "Fencing", vp: 0.005, ve: 0.6 },
    { vn: "Scuba Diving", vp: 0.01, ve: 0.8 },
    { vn: "Travel Blogging", vp: 0.01, ve: 0.7 },
    { vn: "Vlogging", vp: 0.01, ve: 0.6 },
    { vn: "Craft Brewing", vp: 0.01, ve: 0.5 },
    { vn: "Wine Tasting", vp: 0.01, ve: 0.6 },
    { vn: "Model Building", vp: 0.01, ve: 0.3 },
    { vn: "Antiquing", vp: 0.01, ve: 0.4 },
    { vn: "Parkour", vp: 0.005, ve: 0.8 },
  ],
};

const favoriteBooksField = {
  aid: 6,
  an: "favorite books",
  ad: "Books that the character particularly enjoys or finds meaningful.",
  ac: "interests",
  ae: "Reveals the character's taste in literature and can hint at their personality and values.",
  av: [
    { vn: "Fiction (Best Seller)", vp: 0.2, ve: "best seller" },
    {
      vn: "Fiction (Independently Published)",
      vp: 0.05,
      ve: "independently published",
    },
    { vn: "Non-Fiction (Best Seller)", vp: 0.15, ve: "best seller" },
    {
      vn: "Non-Fiction (Independently Published)",
      vp: 0.05,
      ve: "independently published",
    },
    { vn: "Fantasy (Best Seller)", vp: 0.07, ve: "best seller" },
    {
      vn: "Fantasy (Independently Published)",
      vp: 0.02,
      ve: "independently published",
    },
    { vn: "Science Fiction (Best Seller)", vp: 0.06, ve: "best seller" },
    {
      vn: "Science Fiction (Independently Published)",
      vp: 0.02,
      ve: "independently published",
    },
    { vn: "Mystery (Best Seller)", vp: 0.07, ve: "best seller" },
    {
      vn: "Mystery (Independently Published)",
      vp: 0.02,
      ve: "independently published",
    },
    { vn: "Romance (Best Seller)", vp: 0.08, ve: "best seller" },
    {
      vn: "Romance (Independently Published)",
      vp: 0.03,
      ve: "independently published",
    },
    { vn: "Thriller (Best Seller)", vp: 0.06, ve: "best seller" },
    {
      vn: "Thriller (Independently Published)",
      vp: 0.02,
      ve: "independently published",
    },
    { vn: "Biography (Best Seller)", vp: 0.05, ve: "best seller" },
    {
      vn: "Biography (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Historical Fiction (Best Seller)", vp: 0.04, ve: "best seller" },
    {
      vn: "Historical Fiction (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Self-Help (Best Seller)", vp: 0.05, ve: "best seller" },
    {
      vn: "Self-Help (Independently Published)",
      vp: 0.02,
      ve: "independently published",
    },
    { vn: "Graphic Novels (Best Seller)", vp: 0.03, ve: "graphic novels" },
    {
      vn: "Graphic Novels (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Children's Books (Best Seller)", vp: 0.05, ve: "best seller" },
    {
      vn: "Children's Books (Independently Published)",
      vp: 0.02,
      ve: "independently published",
    },
    { vn: "Young Adult (Best Seller)", vp: 0.06, ve: "best seller" },
    {
      vn: "Young Adult (Independently Published)",
      vp: 0.02,
      ve: "independently published",
    },
    { vn: "Poetry (Best Seller)", vp: 0.03, ve: "best seller" },
    {
      vn: "Poetry (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Classics (Best Seller)", vp: 0.05, ve: "best seller" },
    {
      vn: "Classics (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Horror (Best Seller)", vp: 0.04, ve: "best seller" },
    {
      vn: "Horror (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Adventure (Best Seller)", vp: 0.04, ve: "best seller" },
    {
      vn: "Adventure (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Spirituality (Best Seller)", vp: 0.03, ve: "best seller" },
    {
      vn: "Spirituality (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Humor (Best Seller)", vp: 0.03, ve: "best seller" },
    {
      vn: "Humor (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Science (Best Seller)", vp: 0.04, ve: "best seller" },
    {
      vn: "Science (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Philosophy (Best Seller)", vp: 0.03, ve: "best seller" },
    {
      vn: "Philosophy (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "History (Best Seller)", vp: 0.04, ve: "best seller" },
    {
      vn: "History (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Memoir (Best Seller)", vp: 0.03, ve: "best seller" },
    {
      vn: "Memoir (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Business (Best Seller)", vp: 0.03, ve: "best seller" },
    {
      vn: "Business (Independently Published)",
      vp: 0.01,
      ve: "independently published",
    },
    { vn: "Self-Published Fiction", vp: 0.02, ve: "self-published" },
    { vn: "Self-Published Non-Fiction", vp: 0.02, ve: "self-published" },
    { vn: "Audio Books (Fiction)", vp: 0.04, ve: "audio books" },
    { vn: "Audio Books (Non-Fiction)", vp: 0.03, ve: "audio books" },
  ],
};

const favoriteMoviesField = {
  aid: 7,
  an: "favorite movies",
  ad: "Movies that the character particularly enjoys or finds meaningful.",
  ac: "interests",
  ae: "Reveals the character's taste in cinema and can hint at their personality and values.",
  av: [
    { vn: "Action (Blockbuster)", vp: 0.15, ve: "blockbuster" },
    { vn: "Action (Indie)", vp: 0.03, ve: "indie" },
    { vn: "Comedy (Blockbuster)", vp: 0.12, ve: "blockbuster" },
    { vn: "Comedy (Indie)", vp: 0.04, ve: "indie" },
    { vn: "Drama (Blockbuster)", vp: 0.1, ve: "blockbuster" },
    { vn: "Drama (Indie)", vp: 0.05, ve: "indie" },
    { vn: "Horror (Blockbuster)", vp: 0.07, ve: "blockbuster" },
    { vn: "Horror (Indie)", vp: 0.03, ve: "indie" },
    { vn: "Romance (Blockbuster)", vp: 0.08, ve: "blockbuster" },
    { vn: "Romance (Indie)", vp: 0.03, ve: "indie" },
    { vn: "Sci-Fi (Blockbuster)", vp: 0.06, ve: "blockbuster" },
    { vn: "Sci-Fi (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Fantasy (Blockbuster)", vp: 0.05, ve: "blockbuster" },
    { vn: "Fantasy (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Thriller (Blockbuster)", vp: 0.05, ve: "blockbuster" },
    { vn: "Thriller (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Animated (Family)", vp: 0.07, ve: "family" },
    { vn: "Animated (Adult)", vp: 0.03, ve: "adult" },
    { vn: "Documentary (Popular)", vp: 0.05, ve: "popular" },
    { vn: "Documentary (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Musical (Blockbuster)", vp: 0.03, ve: "blockbuster" },
    { vn: "Musical (Indie)", vp: 0.01, ve: "indie" },
    { vn: "Adventure (Blockbuster)", vp: 0.06, ve: "blockbuster" },
    { vn: "Adventure (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Crime (Blockbuster)", vp: 0.05, ve: "blockbuster" },
    { vn: "Crime (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Mystery (Blockbuster)", vp: 0.04, ve: "blockbuster" },
    { vn: "Mystery (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Historical (Blockbuster)", vp: 0.03, ve: "blockbuster" },
    { vn: "Historical (Indie)", vp: 0.01, ve: "indie" },
    { vn: "War (Blockbuster)", vp: 0.03, ve: "blockbuster" },
    { vn: "War (Indie)", vp: 0.01, ve: "indie" },
    { vn: "Biographical (Blockbuster)", vp: 0.03, ve: "blockbuster" },
    { vn: "Biographical (Indie)", vp: 0.01, ve: "indie" },
    { vn: "Sports (Blockbuster)", vp: 0.03, ve: "blockbuster" },
    { vn: "Sports (Indie)", vp: 0.01, ve: "indie" },
    { vn: "Western (Blockbuster)", vp: 0.02, ve: "blockbuster" },
    { vn: "Western (Indie)", vp: 0.01, ve: "indie" },
    { vn: "Family (Blockbuster)", vp: 0.05, ve: "blockbuster" },
    { vn: "Family (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Fantasy (Popular)", vp: 0.04, ve: "popular" },
    { vn: "Sci-Fi (Popular)", vp: 0.04, ve: "popular" },
    { vn: "Rom-Com (Blockbuster)", vp: 0.04, ve: "blockbuster" },
    { vn: "Rom-Com (Indie)", vp: 0.02, ve: "indie" },
    { vn: "Psychological (Popular)", vp: 0.03, ve: "popular" },
    { vn: "Drama (Popular)", vp: 0.05, ve: "popular" },
    { vn: "Action (Popular)", vp: 0.07, ve: "popular" },
    { vn: "Musical (Popular)", vp: 0.03, ve: "popular" },
    { vn: "Crime (Popular)", vp: 0.04, ve: "popular" },
    { vn: "Documentary (Popular)", vp: 0.03, ve: "popular" },
  ],
};

const favoriteMusicGenreField = {
  aid: 8,
  an: "favorite music genre",
  ad: "Music genres that the character particularly enjoys.",
  ac: "interests",
  ae: "Indicates the character's taste in music and can hint at their personality and mood preferences.",
  av: [
    { vn: "Pop Singer (Solo)", vp: 0.15, ve: "pop" },
    { vn: "Rock Band (Group)", vp: 0.12, ve: "rock" },
    { vn: "Hip-Hop Artist (Solo)", vp: 0.1, ve: "hip-hop" },
    { vn: "Country Singer (Solo)", vp: 0.08, ve: "country" },
    { vn: "Jazz Ensemble (Group)", vp: 0.04, ve: "jazz" },
    { vn: "Classical Orchestra (Group)", vp: 0.05, ve: "classical" },
    { vn: "R&B Artist (Solo)", vp: 0.07, ve: "r&b" },
    { vn: "Indie Band (Group)", vp: 0.06, ve: "indie" },
    { vn: "Electronic DJ (Solo)", vp: 0.05, ve: "electronic" },
    { vn: "Reggae Band (Group)", vp: 0.03, ve: "reggae" },
    { vn: "Metal Band (Group)", vp: 0.03, ve: "metal" },
    { vn: "Blues Artist (Solo)", vp: 0.03, ve: "blues" },
    { vn: "Folk Singer (Solo)", vp: 0.02, ve: "folk" },
    { vn: "Punk Band (Group)", vp: 0.02, ve: "punk" },
    { vn: "Soul Singer (Solo)", vp: 0.03, ve: "soul" },
    { vn: "Alternative Band (Group)", vp: 0.04, ve: "alternative" },
    { vn: "K-Pop Group (Group)", vp: 0.04, ve: "k-pop" },
    { vn: "Latin Pop Artist (Solo)", vp: 0.03, ve: "latin pop" },
    { vn: "Gospel Choir (Group)", vp: 0.02, ve: "gospel" },
    { vn: "Opera Singer (Solo)", vp: 0.02, ve: "opera" },
    { vn: "Country Band (Group)", vp: 0.03, ve: "country" },
    { vn: "EDM DJ (Solo)", vp: 0.05, ve: "edm" },
    { vn: "Rap Group (Group)", vp: 0.04, ve: "rap" },
    { vn: "Synthpop Artist (Solo)", vp: 0.03, ve: "synthpop" },
    { vn: "Funk Band (Group)", vp: 0.02, ve: "funk" },
    { vn: "Bluegrass Band (Group)", vp: 0.02, ve: "bluegrass" },
    { vn: "Dubstep DJ (Solo)", vp: 0.02, ve: "dubstep" },
    { vn: "Industrial Band (Group)", vp: 0.01, ve: "industrial" },
    { vn: "Ska Band (Group)", vp: 0.01, ve: "ska" },
    { vn: "Techno DJ (Solo)", vp: 0.02, ve: "techno" },
    { vn: "New Age Artist (Solo)", vp: 0.01, ve: "new age" },
    { vn: "Disco Artist (Solo)", vp: 0.01, ve: "disco" },
    { vn: "Post-Rock Band (Group)", vp: 0.01, ve: "post-rock" },
    { vn: "World Music Ensemble (Group)", vp: 0.01, ve: "world music" },
    { vn: "Dance Pop Artist (Solo)", vp: 0.04, ve: "dance pop" },
    { vn: "Celtic Band (Group)", vp: 0.01, ve: "celtic" },
    { vn: "Grunge Band (Group)", vp: 0.01, ve: "grunge" },
    { vn: "Chillwave Artist (Solo)", vp: 0.01, ve: "chillwave" },
    { vn: "Experimental Band (Group)", vp: 0.01, ve: "experimental" },
    { vn: "Ambient Musician (Solo)", vp: 0.01, ve: "ambient" },
    { vn: "Reggaeton Artist (Solo)", vp: 0.02, ve: "reggaeton" },
    { vn: "Trap Artist (Solo)", vp: 0.03, ve: "trap" },
    { vn: "Lo-Fi Hip-Hop Artist (Solo)", vp: 0.02, ve: "lo-fi hip-hop" },
    { vn: "Alternative Rock Band (Group)", vp: 0.03, ve: "alternative rock" },
    { vn: "Emo Band (Group)", vp: 0.01, ve: "emo" },
    { vn: "Afrobeat Band (Group)", vp: 0.01, ve: "afrobeat" },
    { vn: "House DJ (Solo)", vp: 0.02, ve: "house" },
    { vn: "Trance DJ (Solo)", vp: 0.02, ve: "trance" },
    { vn: "Hardcore Band (Group)", vp: 0.01, ve: "hardcore" },
    { vn: "Salsa Band (Group)", vp: 0.01, ve: "salsa" },
  ],
};

const familyBackgroundField = {
    aid: 9,
    an: "family background",
    ad: "The character's family history, relationships, and dynamics.",
    ac: "background",
    ae: "Shapes the character's upbringing, values, and interpersonal relationships.",
    av: [
    {
        vn: "Single parent household",
        vp: 0.1,
        ve: "Raised by one parent, typically results in close bond with that parent"
    },
    {
        vn: "Single father household",
        vp: 0.03,
        ve: "Raised by a single father, typically results in close bond with father"
    },
    {
        vn: "Single mother household",
        vp: 0.05,
        ve: "Raised by a single mother, typically results in close bond with mother"
    },
    {
        vn: "Traditional nuclear family",
        vp: 0.15,
        ve: "Raised by both parents, typically results in balanced upbringing"
    },
    {
        vn: "Blended family",
        vp: 0.05,
        ve: "Family includes step-parents and step-siblings, often leads to complex family dynamics"
    },
    {
        vn: "Divorced parents",
        vp: 0.1,
        ve: "Raised by divorced parents, can result in divided loyalties and adaptive skills"
    },
    {
        vn: "Extended family household",
        vp: 0.05,
        ve: "Raised with grandparents or other relatives, often leads to strong family ties"
    },
    {
        vn: "Raised by grandparents",
        vp: 0.04,
        ve: "Raised primarily by grandparents, often leads to respect for elders"
    },
    {
        vn: "Orphaned and adopted",
        vp: 0.03,
        ve: "Adopted after being orphaned, can result in unique family dynamics"
    },
    {
        vn: "Foster care system",
        vp: 0.03,
        ve: "Raised in foster care, often leads to resilience and adaptability"
    },
    {
        vn: "Only child",
        vp: 0.1,
        ve: "No siblings, often results in strong independence or reliance on parents"
    },
    {
        vn: "Multiple siblings",
        vp: 0.15,
        ve: "Raised with several siblings, typically leads to strong social and competitive skills"
    },
    {
        vn: "Family business",
        vp: 0.05,
        ve: "Family owns a business, often leads to entrepreneurial skills and responsibilities"
    },
    {
        vn: "Raised by older sibling",
        vp: 0.02,
        ve: "Older sibling took on parental role, often leads to unique sibling bond"
    },
    {
        vn: "Parents in high-profile careers",
        vp: 0.03,
        ve: "Parents have high-profile jobs, can lead to public scrutiny and high expectations"
    },
    {
        vn: "Military family",
        vp: 0.05,
        ve: "Parents served in the military, often leads to discipline and frequent relocations"
    },
    {
        vn: "Wealthy family",
        vp: 0.05,
        ve: "Raised in wealth, can lead to privileged upbringing and different societal perspectives"
    },
    {
        vn: "Low-income family",
        vp: 0.1,
        ve: "Raised in a low-income environment, often leads to resilience and resourcefulness"
    },
    {
        vn: "Religious family",
        vp: 0.05,
        ve: "Raised in a religious environment, often leads to strong faith-based values"
    },
    {
        vn: "International family",
        vp: 0.03,
        ve: "Family from different countries, often leads to multicultural upbringing"
    },
    {
        vn: "Parents in blue-collar jobs",
        vp: 0.05,
        ve: "Parents work in blue-collar jobs, often leads to a strong work ethic and practical skills"
    },
    {
        vn: "Rural upbringing",
        vp: 0.05,
        ve: "Raised in a rural area, often leads to appreciation for nature and self-sufficiency"
    },
    {
        vn: "Urban upbringing",
        vp: 0.1,
        ve: "Raised in an urban area, often leads to street smarts and diverse social skills"
    },
    {
        vn: "Suburban upbringing",
        vp: 0.1,
        ve: "Raised in a suburban area, often leads to a balanced and secure environment"
    },
    {
        vn: "Parents in law enforcement",
        vp: 0.02,
        ve: "Parents are in law enforcement, often leads to respect for rules and order"
    },
    {
        vn: "Parents in education",
        vp: 0.03,
        ve: "Parents are educators, often leads to a strong value on learning and curiosity"
    },
    {
        vn: "Parents in healthcare",
        vp: 0.03,
        ve: "Parents are healthcare professionals, often leads to compassion and health awareness"
    },
    {
        vn: "Scientist parents",
        vp: 0.02,
        ve: "Parents are scientists, often leads to intellectual curiosity and analytical skills"
    },
    {
        vn: "Artist parents",
        vp: 0.02,
        ve: "Parents are artists, often leads to creativity and appreciation for the arts"
    },
    {
        vn: "Political family",
        vp: 0.02,
        ve: "Family involved in politics, often leads to strong opinions and leadership skills"
    },
    {
        vn: "Academic family",
        vp: 0.03,
        ve: "Family values education, often leads to high academic achievement"
    },
    {
        vn: "Sports-oriented family",
        vp: 0.03,
        ve: "Family heavily involved in sports, often leads to athletic skills and competitive nature"
    },
    {
        vn: "Parents who travel frequently",
        vp: 0.03,
        ve: "Parents travel often, leads to exposure to different cultures and adaptability"
    },
    {
        vn: "Family with a strong cultural identity",
        vp: 0.03,
        ve: "Family has a strong cultural identity, often leads to pride in heritage and cultural values"
    },
    {
        vn: "Immigrant family",
        vp: 0.04,
        ve: "Family immigrated to a new country, often leads to resilience and multicultural awareness"
    },
    {
        vn: "Parents who are entrepreneurs",
        vp: 0.03,
        ve: "Parents are entrepreneurs, often leads to a strong work ethic and business skills"
    },
    {
        vn: "LGBTQ+ family",
        vp: 0.02,
        ve: "Raised in an LGBTQ+ household, often leads to openness and acceptance of diversity"
    },
    {
        vn: "Parents involved in farming or agriculture",
        vp: 0.02,
        ve: "Parents work in agriculture, often leads to a connection with nature and hard work"
    },
    {
        vn: "Parents who are activists",
        vp: 0.02,
        ve: "Parents are involved in activism, often leads to strong values and a sense of justice"
    },
    {
        vn: "Parents with addiction issues",
        vp: 0.02,
        ve: "Raised by parents with addiction issues, often leads to early maturity and resilience"
    },
    {
        vn: "Parents with mental health issues",
        vp: 0.02,
        ve: "Raised by parents with mental health issues, can lead to early responsibilities and empathy"
    },
    {
        vn: "Non-traditional family structure",
        vp: 0.02,
        ve: "Unique family dynamics, can result in unconventional perspectives"
    },
    {
        vn: "Parents in academia",
        vp: 0.03,
        ve: "Parents work in academia, often leads to a value on education and intellectual pursuits"
    },
    {
        vn: "Parents in blue-collar jobs",
        vp: 0.05,
        ve: "Parents work in blue-collar jobs, often leads to a strong work ethic and practical skills"
    },
    {
        vn: "Parents with criminal background",
        vp: 0.01,
        ve: "Parents have a history of crime, often leads to early exposure to legal issues and resilience"
    },
    {
        vn: "Parents in the military",
        vp: 0.02,
        ve: "Both parents served in the military, often leads to strong discipline and respect for authority"
    },
    {
        vn: "Raised by nannies or caregivers",
        vp: 0.02,
        ve: "Raised primarily by hired help, can lead to different parental dynamics"
    },
    {
        vn: "Parents who are scientists",
        vp: 0.02,
        ve: "Both parents are scientists, often leads to a scientific mindset and curiosity"
    },
    {
        vn: "Raised in a boarding school",
        vp: 0.01,
        ve: "Spent significant time in boarding school, can lead to independence and strong peer bonds"
    },
    {
        vn: "Parents involved in organized crime",
        vp: 0.01,
        ve: "Parents involved in crime networks, often leads to early exposure to danger and secrecy"
    },
    {
        vn: "Parents with multiple marriages",
        vp: 0.02,
        ve: "Parents have had several marriages, often leads to complex family structures"
    },
    {
        vn: "Parents who are diplomats",
        vp: 0.01,
        ve: "Parents work in diplomacy, often leads to exposure to international relations and cultures"
    },
    {
        vn: "Parents who are lawyers",
        vp: 0.02,
        ve: "Both parents are lawyers, often leads to strong argumentation skills and respect for law"
    },
    {
        vn: "Raised in a single-parent household with multiple siblings",
        vp: 0.03,
        ve: "Single parent with many siblings, can lead to strong sibling bonds and responsibility"
    },
    {
        vn: "Parents with artistic careers",
        vp: 0.02,
        ve: "Parents have careers in the arts, often leads to creativity and exposure to the art world"
    },
    {
        vn: "Parents in medical field",
        vp: 0.02,
        ve: "Both parents are in medical professions, often leads to an interest in health and science"
    },
    {
        vn: "Parents involved in farming or agriculture",
        vp: 0.02,
        ve: "Parents work in agriculture, often leads to a connection with nature and hard work"
    },
    {
        vn: "Raised by religious leaders",
        vp: 0.01,
        ve: "Parents are religious leaders, often leads to strong faith and community involvement"
    },
    {
        vn: "Parents with high academic achievements",
        vp: 0.02,
        ve: "Parents have advanced degrees, often leads to high expectations and intellectual pursuits"
    },
    {
        vn: "Parents who are activists",
        vp: 0.02,
        ve: "Parents are involved in activism, often leads to strong values and a sense of justice"
    },
    {
        vn: "Parents with political ambitions",
        vp: 0.01,
        ve: "Parents are politically active, can lead to strong opinions and leadership skills"
    },
    {
        vn: "Parents in entertainment industry",
        vp: 0.02,
        ve: "Parents work in entertainment, can lead to exposure to fame and creative environment"
    },
    {
        vn: "Parents with tech careers",
        vp: 0.02,
        ve: "Parents work in technology, often leads to an interest in innovation and tech skills"
    },
    {
        vn: "Parents involved in sports coaching",
        vp: 0.01,
        ve: "Parents are sports coaches, often leads to athletic skills and competitive nature"
    },
    {
        vn: "Parents with humanitarian careers",
        vp: 0.01,
        ve: "Parents work in humanitarian fields, often leads to a strong sense of empathy and global awareness"
    },
    {
        vn: "Parents who are entrepreneurs",
        vp: 0.03,
        ve: "Parents are entrepreneurs, often leads to a strong work ethic and business skills"
    },
    {
        vn: "Parents with high-profile public careers",
        vp: 0.01,
        ve: "Parents have public-facing careers, can lead to public scrutiny and high expectations"
    },
    {
        vn: "Parents who are chefs or in culinary arts",
        vp: 0.01,
        ve: "Parents work in culinary arts, often leads to a love of food and cooking skills"
    }]};

const fieldsArray = [
  hometownField,
  educationLevelField,
  occupationField,
  hobbiesField,
  favoriteBooksField,
  favoriteMoviesField,
  favoriteMusicGenreField,
  familyBackgroundField,
];

export default fieldsArray;
