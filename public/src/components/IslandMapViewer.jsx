import React, { useState } from 'react';
import IslandSketch from './IslandSketch';
import CharacterComponent from './CharacterComponent';
import PropertyComponent from './PropertyComponent';

const IslandMapViewer = () => {
  const [villagers, setVillagers] = useState([]);
  const [propertySelected, setPropertySelected] = useState(null);
  const [characterSelected, setCharacterSelected] = useState(null);

  const handleCharacterSelect = (character) => {
    setCharacterSelected(character);
  };

  const handlePropertySelect = (property) => {
    setPropertySelected(property);
  };

  return (
    <div>
      <PropertyComponent property={propertySelected} />
      <IslandSketch
        villagers={villagers}
        setVillagers={setVillagers}
        onCharacterSelect={handleCharacterSelect}
        onPropertySelect={handlePropertySelect}
      />
      <CharacterComponent character={characterSelected} />
    </div>
  );
};

export default IslandMapViewer;
