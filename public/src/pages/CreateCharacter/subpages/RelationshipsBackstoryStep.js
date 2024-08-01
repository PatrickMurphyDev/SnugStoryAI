import React from 'react';

const RelationshipsBackstoryStep = ({ character, handleChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Step 4: Relationships and Backstory</h2>
      <form>
        <label>
          Travel Experiences:
          <textarea name="travelExperiences" value={character.travelExperiences} onChange={handleChange} />
        </label>
        <label>
          Family Background:
          <textarea name="familyBackground" value={character.familyBackground} onChange={handleChange} />
        </label>
        <label>
          Relationship Status:
          <input type="text" name="relationshipStatus" value={character.relationshipStatus} onChange={handleChange} />
        </label>
        <label>
          Childhood Memories:
          <textarea name="childhoodMemories" value={character.childhoodMemories} onChange={handleChange} />
        </label>
        <label>
          Closest Friend:
          <input type="text" name="closestFriend" value={character.closestFriend} onChange={handleChange} />
        </label>
        <label>
          Role Models:
          <input type="text" name="roleModels" value={character.roleModels} onChange={handleChange} />
        </label>
        <label>
          Past Relationships:
          <textarea name="pastRelationships" value={character.pastRelationships} onChange={handleChange} />
        </label>
        <label>
          Secret Talents:
          <textarea name="secretTalents" value={character.secretTalents} onChange={handleChange} />
        </label>
        <button type="button" onClick={prevStep}>Previous</button>
        <button type="button" onClick={nextStep}>Next</button>
      </form>
    </div>
  );
};

export default RelationshipsBackstoryStep;
