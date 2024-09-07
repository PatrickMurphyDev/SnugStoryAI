import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterDetailsDisplay from "../../components/CharacterDetailsDisplay";

import "./styles.css";

const ViewCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch characters from server
    axios
      .get("http://localhost:5000/api/characters")
      .then((response) => {
        setCharacters(response.data); // Update state with character data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  return (
    <>
      <div
        className="create-character-card"
        style={{ flexDirection: "column", display: "flex" }}
      >
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            flex: "grow",
            width: "100%",
            position: "relative",
          }}
        >
          <h1>View Characters</h1>
          <div>
            {loading ? (
              <div>Loading characters...</div>
            ) : characters.length > 0 ? (
              characters.map((item) => (
                <CharacterDetailsDisplay key={item.id} character={item} /> // Use a unique key for each character
              ))
            ) : (
              "No Characters"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCharacters;
