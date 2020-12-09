import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, Input, FormHelperText, useScrollTrigger } from '@material-ui/core';
import '../styles/AccountInfo.css';

const useStyles = makeStyles( (theme) => ({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    text: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      }
  }
  }));



export default function ResetPassword({user}) {
  const classes = useStyles();
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [errors, setErrors] = useState({})

  const validate = () => {
    let temp = {}
    temp.currPass = (currPass===user.password)?"":"Current password is incorrect"
    console.log(temp.currPass)
    //   temp.email = (/$|.+@.+..+/).test(email)
    temp.newPass = newPass.length>=6?"":"Minimum 6 characters"

    setErrors(temp);

    const ret = Object.values(temp).every(x => x === "");
    console.log(ret);
    return ret;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //if no errors push to backend
    if(validate()){
        console.log("push values!")
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.text}>
            <form onSubmit={handleSubmit} autoComplete="off">
                <FormControl >
                    <InputLabel htmlFor="my-input">Current Password</InputLabel>
                    <Input 
                        type="text"
                        id="my-input" 
                        aria-describedby="my-helper-text"
                        value={currPass}
                        error={errors.currPass}
                        onChange={(e)=>{
                            e.preventDefault();
                            setCurrPass(e.target.value);
                        }} />
                    {errors.currPass && 
                        <FormHelperText error id="my-helper-text">Wrong Password</FormHelperText>}
                </FormControl>
                <br/>
                <FormControl >
                    <InputLabel htmlFor="my-input">New Password</InputLabel>
                    <Input 
                        id="my-input"
                        aria-describedby="my-helper-text"
                        value={newPass}
                        error={errors.newPass}
                        onChange={(e)=>{
                            e.preventDefault();
                            setNewPass(e.target.value);
                        }}
                        />
                    {errors.newPass &&
                        <FormHelperText error id="my-helper-text">Minimum 6 Characters</FormHelperText>}
                </FormControl>
                <br/>
                <Button type="submit" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    Submit
                </Button>
            </form>
        </div>
      </CardContent>
    </Card>
  );
}