import React from 'react';

const PhysicalAppearanceStep = ({ character, handleChange }) => {
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
      </form>
    </div>
  );
};

export default PhysicalAppearanceStep;
