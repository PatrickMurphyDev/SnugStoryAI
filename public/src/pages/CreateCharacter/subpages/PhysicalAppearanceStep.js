import React from 'react';

const PhysicalAppearanceStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 3: Physical Appearance and Style</h2>
      <form>
        <label>
          Physical Description:
          <textarea name="physicalDescription" value={character.physicalDescription} onChange={handleChange} />
        </label>
        <label>
          Style of Dress:
          <textarea name="styleDetails" value={character.styleDetails} onChange={handleChange} />
        </label>
        <button type="button" onClick={prevStep}>Previous</button>
        <button type="button" onClick={nextStep}>Next</button>
      </form>
    </div>
  );
};

export default PhysicalAppearanceStep;
