import React from "react";
import CharacterSkills from "./CharacterSkills";
import CharacterEntity from "./IslandSketch/Entities/CharacterEntity";

const CharacterDetailsDisplay = (props) => {
  const characterData = props.character;
  const characterId = props.character._id || props.characterId;
  const isHidden = false;
  const character = new CharacterEntity(props.character);

  /* // If a character is passed via props, set it as the selectedCharacter
    if (props.character) {
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
    }*/

  const displaySetting = !isHidden ? {} : { display: "none" };

  return (
    <div
      className="character-component"
      id={"char-" + characterId}
      style={{ paddingTop: 125, overflow: "scroll" }}
    >
      {
        // Display selected character info with a large image
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1 style={{ flexGrow: "2" }}>
              {character.info.name} - {character.info.age}
            </h1>
          </div>
          <div>
            <img
              src={character.img.replace(64, 256)}
              width={40}
              alt={`${character.info.name} Character Portrait`}
            />
          </div>
          <p>
            <strong>Gender:</strong> {character.info.gender}
          </p>
          <p>
            <strong>Bio:</strong> {character.info.bio}
          </p>
        </div>
      }
    </div>
  );
};

export default CharacterDetailsDisplay;
