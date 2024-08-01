import React from 'react';

const HealthDetailsStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 5: Health Details</h2>
      <form>
        <label>
          Health Details:
          <textarea name="healthDetails" value={character.healthDetails} onChange={handleChange} />
        </label>
        <div className='buttonRow'>
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default HealthDetailsStep;
