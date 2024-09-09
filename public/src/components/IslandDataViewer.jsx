import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed and imported

const IslandDataViewer = () => {
  const [islands, setIslands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of islands from the backend
    axios
      .get('http://localhost:5000/api/islands') // Ensure the correct endpoint is set up on your server
      .then((response) => {
        setIslands(response.data); // Set islands with the data received
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching islands:', err);
        setError('Failed to load islands');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading islands...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="islands-list">
      <h2>Islands List</h2>
      {islands.length > 0 ? (
        <ul>
          {islands.map((island) => (
            <li key={island._id}>
              <h3>{island.name}</h3>
              <p>{island.location}</p>
              <p>{island.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No islands found.</p>
      )}
    </div>
  );
};

export default IslandDataViewer;
