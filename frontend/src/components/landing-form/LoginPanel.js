import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import '../../styles/LoginPanel.css';

export default function LoginPanel({ history }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    console.log(username, password);

    // make backend call here
    

    history.push("/search")
  };

  return (
    <div className="landing-form-container__login-panel">
      <form autoComplete="off">

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
      <Button style={{ marginTop: '20px' }} onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
}
