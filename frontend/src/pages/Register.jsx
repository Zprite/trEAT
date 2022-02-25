import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="authForm">
      <div className="authFormInner">
        <h2>Register</h2>
        <FormGroup label="First Name" labelFor="fullName">
          <InputGroup
            id="fullName"
            placeholder="First Name"
            onChange={(e) => setfullName(e.target.value)}
            value={fullName}
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            className="authInput"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            <Link to="/login">
              <div className="space">
                Sign in
              </div>
            </Link>
          </div>
          <Button className="formButton" intent="primary" text="Register" fill type="submit" />
        </section>
      </div>
    </form>
  );
}
