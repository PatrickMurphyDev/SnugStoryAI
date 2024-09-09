import React, { useState, useEffect } from 'react';
import axios from 'axios';
const EditIsland = (props) => {
  const { id } = props.IslandID; // Island ID from the URL
  const [island, setIsland] = useState({ name: '', location: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/islands/${props.IslandID}`) // Fetch island data to prefill the form
      .then((response) => {
        setIsland(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching island:', err);
        setError('Failed to load island details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsland((prevIsland) => ({
      ...prevIsland,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, location, description } = island;

    if (!name) {
      alert('Please provide a name for the island.');
      return;
    }

    axios
      .put(`http://localhost:5000/api/islands/${props.IslandID}`, { name, location, description }) // Update island details
      .then((response) => {
        console.log('Island updated successfully:', response.data);
        setMessage('Island updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating island:', error);
        setMessage('There was an error updating the island. Please try again.');
      });
  };

  if (loading) return <div>Loading island details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-island">
      <h2 style={{color:"#fff"}}>Edit Island</h2>
      <input type="text" name="name" value={island.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="location" value={island.location} onChange={handleChange} placeholder="Location" />
      <textarea name="description" value={island.description} onChange={handleChange} placeholder="Description" />
      <button type="button" onClick={handleSubmit}>Save Changes</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditIsland;
