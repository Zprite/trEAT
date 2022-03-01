/* eslint-disable no-console */
import React, { useState } from 'react';
import LogInForm from '../components/LogInForm';

export default function logInPage() {
  const adminUser = {
    userName: 'admin',
    password: 'admin123',
  };
  const [user, setUser] = useState({ userName: '', password: '' });
  const [error, setError] = useState('');

  const Login = (details) => {
    console.log(details);

    if (details.userName === adminUser.userName && details.password === adminUser.password) {
      console.log('Logged in');
      setUser({
        userName: details.userName,
        password: details.password,
      });
    } else {
      console.log('Details do not match');
      setError('Details do not match!');
    }
  };

  const Logout = () => {
    setUser({ userName: '', password: '' });
  };

  return (
    <div className="loginPage">
      {(user.userName !== '') ? (
        <div className="welcome">
          <h2>
            {' '}
            Welcome ,
            {' '}
            <div>{user.name}</div>
          </h2>
          <button type="button" onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LogInForm Login={Login} error={error} Logout={Logout} test="hei  " />
      )}
    </div>
  );
}
