import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewCharacterComplete = (props) => {
  const id = props.id; // Character ID from the URL
  const [character, setCharacter] = useState(null);
  const [details, setDetails] = useState(null);
  const [personality, setPersonality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch character basic information, details, and personality data
    const fetchCharacter = axios.get(`http://localhost:5000/api/characters/${id}`);
    const fetchCharacterDetails = axios.get(`http://localhost:5000/api/characterDetails/${id}`);
    const fetchCharacterPersonality = axios.get(`http://localhost:5000/api/characterPersonality/${id}`);

    Promise.all([fetchCharacter, fetchCharacterDetails, fetchCharacterPersonality])
      .then(([characterResponse, detailsResponse, personalityResponse]) => {
        setCharacter(characterResponse.data);
        setDetails(detailsResponse.data);
        setPersonality(personalityResponse.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching character data:', err);
        setError('Failed to load character data.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading character data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-character-complete">
      <h2>Character: {character.name.first} {character.name.last}</h2>
      <p><strong>Age:</strong> {character.age}</p>
      <p><strong>Biological Gender:</strong> {character.biologicalGender}</p>

      {/* Extended Character Details */}
      {details && (
        <>
          <h3>Extended Character Details</h3>
          <p><strong>Presenting Gender:</strong> {details.presentingGender}</p>
          <p><strong>Sexual Orientation:</strong> {details.sexualOrientation}</p>
          <p><strong>Occupation:</strong> {details.occupation}</p>
          <h4>Appearance</h4>
          <ul>
            <li><strong>Height:</strong> {details.appearance.height}</li>
            <li><strong>Body Type:</strong> {details.appearance.bodyType}</li>
            <li><strong>Hair Color:</strong> {details.appearance.hairColor}</li>
            <li><strong>Hair Style:</strong> {details.appearance.hairStyle}</li>
            <li><strong>Eye Descriptor:</strong> {details.appearance.eyeDescriptor}</li>
            <li><strong>Eye Color:</strong> {details.appearance.eyeColor}</li>
            <li><strong>Clothing Style:</strong> {details.appearance.clothingStyle}</li>
          </ul>
          <p><strong>Description:</strong> {details.description}</p>
          <h4>Goals</h4>
          {details.goals.map((goal, index) => (
            <div key={index}>
              <p><strong>Goal Type:</strong> {goal.goalType}</p>
              <p><strong>Goal Name:</strong> {goal.goalName}</p>
              <p><strong>Goal Description:</strong> {goal.goalDescription}</p>
            </div>
          ))}
        </>
      )}

      {/* Personality Data */}
      {personality && (
        <>
          <h3>Character Personality</h3>
          <p><strong>Personality Traits:</strong> {personality.traits.join(', ')}</p>
          <p><strong>Behavioral Patterns:</strong> {personality.behavioral_patterns}</p>
          <p><strong>Special Conditions:</strong> {personality.special_conditions}</p>
          {/* Additional personality fields based on the schema */}
        </>
      )}
    </div>
  );
};

export default ViewCharacterComplete;
