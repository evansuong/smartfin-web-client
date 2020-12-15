import React, { useState, useContext } from 'react'
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import '../../styles/LandingForm.css'
import { UserContext } from '../../contexts/UserContext';
import { UserAPI } from '../../apis/controllers';


export default function SignupPanel({ history }) {

  const [firstname, setFirstname] = useState("evan");
  const [lastname, setLastname] = useState("suong");
  const [email, setEmail] = useState("evan@test.com");
  const [password, setPassword] = useState("password");
  const [passwordConfirm, setPasswordConfirm] = useState("password");
  const [errorMsg, setErrorMsg] = useState('');

  const { userDispatch } = useContext(UserContext)

  const handleSubmit = async () => {
    console.log(email, password, passwordConfirm, firstname, lastname);

    const response = await UserAPI.registerUser(firstname, lastname, email, password, passwordConfirm)

    if(response.status) {
      userDispatch({
        type: 'SET_USER',
        payload: response.data
      });
      history.push("/search");
    } else {
      setErrorMsg(response.data)
    }
  };





  return (
    <div className="landing-form-container__signup-panel">
      <form autoComplete="off" className="signup-panel__input-wrapper">

        <FormControl>
          <InputLabel htmlFor="component-simple">First Name</InputLabel>
          <Input
            type="text"
            id="component-simple"
            value={firstname}
            onClick={() => {
              setErrorMsg('');
            }}
            onChange={(e) => {
              e.preventDefault();
              setFirstname(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="component-simple">Last Name</InputLabel>
          <Input
            type="text"
            id="component-simple"
            value={lastname}
            onClick={() => {
              setErrorMsg('');
            }}
            onChange={(e) => {
              e.preventDefault();
              setLastname(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="component-simple">Email</InputLabel>
          <Input
            type="text"
            id="component-simple"
            value={email}
            onClick={() => {
              setErrorMsg('');
            }}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
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
            onClick={() => {
              setErrorMsg('');
            }}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="component-simple">Confirm Password</InputLabel>
          <Input
            type="password"
            id="component-simple"
            value={passwordConfirm}
            onClick={() => {
              setErrorMsg('');
            }}
            onChange={(e) => {
              e.preventDefault();
              setPasswordConfirm(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
      
      </form>
      <div style={{ color: "red" }}>
        {errorMsg}
      </div>
      <Button onClick={handleSubmit}>
        Sign Up
      </Button>
    </div>
  )
}
