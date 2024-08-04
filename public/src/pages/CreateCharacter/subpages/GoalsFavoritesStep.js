import React from "react";
import CreateSelect from "../../../components/CreateSelect";

/*
        <label>
          Most Prized Possession:
          <textarea
            name="mostPrizedPossession"
            value={character.mostPrizedPossession}
            onChange={handleChange}
          />
        </label>
        <label>
          Collecting Habits:
          <textarea
            name="collectingHabits"
            value={character.collectingHabits}
            onChange={handleChange}
          />
        </label> */

const GoalsFavoritesStep = ({ character, handleChange, prevStep }) => {
  return (
    <div>
      <h2>Step 8: Goals and Favorites</h2>
      <form>
        <label>
          Dream Home:
          <CreateSelect field_id={48}
            name="dreamHome"
            value={character.dreamHome}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Season:
          <CreateSelect field_id={34}
            type="text"
            name="favoriteSeason"
            value={character.favoriteSeason}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Childhood Toy:
          <CreateSelect field_id={40}
            name="favoriteChildhoodToy"
            value={character.favoriteChildhoodToy}
            onChange={handleChange}
          />
        </label>
        <label>
          Ideal Vacation:
          <CreateSelect field_id={39}
            name="idealVacation"
            value={character.idealVacation}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Sports:
          <CreateSelect field_id={45}
            name="favoriteSports"
            value={character.favoriteSports}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Books:
          <CreateSelect field_id={6}
            name="favoriteBooks"
            value={character.favoriteBooks}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Movies:
          <CreateSelect field_id={7}
            name="favoriteMovies"
            value={character.favoriteMovies}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Music Genre:
          <CreateSelect name="favoriteMusicGenre" field_id={8} 
            value={character.favoriteMusicGenre}
            onChange={handleChange} />
        </label>
        <label>
          Favorite Foods:
          <CreateSelect field_id={27}
            name="favoriteFoods"
            value={character.favoriteFoods}
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  );
};

export default GoalsFavoritesStep;
