import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ViewCharacter = (props) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/characters/${props.id}`) // Fetch character details
      .then((response) => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching character:', err);
        setError('Failed to load character details.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading character details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-character">
      <h2>{character.name.first} {character.name.last}</h2>
      <p><strong>Age:</strong> {character.age}</p>
      <p><strong>Gender:</strong> {character.biologicalGender}</p>
      {/* Additional character details */}
    </div>
  );
};

export default ViewCharacter;
