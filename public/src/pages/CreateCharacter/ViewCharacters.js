import React, { useState } from "react";
import CharacterDetailsDisplay from "../../components/CharacterDetailsDisplay";

import "./styles.css";
const ViewCharacters = () => {
  const [characters, setCharacters] = useState([]);

  // TODO: preload char list from server, display a loading notice until the request has finished loading. Use npm axios to load GET /api/v1/characters. then pass result to setCharacters fn to update state

  return (
    <>
      <div
        className="create-character-card"
        style={{ flexDirection: "column", display: "flex" }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            flex: "grow",
            width: "100%",
            position: "relative",
          }}
        >
          <div className="create-character create-character-card">
            <h1>Characters</h1>
            {characters.map((item) => (
              <CharacterDetailsDisplay character={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCharacters;
