const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { Character } = require("./models/v3/Character/CharacterModel");
const { CharacterDetails } = require("./models/v3/Character/CharacterDetails");

const exportCharacterData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection Successful");

    const characters = await Character.find();
    const characterDetails = await CharacterDetails.find();

    const characterDir = path.join(__dirname, "../Documentation/dbViz/characters");
    const characterDetailsDir = path.join(characterDir, "CharacterDetails");

    // Ensure directories exist
    if (!fs.existsSync(characterDir)) {
      fs.mkdirSync(characterDir, { recursive: true });
    }
    if (!fs.existsSync(characterDetailsDir)) {
      fs.mkdirSync(characterDetailsDir, { recursive: true });
    }

    // Export Characters
    for (const char of characters) {
      const fileName = `${char._id}.md`;
      const filePath = path.join(characterDir, fileName);
      let content = `# Character: ${char.name.first} ${char.name.last}\n\n`;
      content += `ID: ${char._id}\n`;
      content += `island_id: ${char.island_id}\n`;
      content += `is_npc: ${char.is_npc}\n`;
      content += `is_active: ${char.is_active}\n`;
      content += `Name: ${char.name}\n`;
      content += `Age: ${char.age}\n`;
      content += `Bio Gender: ${char.biologicalGender}\n`;
      content += `Character Details: [[CharacterDetails/${char._id}]]\n`;

      fs.writeFileSync(filePath, content);
    }

    // Export Character Details
    for (const details of characterDetails) {
      const fileName = `${details.character_id}.md`;
      const filePath = path.join(characterDetailsDir, fileName);
      let content = `# Character Details: ${details._id}\n\n`;
      content += `Character: [[../${details.character_id}]]\n`;
      content += `ID: ${details._id}\n`;
      content += `Gender: ${details.presentingGender}\n`;
      content += `Description: ${details.description}\n`;
      content += `Occupation: ${details.occupation}\n\n`;
      content += `Traits: ${JSON.stringify(details.traits, null, 2)}\n`;
      content += `Personality: ${JSON.stringify(details.personality, null, 2)}\n`;
      content += `\n`;
      //content += `Relationships: \n ${JSON.stringify(relationships, null, 2)}\n`;

      fs.writeFileSync(filePath, content);
    }

    console.log("Export completed successfully!");
  } catch (error) {
    console.error("Error exporting data:", error);
  } finally {
    await mongoose.disconnect();
  }
};

exportCharacterData();