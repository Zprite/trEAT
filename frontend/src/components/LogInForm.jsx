/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

export default function LogInForm({ Login, error }) {
  const [details, setDetails] = useState({ userName: '', password: '' });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(Login);
    console.log(error);

    Login(details);
  };

  return (
    <form
      style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh',
      }}
      onSubmit={submitHandler}
    >
      <div className="logIn">
        <header className="logInHeader">
          <h1>Login</h1>
          {(error !== '') ? (
            <div className="error">
              {' '}
              {error}
            </div>
          ) : ''}
        </header>
        <div className="logInName">
          <label htmlFor="username">
            Username:
          </label>
          <input type="text" name="username" id="username" onChange={(e) => setDetails({ ...details, userName: e.target.value })} value={details.userName} />
        </div>
        <div className="logInPassword">
          <label htmlFor="password">
            Password:
          </label>
          <input type="password" name="password" id="password" onChange={(e) => setDetails({ ...details, password: e.target.value })} value={details.password} />
        </div>
        <input type="submit" value="LOGIN" />
        <input type="button" value="Register" />
      </div>
    </form>
  );
}
