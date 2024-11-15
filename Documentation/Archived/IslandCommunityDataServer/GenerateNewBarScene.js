const firstNames = ["John", "Jane", "Alex", "Emily", "Michael", "Sarah"];

const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis"];

const genders = ["Male", "Female"];

const ages = Array.from({ length: 40 }, (_, i) => i + 21); // Ages 21 to 60

const appearances = {
    height: ["short", "average", "tall"],
    bodyType: ["slim", "average", "heavy"],
    hairColor: ["black", "brown", "blonde", "red", "grey"],
    eyeColor: ["blue", "green", "brown", "hazel"],
    clothingStyle: [
        "casual", "formal", "punk", "hipster", "sporty", "business casual", "vintage", 
        "bohemian", "goth", "preppy", "grunge", "athleisure", "retro", "chic", "eclectic", 
        "minimalist", "rocker", "streetwear", "western", "country club", "military", "artsy", 
        "beachwear", "festival", "loungewear", "workwear"
    ]
};

const personalityTraits = ["friendly", "shy", "outgoing", "aggressive", "quiet", "talkative"];

const backstories = [
    "a regular who knows everyone",
    "a traveler passing through town",
    "a local with a mysterious past",
    "a musician looking for inspiration",
    "an office worker unwinding after a long day"
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generatePerson() {
    const person = {
        name: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
        gender: getRandomElement(genders),
        age: getRandomElement(ages),
        appearance: {
            height: getRandomElement(appearances.height),
            bodyType: getRandomElement(appearances.bodyType),
            hairColor: getRandomElement(appearances.hairColor),
            eyeColor: getRandomElement(appearances.eyeColor),
            clothingStyle: getRandomElement(appearances.clothingStyle)
        },
        personalityTraits: getRandomElements(personalityTraits, 2),
        backstory: getRandomElement(backstories)
    };
    return person;
}

function getRandomElements(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function generatePeople(num) {
    const people = [];
    for (let i = 0; i < num; i++) {
        people.push(generatePerson());
    }
    return people;
}

// Generate 15 people
const people = generatePeople(15);

// Display the details of each person
//people.forEach((person, index) => {
//    console.log(`Person ${index + 1}:`, person);
//});
