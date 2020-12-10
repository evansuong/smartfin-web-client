import React, { useState } from 'react';
import { useHistory, Link, withRouter } from "react-router-dom";
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios'
import '../styles/LoginPanel.css';

const api = 'http://localhost:9000'

export default function RegisterPanel({ history }) {
  const myHistory = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [username, setUsername] = useState();
  const handleSubmit = () => {
    myHistory.push("/reg");
    console.log(email, password, confirm, username);

    const data = {
      "email": email,
      "password": password,
      "passwordCheck": confirm,
      "displayName": username
    }

    loginUser(data).then((res)=>{
      console.log("Success");
      console.log(res);
      history.push("/login")
    })


  };

  const loginUser = async (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          api +
            '/users/register/',
          data
        )
        .then((res) => {
          console.log(res)
          resolve(res.data);
        })
        .catch((error) => {
          console.log(error)
          alert("Invalid")
          reject(error);
        });
    });
  };

  return (
    <div className="login-form" >
      <form autoComplete="off">
        <br />
        <FormControl style={{width:'13%'}}>
          <InputLabel htmlFor="component-simple">Email</InputLabel>
          <Input
            fullWidth
            type="text"
            id="component-simple"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
        <br />
        <br />
        <FormControl style={{width:'13%'}}>
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
        <br/>
        <br/>
        <FormControl style={{width:'13%'}}>
          <InputLabel htmlFor="component-simple">Confirm Password</InputLabel>
          <Input
            type="password"
            id="component-simple"
            value={confirm}
            onChange={(e) => {
              e.preventDefault();
              setConfirm(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
        <br/>
        <br/>
        <FormControl style={{width:'13%'}}>
          <InputLabel htmlFor="component-simple">Username</InputLabel>
          <Input
            fullWidth
            type="text"
            id="component-simple"
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl> 
      </form>
      <Button style={{ marginTop: '20px', marginBottom: '20px' }} onClick={handleSubmit}>
        Register
      </Button>
      {/* <div className="login-panel__padding" style={{ margin: "20px" }}> </div> */}
    </div>
  );
}
