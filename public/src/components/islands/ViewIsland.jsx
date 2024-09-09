import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ViewIsland = (props) => {
  const [island, setIsland] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/islands/${props.IslandID}`) // Fetch island data from the server
      .then((response) => {
        setIsland(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching island:', err);
        setError('Failed to load and view island details.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading island details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-island" style={{color:'#fff'}}>
      <h2>{island.name}</h2>
      <p><strong>Location:</strong> {island.location}</p>
      <p><strong>Description:</strong> {island.description}</p>
      <div><button onClick={()=>props.editIslandFn()}>Edit</button> <button onClick={()=>props.deleteIslandFn()}>Delete</button></div>
    </div>
  );
};

export default ViewIsland;