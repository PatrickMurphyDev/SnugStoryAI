import React from 'react';
import CreateSelect from "../../../components/CreateSelect";

         // {<textarea name="familyBackground" value={character.familyBackground} onChange={handleChange} />}

const RelationshipsBackstoryStep = ({ character, handleChange }) => {
  return (
    <div>
      <h2>Step 4: Relationships and Backstory</h2>
      <form>
        <label>
          Travel Experiences:
          <CreateSelect name="travelExperiences" value={character.travelExperiences} field_id={29} onChange={handleChange} />
        </label>
        <label>
          Family Background:
          <CreateSelect name="familyBackground" value={character.familyBackground} field_id={9} onChange={handleChange} />
        </label>
        <label>
          Relationship Status:
          <CreateSelect name="relationshipStatus" value={character.relationshipStatus} field_id={10} onChange={handleChange} />
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
      </form>
    </div>
  );
};

export default RelationshipsBackstoryStep;
