import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import RecipeThumbnail from '../components/Thumbnail';
import ProfileInfo from '../components/ProfileInfo';
import styles from '../styles/profile.module.css';

export default function Profile() {
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
    <div>
      <NavBar />
      <div className={styles.profileWrapper}>
        <div>
          <ProfileInfo userName="Ola Nordmann" picture="https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png" />
        </div>
        <h2>Mine oppskrifter</h2>
        <div className={styles.recipeContainer}>
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
