import React from "react";
import styled from "styled-components";
import IslandSketch from "../components/IslandSketch/IslandSketch";
import CharacterComponent from "../components/CharacterComponent";
import LocationComponent from "../components/LocationComponent";
export default function Map() {
  return (
    <>
    <div style={{display:'flex', flexDirection:'row'}}>
      <div style={{display:'flex', flexDirection:'column'}}>
          <LocationComponent lot={IslandSketch.selectedLot}  />
      </div>
      <Container>
        <div className="canvasScreen">
          <IslandSketch />
        </div>
        <div>
          <h1>Chat</h1>
        </div>
      </Container>
      <div style={{display:'flex', flexDirection:'column'}}>
          <CharacterComponent character={IslandSketch.villigers} />
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
