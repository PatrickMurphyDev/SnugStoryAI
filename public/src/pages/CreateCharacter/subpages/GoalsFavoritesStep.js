import React from 'react';

const GoalsFavoritesStep = ({ character, handleChange, prevStep }) => {
  return (
    <div>
      <h2>Step 8: Goals and Favorites</h2>
      <form>
        <label>
          Dream Home:
          <textarea name="dreamHome" value={character.dreamHome} onChange={handleChange} />
        </label>
        <label>
          Most Prized Possession:
          <textarea name="mostPrizedPossession" value={character.mostPrizedPossession} onChange={handleChange} />
        </label>
        <label>
          Favorite Season:
          <input type="text" name="favoriteSeason" value={character.favoriteSeason} onChange={handleChange} />
        </label>
        <label>
          Favorite Childhood Toy:
          <input type="text" name="favoriteChildhoodToy" value={character.favoriteChildhoodToy} onChange={handleChange} />
        </label>
        <label>
          Collecting Habits:
          <textarea name="collectingHabits" value={character.collectingHabits} onChange={handleChange} />
        </label>
        <label>
          Ideal Vacation:
          <textarea name="idealVacation" value={character.idealVacation} onChange={handleChange} />
        </label>
        <label>
          Favorite Sports:
          <textarea name="favoriteSports" value={character.favoriteSports} onChange={handleChange} />
        </label>
        <label>
          Favorite Books:
          <textarea name="favoriteBooks" value={character.favoriteBooks} onChange={handleChange} />
        </label>
        <label>
          Favorite Movies:
          <textarea name="favoriteMovies" value={character.favoriteMovies} onChange={handleChange} />
        </label>
        <label>
          Favorite Music Genre:
          <textarea name="favoriteMusicGenre" value={character.favoriteMusicGenre} onChange={handleChange} />
        </label>
        <label>
          Favorite Foods:
          <textarea name="favoriteFoods" value={character.favoriteFoods} onChange={handleChange} />
        </label>
        <button type="button" onClick={prevStep}>Previous</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GoalsFavoritesStep;
