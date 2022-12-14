import React, { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext, UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Create from './pages/Create';
import RecipePage from './pages/recipe/RecipePage';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import UserPage from './pages/UserPage';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [userContext, setUserContext] = useContext(UserContext);

  console.log('usercontext: ', userContext);

  const verifyUser = useCallback(() => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/auth/refreshToken',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: 'include',
    })
      .then((response) => {
      // handle success
        console.log('Fetch refreshtoken success', response);
        setUserContext((oldValues) => ({
          ...oldValues,
          token: response.data.token,
        }));
      })
      .catch((response) => {
      // handle error
        console.log('Fetch refresh token fail:', response);
        // remove token and log out user.
        setUserContext((oldValues) => ({ ...oldValues, token: null }));
      });
    // call refreshToken every 5 minutes to renew the authentication token.
    setTimeout(verifyUser, 5 * 60 * 1000);
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // Sync logout across tabs
  const syncLogout = useCallback((event) => {
    if (event.key === 'logout') {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', syncLogout);
    return () => {
      window.removeEventListener('storage', syncLogout);
    };
  }, [syncLogout]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="recipePage" element={<RecipePage />} />
        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="recipe/:id/edit" element={<Create editMode />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:username" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function AppWrapper() {
  return <UserProvider><App /></UserProvider>;
}

export default AppWrapper;
