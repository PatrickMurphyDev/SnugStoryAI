import React from 'react';

const RelationshipsStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 4: Relationships</h2>
      <form>
        <label>
          Relationships:
          <textarea name="relationships" value={character.relationships} onChange={handleChange} />
        </label>
        <div className='buttonRow'>
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default RelationshipsStep;
