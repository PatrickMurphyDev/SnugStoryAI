import React from 'react';

const PersonalityDetailsStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 5: Personality Details</h2>
      <form>
        <label>
          Volunteer Work:
          <textarea name="volunteerWork" value={character.volunteerWork} onChange={handleChange} />
        </label>
        <label>
          Proudest Achievement:
          <textarea name="proudestAchievement" value={character.proudestAchievement} onChange={handleChange} />
        </label>
        <label>
          Personal Flaws:
          <textarea name="personalFlaws" value={character.personalFlaws} onChange={handleChange} />
        </label>
        <label>
          Biggest Regret:
          <textarea name="biggestRegret" value={character.biggestRegret} onChange={handleChange} />
        </label>
        <label>
          Biggest Fear:
          <textarea name="biggestFear" value={character.biggestFear} onChange={handleChange} />
        </label>
        <label>
          Greatest Ambition:
          <textarea name="greatestAmbition" value={character.greatestAmbition} onChange={handleChange} />
        </label>
        <label>
          Personal Motto:
          <input type="text" name="personalMotto" value={character.personalMotto} onChange={handleChange} />
        </label>
        <label>
          Pet Peeves:
          <textarea name="petPeeves" value={character.petPeeves} onChange={handleChange} />
        </label>
        <label>
Strengths:
<textarea name="strengths" value={character.strengths} onChange={handleChange} />
</label>
<label>
Weaknesses:
<textarea name="weaknesses" value={character.weaknesses} onChange={handleChange} />
</label>
<label>
Preferred Communication Style:
<textarea name="preferredCommunicationStyle" value={character.preferredCommunicationStyle} onChange={handleChange} />
</label>
<label>
Sense of Humor:
<textarea name="senseOfHumor" value={character.senseOfHumor} onChange={handleChange} />
</label>
<label>
Conflict Resolution Style:
<textarea name="conflictResolutionStyle" value={character.conflictResolutionStyle} onChange={handleChange} />
</label>
<label>
Superstitions:
<textarea name="superstitions" value={character.superstitions} onChange={handleChange} />
</label>
<button type="button" onClick={prevStep}>Previous</button>
<button type="button" onClick={nextStep}>Next</button>
</form>
</div>
);
};

export default PersonalityDetailsStep;
