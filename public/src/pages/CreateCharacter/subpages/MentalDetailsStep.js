import React from 'react';

const OccupationEducationStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 2: Occupation and Education</h2>
      <form>
        <label>
          Occupation:
          <input type="text" name="occupation" value={character.occupation} onChange={handleChange} />
        </label>
        <label>
          Educational Level:
          <select name="education" value={character.education} onChange={handleChange}>
            <option value="">Select Education</option>
            <option value="High School">High School</option>
            <option value="Associate's Degree">Associate's Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
          </select>
        </label>
        <label>
          Political Views:
          <input type="text" name="politicalViews" value={character.politicalViews} onChange={handleChange} />
        </label>
        <label>
          Religious Views:
          <input type="text" name="religiousViews" value={character.religiousViews} onChange={handleChange} />
        </label>
        <div className='buttonRow'>
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default OccupationEducationStep;
