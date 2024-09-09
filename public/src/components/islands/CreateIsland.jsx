import React, { useState } from 'react';
import axios from 'axios';

const CreateIsland = () => {
  const [island, setIsland] = useState({ name: '', location: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsland((prevIsland) => ({
      ...prevIsland,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, location, description } = island;

    // Validate required fields
    if (!name) {
      alert('Please provide a name for the island.');
      return;
    }

    // Send a POST request to create a new island
    axios
      .post('http://localhost:5000/api/islands', { name, location, description })
      .then((response) => {
        console.log('Island created successfully:', response.data);
        setMessage('Island created successfully!');
      })
      .catch((error) => {
        console.error('Error creating island:', error);
        setMessage('There was an error creating the island. Please try again.');
      });
  };

  return (
    <div className="create-new-island">
      <h2 style={{color:'#fff'}}>Create a New Island</h2>
      <input type="text" name="name" value={island.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="location" value={island.location} onChange={handleChange} placeholder="Location" />
      <textarea name="description" value={island.description} onChange={handleChange} placeholder="Description" />
      <button type="button" onClick={handleSubmit}>Create Island</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateIsland;
