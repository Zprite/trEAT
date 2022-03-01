import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Loader from './Loader';
import Login from './Login';

export default function AuthWrapper({ children }) {
  const [userContext] = useContext(UserContext);
  const shouldLogIn = userContext.token === null;
  const isLoggedIn = !!userContext.token; // !! <= boolean from other value

  return (
    <>
      {shouldLogIn && <Login />}
      {!shouldLogIn && !isLoggedIn && <Loader />}
      {isLoggedIn && children}
    </>
  );
}
