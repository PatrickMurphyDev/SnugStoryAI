import React, { useState } from "react";
import styled from "styled-components";
import IslandSketch from "../components/IslandSketch/IslandSketch";
import CharacterComponent from "../components/CharacterComponent";
import LocationComponent from "../components/LocationComponent";
export default function Map() {
  const [propertySelected, setPropertySelected] = useState(null);
  const [characterSelected, setCharacterSelected] = useState(null);
  const [charList, setCharList] = useState([]);

  const handleCharacterSelect = (character) => {
    if (characterSelected) characterSelected.deselect();
    character.select();
    setCharacterSelected(character);
  };

  const handlePropertySelect = (property) => {
    if (propertySelected) propertySelected.deselect();
    property.select();
    setPropertySelected(property);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", backgroundColor:"#0a0a1e", color:"#eee" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <LocationComponent
            lot={propertySelected}
            setPropertySelected={setPropertySelected}
          />
        </div>
        <Container>
          <div className="canvasScreen">
            <IslandSketch
              onCharacterSelect={handleCharacterSelect}
              onPropertySelect={handlePropertySelect}
              charList={charList}
              setCharList={setCharList}
            />
          </div>
          <div>
            <h1>Chat</h1>
          </div>
        </Container>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CharacterComponent
            character={characterSelected}
            villagers={charList}
          />
        </div>
      </div>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
