import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCharacter = (props) => {
  const [character, setCharacter] = useState({ name: { first: '', last: '' }, age: '', biologicalGender: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/characters/${props.id}`)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:5000/api/characters/${props.id}`, character)
      .then((response) => {
        console.log('Character updated successfully:', response.data);
        setMessage('Character updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating character:', error);
        setMessage('There was an error updating the character. Please try again.');
      });
  };

  if (loading) return <div>Loading character details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-character" style={{color:"#fff"}}>
      <h2>Edit Character</h2>
      <input type="text" name="first" value={character.name.first} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="last" value={character.name.last} onChange={handleChange} placeholder="Last Name" required />
      <input type="number" name="age" value={character.age} onChange={handleChange} placeholder="Age" required />
      <select name="biologicalGender" value={character.biologicalGender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button type="button" onClick={handleSubmit}>Save Changes</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditCharacter;
