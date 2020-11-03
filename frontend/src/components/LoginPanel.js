import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import '../styles/LoginPanel.css';

export default function LoginPanel({ history }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = () => {
    console.log(username, password);
    history.push("/main")
  };
  return (
    <div>
      <form autoComplete="off">
        <br />
        <FormControl>
          <InputLabel htmlFor="component-simple">Username</InputLabel>
          <Input
            type="text"
            id="component-simple"
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUserName(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
        <br />
        <br />
        <FormControl>
          <InputLabel htmlFor="component-simple">Password</InputLabel>
          <Input
            type="password"
            id="component-simple"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
      </form>
      <Button style={{ marginTop: '10px' }} onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
}
