const mongoose = require('mongoose');
const readline = require('readline');
require('dotenv').config();

const { Character } = require('./models/v3/Character/CharacterModel');
const { CharacterDetails } = require('./models/v3/Character/CharacterDetails');
const IslandTemplate = require('./IslandTemplateServer');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function suggestAndConfirm(property, suggestion) {
  let response = await promptUser(`Suggested ${property}: ${suggestion}\nPress Enter to confirm or provide a new value: `);
  return response === '' || response.toUpperCase() === 'CONFIRM' ? suggestion : response;
}


async function createCharacterDetails(character) {
  console.log(`Creating CharacterDetails for ${character.name.first} ${character.name.last}`);

  // Find matching resident from IslandTemplate
  const matchingResident = IslandTemplate.Residents.find(resident => resident.id === character._id.toString()) || {id: character._id.toString(), name: character.name, details: {}  };
  const details = {
    island_id: character.island_id,
    character_id: character._id,
    presentingGender: (await suggestAndConfirm('presentingGender', matchingResident?.gender || character.biologicalGender)).toLowerCase(),
    raceEthnicity: await suggestAndConfirm('raceEthnicity', matchingResident?.details?.raceEthnicity || 'white/caucasian'),
    sexualOrientation: (await suggestAndConfirm('sexualOrientation', matchingResident?.details?.sexualOrientation || 'heterosexual')).toLowerCase(),
    occupation: await suggestAndConfirm('occupation', matchingResident?.details?.occupation || 'Unemployed'),
    description: await suggestAndConfirm('description', matchingResident?.details?.description || `A ${character.age}-year-old ${character.biologicalGender}.`),
    appearance: {
      height: await suggestAndConfirm('height', matchingResident?.details?.appearance?.height || 'Average'),
      bodyType: await suggestAndConfirm('bodyType', matchingResident?.details?.appearance?.bodyType || 'Average'),
      hairColor: await suggestAndConfirm('hairColor', matchingResident?.details?.appearance?.hairColor || 'Brown'),
      hairStyle: await suggestAndConfirm('hairStyle', matchingResident?.details?.appearance?.hairStyle || 'Short'),
      eyeDescriptor: await suggestAndConfirm('eyeDescriptor', matchingResident?.details?.appearance?.eyeDescriptor || 'Normal'),
      eyeColor: await suggestAndConfirm('eyeColor', matchingResident?.details?.appearance?.eyeColor || 'Brown'),
      clothingStyle: await suggestAndConfirm('clothingStyle', matchingResident?.details?.appearance?.clothingStyle || 'Casual'),
    },
    goals: [],
  };

  if (matchingResident?.details?.goals && matchingResident.details.goals.length > 0) {
    for (const goal of matchingResident.details.goals) {
      const confirmedGoal = {
        goalType: await suggestAndConfirm('goalType', goal.goalType),
        goalName: await suggestAndConfirm('goalName', goal.goalName),
        goalDescription: await suggestAndConfirm('goalDescription', goal.goalDescription),
      };
      details.goals.push(confirmedGoal);
    }
  } else {
    let addingGoals = true;
    while (addingGoals) {
      const goal = {
        goalType: 'Story',
        goalName: await suggestAndConfirm('goalName', 'Find purpose'),
        goalDescription: await suggestAndConfirm('goalDescription', 'Discover their true calling in life'),
      };
      details.goals.push(goal);

      const addAnother = await promptUser('Would you like to add another goal? (YES/CONFIRM): ');
      if (addAnother.toUpperCase() !== 'YES') {
        addingGoals = false;
      }
    }
  }

  console.log('\nSummary of CharacterDetails:');
  console.log(JSON.stringify(details, null, 2));

  const confirmation = await promptUser('Type CONFIRM to save this CharacterDetails, or anything else to skip: ');
  if (confirmation === 'CONFIRM') {
    const newDetails = new CharacterDetails(details);
    await newDetails.save();
    console.log('CharacterDetails saved successfully.');
  } else {
    console.log('Skipped saving CharacterDetails.');
  }
}


async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');

    const characters = await Character.find();

    for (const character of characters) {
      const existingDetails = await CharacterDetails.findOne({ character_id: character._id });
      if (!existingDetails) {
        await createCharacterDetails(character);
      } else {
        console.log(`CharacterDetails already exist for ${character.name.first} ${character.name.last}`);
      }
    }

    console.log('Finished processing all characters.');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
    await mongoose.connection.close();
  }
}

main();