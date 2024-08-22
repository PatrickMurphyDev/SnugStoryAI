import React, { useState } from "react";
import CharacterSkills from "./CharacterSkills";
import CharacterRelationships from "./CharacterRelationships";
import CharacterEntity from "./IslandSketch/Entities/CharacterEntity";

const CharacterComponent = (props) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedCharacterUpdated, setSelectedCharacterUpdated] = useState(false);

  // If a character is passed via props, set it as the selectedCharacter
  if (props.character && !selectedCharacter) {
    const character = new CharacterEntity(
      "Justine",
      28,
      "female",
      [
        { mainCategory: "Combat", subCategory: "Swordsmanship", value: 75 },
        { mainCategory: "Combat", subCategory: "Archery", value: 60 },
        { mainCategory: "Crafting", subCategory: "Blacksmithing", value: 50 },
        { mainCategory: "Crafting", subCategory: "Alchemy", value: 40 },
      ],
      "Justine is a brave warrior with a knack for both combat and crafting.",
      {
        strength: 80,
        agility: 70,
        intelligence: 60,
        charisma: 50,
      }
    );
    setSelectedCharacter(character);
  }

  const villagers = props.villagers || [
    // Example villagers, replace with actual villagers from your app
    {
      name: "Justine",
      age: 28,
      occupation: "Warrior",
      img: "images/Justine_profile.jpg",
    },
    {
      name: "Bob",
      age: 35,
      occupation: "Blacksmith",
      img: "images/Bob_profile.jpg",
    },
    {
      name: "Alice",
      age: 22,
      occupation: "Farmer",
      img: "images/Alice_profile.jpg",
    },
    // Add more villagers
  ];

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const CharacterAttributesDisplay = () => {
    return (
      <div className="attributes">
        <h2>Attributes</h2>
        <ul>
          {Object.keys(selectedCharacter.attributes.attributes).map((attr) => (
            <li key={attr}>
              <strong>
                {selectedCharacter.attributes.attributes[attr].title}:
              </strong>{" "}
              {JSON.stringify(
                selectedCharacter.attributes.attributes[attr].value
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };


  // TODO add job details, state 
  return (
    <div
      className="character-component"
      style={{ paddingTop: 125, overflow: "scroll" }}
    >
      {selectedCharacter ? (
        // Display selected character info with a large image
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ flexGrow: "2" }}>{selectedCharacter.info.name} - {selectedCharacter.info.age}</h1>

            <button style={{position: "absolute", top:"0px"}} onClick={() => setSelectedCharacter(null)}>&lt; Back</button>
          </div>
          <div>
            <img
              src={selectedCharacter.img.replace(64, 256)}
              width={200}
              alt={`${selectedCharacter.info.name} Character Portrait`}
            />
          </div>
          <p>
            <strong>State:</strong> {selectedCharacter.getCurrentState()}
          </p>
          <p>
            <strong>Gender:</strong> {selectedCharacter.info.gender}
          </p>
          <p>
            <strong>Bio:</strong> {selectedCharacter.info.bio}
          </p>
          <br />
          <CharacterAttributesDisplay />
          <br />
          {/*<CharacterSkills character={selectedCharacter} />
          <br />*/}
          <CharacterRelationships
            relationships={selectedCharacter.relationships}
          />
          <CharacterSkills character={selectedCharacter}></CharacterSkills>
        </div>
      ) : (
        // Display list of villagers with small images when no character is selected
        <div>
          <h2>Villagers</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {villagers.map((villager, index) => (
              <li
                key={index}
                onClick={() => handleSelectCharacter(villager)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={villager.img}
                  alt={villager.info.name}
                  style={{ width: "50px", height: "auto", marginRight: "10px" }}
                />
                <span>
                  {villager.info.name} - {villager.info.age}{" "}
                  {villager.info.gender}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CharacterComponent;
