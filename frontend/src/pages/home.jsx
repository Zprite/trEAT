import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Login from './Login';
import RecipeView from './RecipeView';

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const [userContext, setUserContext] = useContext(UserContext);
  return (
    !userContext.token ? (
      <Login />
    ) : (
      <RecipeView />
    )
  );
}
