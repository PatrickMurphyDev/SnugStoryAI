import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListCharacters = (props) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/characters') // Endpoint to fetch characters
      .then((response) => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching characters:', err);
        setError('Failed to load characters.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="characters-list">
      <h2>Characters List</h2>
      {characters.length > 0 ? (
        <ul>
          {characters.map((character, index) => (
            <li key={character._id}>
              <h3 onClick={() => props.changeItem(character,index)}>{character.name.first} {character.name.last}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No characters found.</p>
      )}
    </div>
  );
};

export default ListCharacters;
