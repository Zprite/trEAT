import React from 'react';
import { useParams } from 'react-router-dom';
import IngredientsView from '../../components/IngredientsView';
import RecipeBody from '../../components/RecipeBody';
import '../../styles/globals.css';
import styles from '../../styles/recipePage.module.css';
import recipes from '../../data/recipes';

export default function recipePage() {
  const { id } = useParams();

  const getRecipeByID = () => recipes.find((obj) => obj.id === id);

  const activeRecipe = getRecipeByID();

  return (
    <div className="recipePageWrapper">
      <img
        src={activeRecipe.image}
        alt="recipeImage"
        className={styles.recipeImage}
      />
      <div className={styles.recipeContainer}>
        <div className={styles.ingredientsContainer}>
          <h2 className={styles.ingredientsHeader}>Ingredients</h2>
          <IngredientsView recipeObject={activeRecipe} />
        </div>
        <RecipeBody recipeObject={activeRecipe} />
      </div>
    </div>
  );
}
