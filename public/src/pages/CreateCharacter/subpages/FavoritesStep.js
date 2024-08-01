import React from 'react';

const FavoritesStep = ({ character, handleChange, prevStep }) => {
  return (
    <div>
      <h2>Step 7: Favorites</h2>
      <form>
        <label>
          Favorites:
          <textarea name="favorites" value={character.favorites} onChange={handleChange} />
        </label>
        <div className='buttonRow'>
          <button type="button" onClick={prevStep}>Previous</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FavoritesStep;
