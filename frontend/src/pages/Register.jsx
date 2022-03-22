/* eslint-disable no-console */
import {
  Button, Callout, FormGroup, InputGroup,
} from '@blueprintjs/core';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [userContext, setUserContext] = useContext(UserContext);

  const [fullName, setfullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setError('');

    const genericErrorMessage = 'Something went wrong! Please try again later.';

    axios({
      method: 'post',
      url: 'http://localhost:8000/auth/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: 'include',
      data: JSON.stringify({ fullName, username, password }),
    })
      .then(async (response) => {
        console.log(response);
        setIsSubmitting(false);
        setUserContext((oldValues) => ({ ...oldValues, token: response.data.token }));
        navigate('/');
      })
      .catch((response) => {
        console.log(response);
        if (response.status === 400) {
          setError('Please fill all the fields correctly!');
        } else if (response.status === 401) {
          setError('Invalid email and password combination.');
        } else if (response.status === 500) {
          console.log(response);

          const data = response.json();

          if (data.message) setError(data.message || genericErrorMessage);
        }
      });
  };

  return (
    <form onSubmit={formSubmitHandler} className="authForm">
      <div className="authFormInner">
        <h2>Register</h2>
        <FormGroup label="Full Name" labelFor="fullName">
          <InputGroup
            id="fullName"
            placeholder="Full Name"
            onChange={(e) => setfullName(e.target.value)}
            value={fullName}
          />
        </FormGroup>
        <FormGroup label="Username" labelFor="username">
          <InputGroup
            className="authInput"
            id="username"
            type="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            className="authInput"
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <section className="authEndSection">
          <div className="flexRow">
            Allready have an account:
            <Link to="/">
              <div className="space">
                Sign in
              </div>
            </Link>
          </div>
          {error && <Callout intent="danger">{error}</Callout>}
          <Button
            className="formButton"
            intent="primary"
            disabled={isSubmitting}
            text={`${isSubmitting ? 'Registering' : 'Register'}`}
            fill
            type="submit"
          />
        </section>
      </div>
    </form>
  );
}
