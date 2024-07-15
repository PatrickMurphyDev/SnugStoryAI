import React from "react";
import CharacterSkills from "./CharacterSkills";
import CharacterRelationships from "./CharacterRelationships";
import CharacterEntity from "./IslandSketch/Entities/CharacterEntity";

const CharacterComponent = () => {
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
    "Justine is a brave warrior with a  knack for both combat and crafting.",
    {
      strength: 80,
      agility: 70,
      intelligence: 60,
      charisma: 50,
    }
  );

  character.relationships = {
    friends: ["Bob", "Charlie"],
    disliked: ["Eve"],
    romantic: ["Dave"],
    romanticHistory: ["Frank"],
  };

  /*{typeof character.attributes[attr] === 'object'
                ? JSON.stringify(character.attributes[attr])
                : character.attributes[attr]}*/

  const CharacterAttributesDisplay = ()=>{
    return (
      <div className="attributes">
        <h2>Attributes</h2>
        <ul>
          {Object.keys(character.attributes.attributes).map((attr) => (
            <li key={attr}>
              <strong>{attr.charAt(0).toUpperCase() + attr.slice(1)}:</strong>{" "}
                {JSON.stringify(character.attributes.attributes[attr])}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="character-component" style={{paddingTop:125, overflow:"scroll"}}>
      <h1>{character.name}</h1>
      <div>
        <img src="images/Justine_profile.jpg" width={200} alt="Justine Character Portrait" />
      </div>
      <p>
        <strong>Bio:</strong> {character.bio}
      </p>
      <br />
      <CharacterAttributesDisplay />
      <br />
      <CharacterSkills character={character} />
      <br />
      <CharacterRelationships relationships={character.relationships} />
    </div>
  );
};

export default CharacterComponent;
