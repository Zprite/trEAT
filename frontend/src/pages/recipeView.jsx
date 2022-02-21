import React from 'react';
import RecipeThumbnail from '../components/Thumbnail';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import styles from '../styles/recipeOverview.module.css';
import recipes from '../data/recipes';

export default function RecipeView() {
  const recipeCards = recipes.map((recipe) => (
    <RecipeThumbnail
      title={recipe.title}
      picture={recipe.image}
      duration={`${recipe.duration} min`}
      description={recipe.description}
      rating={recipe.rating}
      link={`/recipe/${recipe.id}`}
    />
  ));

  return (
    <div id="page">
      <NavBar />
      <div className={styles.outerContainer}>
        <div className={styles.recipeContainer}>
          <SearchBar />
          {recipeCards}
        </div>
      </div>
    </div>
  );
}
