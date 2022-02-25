import React, { useContext } from 'react';
import Loader from '../components/Loader';
import { UserContext } from '../context/UserContext';
import Login from './Login';
import RecipeView from './RecipeView';

export default function Home() {
  const [userContext] = useContext(UserContext);
  const shouldLogIn = userContext.token === null;
  const isLoggedIn = !!userContext.token; // !! <= boolean from other value

  return (
    <>
      {shouldLogIn && <Login />}
      {!shouldLogIn && !isLoggedIn && <Loader />}
      {isLoggedIn && <RecipeView />}
    </>
  );
}
