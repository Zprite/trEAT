import React, { useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import RecipeThumbnail from '../components/Thumbnail';
import ProfileInfo from '../components/ProfileInfo';
import styles from '../styles/profile.module.css';
import { UserContext } from '../context/UserContext';

export default function Profile() {
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(
    () => {
      axios({
        method: 'get',
        url: 'http://localhost:8000/users/me',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.token}`,
        },
        withCredentials: 'include',
      })
        .then(async (response) => {
        // handle success
          console.log('Credentials fetch response:', response);
          setUserContext((oldValues) => ({ ...oldValues, details: response.data }));
        })
        .catch((response) => {
        // handle error
          if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
            window.location.reload();
          } else {
            setUserContext((oldValues) => ({ ...oldValues, details: null }));
          }
        });
    },
    [setUserContext, userContext.token],
  );

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  return (
    !userContext.details ? (
      <div>Loading Recipes</div>) : (
        <div>
          <NavBar />
          <div className={styles.profileWrapper}>
            <div>
              <ProfileInfo
                userName={userContext.details.username}
                profilePicture={ProfileInfo.profilePicture}
              />
            </div>
            <h2>Mine oppskrifter</h2>
            <div className={styles.recipeContainer}>
              {userContext.details && userContext.details.recipes.map((recipe) => (
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
    )
  );
}
