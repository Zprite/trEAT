/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import IngredientsView from '../../components/IngredientsView';
import RecipeBody from '../../components/RecipeBody';
import '../../styles/globals.css';
import styles from '../../styles/recipePage.module.css';

export default function RecipePage() {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipe/${id}`,
        );
        console.log(response);
        setRecipeData(response.data.data);
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

  console.log(recipeData);
  return (
    <div className="recipePageWrapper">
      {loading && <div>Loading recipes...</div>}
      {error && (
      <div>{`Error fetching recipes:  ${error}`}</div>
      )}
      {recipeData && (
      <>
        <img
          src={recipeData.imagePath}
          alt="recipeImage"
          className={styles.recipeImage}
        />
        <div className={styles.recipeContainer}>
          <div className={styles.ingredientsContainer}>
            <h2 className={styles.ingredientsHeader}>Ingredients</h2>
            <IngredientsView recipeObject={recipeData} />
          </div>
          <RecipeBody recipeObject={recipeData} />
        </div>
      </>
      )}
    </div>
  );
}
