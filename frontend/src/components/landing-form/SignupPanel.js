import React, { useState } from 'react'
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import '../../styles/LandingForm.css'


export default function SignupPanel({ history }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = () => {
    console.log(username, password);

    // make backend call here
    // make login panel responsive to bitch
    

    history.push("/search")
  };


  return (
    <div className="landing-form-container__signup-panel">
      <form autoComplete="off" className="signup-panel__input-wrapper">
        <div className="input-wrapper__username-container">

          <FormControl>
            <InputLabel htmlFor="component-simple">First Name</InputLabel>
            <Input
              type="text"
              id="component-simple"
              value={firstname}
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
              onChange={(e) => {
                e.preventDefault();
                setLastname(e.target.value);
              }}
              onSubmit={handleSubmit}
            />
          </FormControl>
        </div>

        <FormControl>
          <InputLabel htmlFor="component-simple">Email</InputLabel>
          <Input
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

        <FormControl>
          <InputLabel htmlFor="component-simple">Confirm Password</InputLabel>
          <Input
            type="password"
            id="component-simple"
            value={passwordConfirm}
            onChange={(e) => {
              e.preventDefault();
              setPasswordConfirm(e.target.value);
            }}
            onSubmit={handleSubmit}
          />
        </FormControl>
      
      </form>
      <Button onClick={handleSubmit}>
        Sign Up
      </Button>
    </div>
  )
}
