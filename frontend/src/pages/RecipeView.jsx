/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cn from 'classnames';
import RecipeThumbnail from '../components/Thumbnail';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import styles from '../styles/recipeView.module.css';
import UserCredentialsView from '../components/UserCredentialsView';

export default function RecipeView() {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [searchWord, setSearchWord] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/recipes',
      );
      setRecipeData(response.data);
      setFilteredRecipes(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setRecipeData(null);
    } finally {
      setLoading(false);
    }
  };

  const filterData = async () => {
    try {
      const newFilteredRecipes = [];
      for (let i = 0; i < recipeData.length; i += 1) {
        Object.entries(recipeData[i]).some((keyVal) => {
          const [key, value] = keyVal;
          if (key === 'title' || key === 'description') {
            if (value.toLowerCase().includes(searchWord.toLowerCase())) {
              newFilteredRecipes.push(recipeData[i]);
              return true;
            }
          } else if (key === 'ingredients') {
            for (let j = 0; j < value.length; j += 1) {
              if (value[j].name.toLowerCase().includes(searchWord.toLowerCase())) {
                newFilteredRecipes.push(recipeData[i]);
                return true;
              }
            }
          }
          return false;
        });
      }
      setFilteredRecipes(newFilteredRecipes);
      setError(null);
    } catch (err) {
      setError(err.message);
      setRecipeData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchWord]);

  return (
    <div>
      <NavBar />
      <div className={cn(styles.outerContainer, 'background')}>
        <div className={cn(styles.recipeContainer, 'background')}>
          <UserCredentialsView />
          <SearchBar setSearchWord={setSearchWord} />
          {loading && <div>Loading recipes...</div>}
          {error && (
            <div>{`Error fetching recipes:  ${error}`}</div>
          )}
          {filteredRecipes && !filteredRecipes.length && (
            <div>No recipes matched your search</div>
          )}
          {filteredRecipes && filteredRecipes.map((recipe) => (
            <RecipeThumbnail
              key={recipe._id}
              title={recipe.title}
              duration={`${recipe.duration} min`}
              image={recipe.imagePath}
              description={recipe.description}
              rating={recipe.rating}
              id={recipe._id}
              userID={recipe.userID}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
