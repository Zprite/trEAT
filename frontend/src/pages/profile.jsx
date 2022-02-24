import React from 'react';
import NavBar from '../components/NavBar';
import RecipeThumbnail from '../components/Thumbnail';
import ProfileInfo from '../components/ProfileInfo';
import recipes from '../data/recipes';
import styles from '../styles/profile.module.css';

export default function Profile() {
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
    <div>
      <NavBar />
      <div>
        <ProfileInfo userName="Ola Nordmann" picture="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" />
      </div>
      <h2>Mine oppskrifter</h2>
      <div className={styles.recipeContainer}>
        {recipeCards}
      </div>
    </div>
  );
}
