import React from 'react';

const BasicDetailsStep = ({ character, handleChange, nextStep }) => {
  return (
    <div>
      <h2>Step 1: Basic Character Details</h2>
      <form>
        <label>
          Age:
          <input type="number" name="age" value={character.age} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <select name="gender" value={character.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Name:
          <input type="text" name="name" value={character.name} onChange={handleChange} />
        </label>
        <label>
          Birthplace:
          <input type="text" name="birthplace" value={character.birthplace} onChange={handleChange} />
        </label>
        <label>
          Culture:
          <input type="text" name="culture" value={character.culture} onChange={handleChange} />
        </label>
        <label>
          Race/Ethnicity:
          <input type="text" name="raceEthnicity" value={character.raceEthnicity} onChange={handleChange} />
        </label>
        <label>
          Brief Physical Summary:
          <textarea name="physicalSummary" value={character.physicalSummary} onChange={handleChange} />
        </label>
        <div className='buttonRow'>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default BasicDetailsStep;
