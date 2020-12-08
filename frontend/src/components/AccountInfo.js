import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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


export default function OutlinedCard({ user }) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(true);
  const [action, setAction] = useState("Edit");

  let fname = user.fname;
  let lname = user.lname;
  let email = user.email;

  const toggleEdit = () => {
    if(fname !== user.fname || lname !== user.lname || email !== user.email){
      console.log("Change!");
      //push to backend
    }


    setEditMode(!editMode);
  }

  useEffect (()=> {
    if(editMode){
      setAction("Edit");
    }else{
      setAction("Lock")
    }
  }, [editMode])

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.text}>
          <TextField
              onChange={
                (e) => {
                  fname = e.target.value
                }
              }
              id="standard-read-only-input"
              label="First"
              defaultValue={user.fname}
              InputProps={{
                  readOnly: editMode
              }}
          />
          <TextField
              onChange={
                (e) => {
                  lname = e.target.value
                }
              }
              id="standard-read-only-input"
              label="Last"
              defaultValue={user.lname}
              InputProps={{
                  readOnly: editMode
              }}
          />
          <TextField
              onChange={
                (e) => {
                  email = e.target.value
                }
              }
              id="standard-read-only-input"
              label="Email"
              defaultValue={user.email}
              InputProps={{
                  readOnly: editMode
              }}
          /> 
        </div>
      </CardContent>

      {/* Fix edit later */}
      <CardActions>
        <Button onClick={toggleEdit} size="small">{action}</Button>
      </CardActions>
    </Card>
  );
}