import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import RecipeThumbnail from '../components/Thumbnail';
import ProfileInfo from '../components/ProfileInfo';
import styles from '../styles/profile.module.css';
import { UserContext } from '../context/UserContext';

export default function UserPage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { username } = useParams();
  const [user] = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:8000/user/username/${username}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: 'include',
        });
        console.log('Response from fetch: ', response);
        setUserData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [username]);

  useEffect(() => {
    console.log('current userData: ', userData);
  }, [userData]);

  console.log(userData);
  return (
    <div>
      <NavBar />
      <div className={styles.profileWrapper}>
        {loading && <div>Loading recipes...</div>}
        {error && (
        <div>{`Error fetching recipes:  ${error}`}</div>
        )}
        <div>
          <ProfileInfo
            userName={username}
            // profilePicture={}
          />
        </div>
        <h2>Oppskrifter</h2>
        <div className={styles.recipeContainer}>
          {userData && (
            userData.recipes && userData.recipes.map((recipe) => (
              <RecipeThumbnail
                key={recipe._id}
                title={recipe.title}
                duration={`${recipe.duration} min`}
                image={recipe.imagePath}
                description={recipe.description}
                rating={recipe.rating}
                link={`/recipe/${recipe._id}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
