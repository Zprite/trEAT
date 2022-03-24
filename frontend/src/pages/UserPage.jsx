import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cn from 'classnames';
import NavBar from '../components/NavBar';
import RecipeThumbnail from '../components/Thumbnail';
import ProfileInfo from '../components/ProfileInfo';
import styles from '../styles/profile.module.css';
import { UserContext } from '../context/UserContext';
import UserCredentialsView from '../components/UserCredentialsView';
import deleteUser from '../requests/deleteUser';

export default function UserPage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const [userContext] = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:8000/user/username/${username}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userContext.token}`,
          },
          withCredentials: 'include',
        });

        if (response.status === 204) {
          setError('No such user!');
        } else {
          setUserData(response.data.data);
          setError(null);
        }
      } catch (err) {
        setError('An error occured connecting to the database!');
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [username, userContext.token]);

  const handleDeleteUser = (token, id) => {
    deleteUser(token, id);
    setError('User does not exist');
  };

  return (
    <div>
      <NavBar />
      <UserCredentialsView hidden />
      <div className={cn(styles.profileWrapper, 'background')}>

        {loading && <div>Loading recipes...</div>}
        {error ? (
          <div>{error}</div>
        ) : (
          <>
            <div>
              <ProfileInfo
                userName={username}
              />
              {userContext?.details?.admin && (<button type="button" onClick={() => handleDeleteUser(userContext.token, userData._id)}>Delete user</button>)}
            </div>
            <h2 className="blackText">Oppskrifter</h2>
            <div className={cn('recipeContainer', 'background')}>
              {userData && (
                userData.recipes && userData.recipes.map((recipe) => (
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
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
