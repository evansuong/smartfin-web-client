import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, Input, FormHelperText, useScrollTrigger } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
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

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.text}>
            <h3>Your Rides</h3>
            <Grid container justify="center" spacing={2}>
                {user.rides.map((ride)=>{
                    return(
                        <Grid item xs = {4}> 
                            <div>{ride}</div>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
      </CardContent>
    </Card>
  );
}