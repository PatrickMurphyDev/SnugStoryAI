import React from 'react';

const MentalHealthStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 6: Mental Health Details</h2>
      <form>
        <label>
          Mental Health Details:
          <textarea name="mentalHealthDetails" value={character.mentalHealthDetails} onChange={handleChange} />
        </label>
        <div className='buttonRow'>
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default MentalHealthStep;
