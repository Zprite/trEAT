/* eslint-disable no-console */
import React, { useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import cn from 'classnames';
import NavBar from '../components/NavBar';
import RecipeThumbnail from '../components/Thumbnail';
import ProfileInfo from '../components/ProfileInfo';
import styles from '../styles/profile.module.css';
import { UserContext } from '../context/UserContext';
import UserCredentialsView from '../components/UserCredentialsView';

export default function Profile() {
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(
    () => {
      axios({
        method: 'get',
        url: 'http://localhost:8000/user/me',
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
          <UserCredentialsView hidden />
          <NavBar />
          <div className={cn(styles.profileWrapper, 'background')}>
            <div>
              <ProfileInfo
                userName={userContext.details.username}
                profilePicture={ProfileInfo.profilePicture}
              />
            </div>
            <h2 className="blackText">Mine oppskrifter</h2>
            <div className={cn('recipeContainer', 'background')}>
              {userContext.details && userContext.details.recipes.map((recipe) => (
                <RecipeThumbnail
                  key={recipe._id}
                  title={recipe.title}
                  duration={`${recipe.duration} min`}
                  image={recipe.imagePath}
                  description={recipe.description}
                  rating={recipe.rating}
                  id={recipe._id}
                  userID={recipe.userID}
                />
              ))}
            </div>
          </div>
        </div>
    )
  );
}
