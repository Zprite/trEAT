/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="authForm">
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
          <Button className="formButton" intent="primary" fill type="submit" text="Sign In" />
        </section>
      </div>
    </form>
  );
}
