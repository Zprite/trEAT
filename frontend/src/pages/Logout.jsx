import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';

export default function Logout() {
  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/users/logout',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: 'include',
      Authorization: `Bearer ${userContext.token}`,
    })
      .then((response) => {
      // handle success
        console.log('logout success', response);
        setUserContext((oldValues) => ({ ...oldValues, details: undefined, token: null }));
        window.localStorage.setItem('logout', Date.now());
        navigate('/');
      })
      .catch((response) => {
      // handle error
        console.log('logout fail: ', response);
        navigate('/');
      });
  }, []);
  return (
    <Loader />
  );
}
