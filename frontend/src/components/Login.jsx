/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button, Callout, FormGroup, InputGroup,
} from '@blueprintjs/core';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorState, setErrorState] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorState('');
    const genericErrorMessage = 'Login failed';
    axios({
      method: 'post',
      url: 'http://localhost:8000/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: 'include',
      data: JSON.stringify({ username, password }),
    })
      .then(async (response) => {
        // handle success
        console.log(response);
        setIsSubmitting(false);
        setUserContext((oldValues) => ({ ...oldValues, token: response.data.token }));
      })
      .catch((response) => {
        // handle error
        console.log(response);
        setIsSubmitting(false);
        if (response.status === 400) {
          setErrorState('Please fill all the fields correctly!');
        } else if (response.status === 401) {
          setErrorState('Invalid username and password combination.');
        } else {
          setErrorState(genericErrorMessage);
        }
      });
  };

  return (
    <form onSubmit={formSubmitHandler} className="authForm">
      <div className="authFormInner">
        <h2>Sign in</h2>
        <FormGroup label="Username" labelFor="username">
          <InputGroup
            className="authInput"
            id="Username"
            placeholder="Username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            className="authInput"
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <section className="authEndSection">
          <div className="flexRow">
            Create an account:
            <Link to="/register">
              <div className="space">
                Register
              </div>
            </Link>
          </div>
          {errorState && <Callout intent="danger">{errorState}</Callout>}
          <Button
            className="formButton"
            intent="primary"
            fill
            type="submit"
            disabled={isSubmitting}
            text={`${isSubmitting ? 'Signing In' : 'Sign In'}`}
          />
        </section>
      </div>
    </form>
  );
}
