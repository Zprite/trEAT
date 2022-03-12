/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeThumbnail from '../components/Thumbnail';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import styles from '../styles/recipeOverview.module.css';
import UserCredentialsView from '../components/UserCredentialsView';

export default function RecipeView() {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [searchWord, setSearchWord] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState(null);

  useEffect(() => {
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
    getData();
  }, []);

  useEffect(() => {
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
    filterData();
  }, [searchWord]);

  return (
    <div>
      <NavBar />
      <div className={styles.outerContainer}>
        <div className={styles.recipeContainer}>
          <UserCredentialsView />
          <SearchBar setSearchWord={setSearchWord} />
          {loading && <div>Loading recipes...</div>}
          {error && (
            <div>{`Error fetching recipes:  ${error}`}</div>
          )}
          {filteredRecipes && filteredRecipes.map((recipe) => (
            <RecipeThumbnail
              key={recipe._id}
              title={recipe.title}
              duration={`${recipe.duration} min`}
              image={recipe.imagePath}
              description={recipe.description}
              rating={recipe.rating}
              link={`/recipe/${recipe._id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
