import React from 'react';
import IngredientsView from '../components/IngredientsView';
import RecipeBody from '../components/RecipeBody';
import '../styles/globals.css';
import styles from '../styles/recipePage.module.css';
import recipes from '../data/recipes';

export default function recipePage() {
  const recipe = recipes[0];
  return (
    <div className="recipePageWrapper">
      <img
        src={recipe.image}
        alt="recipeImage"
        className={styles.recipeImage}
      />
      <div className={styles.recipeContainer}>
        <div className={styles.ingredientsContainer}>
          <h2 className={styles.ingredientsHeader}>Ingredients</h2>
          <IngredientsView recipeObject={recipe} />
        </div>
        <RecipeBody recipeObject={recipe} />
      </div>
    </div>
  );
}
