import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import '../../styles/LoginPanel.css';
import { UserAPI } from '../../apis/controllers';
import { UserContext } from '../../contexts/UserContext';

export default function LoginPanel({ history }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { userDispatch } = useContext(UserContext);

  const handleSubmit = async () => {
    console.log(username, password);

    // make backend call here
    const response = await UserAPI.loginUser(username, password)

    if(response.status) {
      userDispatch({
        type: 'SET_USER',
        payload: response.data
      });
      history.push("/search");
    } else {
      setErrorMsg(response.data);
    }
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
            onClick={() => setErrorMsg('')}
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
            onClick={() => setErrorMsg('')}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
      </form>
      <div style={{ color: "red" }}>
        {errorMsg}
      </div>

      <Button style={{ marginTop: '20px' }} onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
}
