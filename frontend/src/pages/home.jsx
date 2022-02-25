import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Login from './Login';
import RecipeView from './RecipeView';

export default function Home() {
  const [userContext, setUserContext] = useContext(UserContext);
  return (
    !userContext.token ? (
      <Login />
    ) : (
      <RecipeView />
    )
  );
}
