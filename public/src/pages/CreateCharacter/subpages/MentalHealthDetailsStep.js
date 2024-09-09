import React from 'react';

const MentalHealthDetailsStep = ({ character, handleChange}) => {
  return (
    <div>
      <h2>Step 7: Mental Health Details</h2>
      <form>
        <label>
          Mental Health:
          <textarea name="mentalHealth" value={character.mentalHealth} onChange={handleChange} />
        </label>
        <label>
          Emotional Triggers:
          <textarea name="emotionalTriggers" value={character.emotionalTriggers} onChange={handleChange} />
        </label>
      </form>
    </div>
  );
};

export default MentalHealthDetailsStep;
