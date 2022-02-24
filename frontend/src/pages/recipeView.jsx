/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeThumbnail from '../components/Thumbnail';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import styles from '../styles/recipeOverview.module.css';

export default function RecipeView() {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/recipes',
        );
        console.log(response);
        setRecipeData(response.data);
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

  return (
    <div id="page">
      <NavBar />
      <div className={styles.outerContainer}>
        <div className={styles.recipeContainer}>
          <SearchBar />
          {loading && <div>Loading recipes...</div>}
          {error && (
            <div>{`Error fetching recipes:  ${error}`}</div>
          )}
          {recipeData && recipeData.map((recipe) => (
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
