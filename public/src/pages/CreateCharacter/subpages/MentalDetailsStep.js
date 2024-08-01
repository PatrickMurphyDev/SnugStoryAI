import React from 'react';

const MentalDetailsStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 2: Mental Details</h2>
      <form>
        <label>
          Education Level:
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
          Hobbies:
          <input type="text" name="hobbies" value={character.hobbies} onChange={handleChange} />
        </label>
        <label>
          Social Media Presence:
          <input type="text" name="socialMediaPresence" value={character.socialMediaPresence} onChange={handleChange} />
        </label>
        <label>
          Occupation:
          <input type="text" name="occupation" value={character.occupation} onChange={handleChange} />
        </label>
        <label>
          Political Beliefs:
          <input type="text" name="politicalViews" value={character.politicalViews} onChange={handleChange} />
        </label>
        <label>
          Religious Beliefs:
          <input type="text" name="religiousViews" value={character.religiousViews} onChange={handleChange} />
        </label>
        <label>
          Decision-Making Style:
          <input type="text" name="decisionMakingStyle" value={character.decisionMakingStyle} onChange={handleChange} />
        </label>
        <button type="button" onClick={prevStep}>Previous</button>
        <button type="button" onClick={nextStep}>Next</button>
      </form>
    </div>
  );
};

export default MentalDetailsStep;
