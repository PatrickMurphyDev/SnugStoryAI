import React from 'react';

const RoutineDetailsStep = ({ character, handleChange }) => {
  return (
    <div>
      <h2>Step 6: Routine Details</h2>
      <form>
        <label>
          Typical Daily Routine:
          <textarea name="typicalDailyRoutine" value={character.typicalDailyRoutine} onChange={handleChange} />
        </label>
        <label>
          Fitness Routine:
          <textarea name="fitnessRoutine" value={character.fitnessRoutine} onChange={handleChange} />
        </label>
        <label>
          Allergies:
          <textarea name="allergies" value={character.allergies} onChange={handleChange} />
        </label>
      </form>
    </div>
  );
};

export default RoutineDetailsStep;
