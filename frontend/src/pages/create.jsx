import React from 'react';
import Header from '../components/Header';
import RecipeImageInput from '../components/RecipeImageInput';
import RecipeTitleInput from '../components/RecipeTitleInput';
import RecipeTimeInput from '../components/RecipeTimeInput';
import '../styles/globals.css';
import styles from '../styles/create.module.css';
import RecipeDescriptionInput from '../components/RecipeDescriptionInput';
import RecipeIngredientsInput from '../components/RecipeIngredientsInput';
import RecipeStepsMarkdown from '../components/RecipeStepsMarkdown';

export default function Create() {
  return (
    <div className="centeredPageWrapper">
      <Header title="Create recipe" />
      <div className="recipeCreator">
        <RecipeImageInput />
        <div className={styles.timeTitleContainer}>
          <RecipeTitleInput />
          <RecipeTimeInput />
        </div>
        <RecipeDescriptionInput />
        <RecipeIngredientsInput />
        <RecipeStepsMarkdown />

      </div>
      <div>Ekstra innhold på siden</div>
    </div>
  );
}
