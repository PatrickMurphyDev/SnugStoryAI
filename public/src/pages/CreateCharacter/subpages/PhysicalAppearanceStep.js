import React from 'react';

const PhysicalStyleStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 3: Physical Description and Style</h2>
      <form>
        <label>
          Physical Description:
          <textarea name="physicalDescription" value={character.physicalDescription} onChange={handleChange} />
        </label>
        <label>
          Style Details:
          <textarea name="styleDetails" value={character.styleDetails} onChange={handleChange} />
        </label>
        <div className='buttonRow'>
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default PhysicalStyleStep;
