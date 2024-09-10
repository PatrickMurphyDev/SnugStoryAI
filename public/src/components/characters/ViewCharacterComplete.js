import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ViewCharacterComplete = (props) => {
  const id = props.id; // Character ID from the URL
  const [character, setCharacter] = useState(null);
  const [details, setDetails] = useState(null);
  const [personality, setPersonality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderGrayText = (txt) => {
    return <span style={{ color: "gray", fontSize: "12px" }}>{txt}</span>;
  };
  const showUndefined = (v) => {
    return v ? v : renderGrayText("Not Defined");
  };

  useEffect(() => {
    // Fetch character basic information, details, and personality data
    const fetchCharacter = axios.get(
      `http://localhost:5000/api/characters/${id}`
    );
    const fetchCharacterDetails = axios.get(
      `http://localhost:5000/api/characterDetails/${id}`
    );
    const fetchCharacterPersonality = axios.get(
      `http://localhost:5000/api/characterPersonality/${id}`
    );

    Promise.all([
      fetchCharacter,
      fetchCharacterDetails,
      fetchCharacterPersonality,
    ])
      .then(([characterResponse, detailsResponse, personalityResponse]) => {
        setCharacter(characterResponse.data);
        setDetails(detailsResponse.data);
        setPersonality(personalityResponse.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching character data:", err);
        setError("Failed to load character data.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading character data...</div>;
  if (error) return <div>{error}</div>;

  const DisplayDetailsAppearance = ()=>{return (<ul style={{paddingLeft:'10px'}}>
    <li>
      <strong>Height:</strong> {details.appearance.height}
    </li>
    <li>
      <strong>Body Type:</strong> {details.appearance.bodyType}
    </li>
    <li>
      <strong>Hair Color:</strong> {details.appearance.hairColor}
    </li>
    <li>
      <strong>Hair Style:</strong> {details.appearance.hairStyle}
    </li>
    <li>
      <strong>Eye Descriptor:</strong>{" "}
      {details.appearance.eyeDescriptor}
    </li>
    <li>
      <strong>Eye Color:</strong> {details.appearance.eyeColor}
    </li>
    <li>
      <strong>Clothing Style:</strong>{" "}
      {details.appearance.clothingStyle}
    </li>
  </ul>)};

  return (
    <Container>
      <h1>
        {character.name.first} <sub style={{color:"darkgray"}}>{character.name.last}</sub>
      </h1>
      <hr />
      <br />
      <p>
        <strong>Age:</strong> {character.age}
        <ul style={{paddingLeft:'10px'}}>
            <li>Birthdate: 01/31/1992</li>
            <li>Birthplace: Little Falls, NY, USA</li>
        </ul>
      </p>
      <p>
        <strong>Biological Gender:</strong> {character.biologicalGender}
      </p>
      <br />
      <br />

      {/* Extended Character Details */}
      {details && (
        <>
          <h3>Extended Character Details</h3>
          <hr />
          <p>
            <strong>Presenting Gender:</strong> {details.presentingGender}
          </p>
          <p>
            <strong>Sexual Orientation:</strong>{" "}
            {showUndefined(details.sexualOrientation)}
          </p>
          <p>
            <strong>Occupation:</strong> {showUndefined(details.occupation)}
          </p>
          <p>
            <strong>Description:</strong> {showUndefined(details.description)}
          </p>
          <h4>Appearance</h4>
          {details.appearance ? (
            <DisplayDetailsAppearance />
          ) : (
            <>
              <div>
                {renderGrayText(
                  "Height, Body Type, Hair Color, Hair Style, Eyes, Clothing Style etc..."
                )}
              </div>
              <div>
                <button style={{ display: "block-inline", float: "none" }}>
                  + Add Appearance Details
                </button>
              </div>
            </>
          )}
          <br />
          <br />
          <h4>Goals</h4>
          <br />
          {details.goals.map((goal, index) => (
            <div key={index}>
              <p>
                <strong>Goal Type:</strong> {goal.goalType}
              </p>
              <p>
                <strong>Goal Name:</strong> {goal.goalName}
              </p>
              <p>
                <strong>Goal Description:</strong> {goal.goalDescription}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Personality Data */}
      {personality && (
        <>
          <br />
          <br />
          <h3>Character Personality</h3>
          <hr />
          <p>
            <strong>Personality Traits:</strong>{" "}
            {(personality.traits || []).join(", ")}
          </p>
          <p>
            <strong>Behavioral Patterns:</strong>{" "}
            {personality.behavioral_patterns}
          </p>
          <p>
            <strong>Special Conditions:</strong>{" "}
            {personality.special_conditions}
          </p>
        </>
      )}

    <div><button onClick={()=>props.editItemFn()}>Edit</button> <button onClick={()=>props.deleteItemFn()}>Delete</button></div>
    
    </Container>
  );
};

export default ViewCharacterComplete;

const Container = styled.div`
  color: #fff;
  p {
    padding-top:10px;
  }
`;