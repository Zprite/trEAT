import React from 'react';
import styles from '../styles/RecipeIngredientsInput.module.css';

export default function RecipeIngredientsInput() {
  return (
    <div className={styles.RecipeIngredientsInput}>
      <h2>Ingredients</h2>
      <ul id="recipeList">
        <li />
      </ul>
      <div className={styles.addEntryContainer}>
        <button type="button"> +</button>
        <input type="text" id="newIngredientSubmission" />
      </div>
    </div>
  );
}
