import { display } from '@material-ui/system'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'


import { Link } from 'react-router-dom'
import '../styles/SearchPage.css'
import RandomRides from '../components/RandomRides'

//dictionary to track reducer
const ACTIONS = {
    GET_RIDE: "get-ride",
    SET_RIDE: "set-ride"
}

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    card: {
        minWidth: 275,
        backgroundColor: "transparent"
    }
  }));

export default function Searches({ history }){
    //state for tracking current data
    const [data, setData] = useState({});
    //state for tracking the current ride being requested
    const [req, setReq] = useState('');
    //track type requested
    const [type, setType] = useState('RideID');
    //track date
    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    //track items to render
    // const [itemsToRender, setItemToRender] = useState(<></>)
    //store styles
    const classes = useStyles();

    //update changes of request form
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    //on submit of form, gets the data and sets it, doesn't work directly for some reason
    function handleSubmit(e){
        e.preventDefault();
        setReq(e.target[1].value)
    };
    //update date 1
    const handleDate1 = (e) => {
        console.log(e);
    }
    //update date 2
    const handleDate2 = (e) => {
        console.log(e);
    }

    //update when req updated
    useEffect(() => {
        getRideData();
    }, [req])

    useEffect(()=>{
        if (Object.keys(data).length !== 0){
            history.push({
                pathname: "/main",
                state: data
            })
        }
    }, [data])

    //asynchronously fetch the ride data using the fetch API and 
    let pog;
    let item;
    const getRideData = async () => {
        switch(type){
            case "RideID":
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides/rideId=${req}?format=json`);
                item = await pog.json();   
                setData(item);
                break;
            case "Location":
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides/location=${req}`);
                item = await pog.json();    
                setData(item);
                break;
            case "Date":
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides/startDate=${date1},endDate=${date2}`); //update to get two dates, start and beginning
                item = await pog.json();  
                console.log(item);  
                setData(item);
                break;
            case "Random":
                let count = parseInt(req)
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/random/ride-get/${count}/?format=json`);
                item = await pog.json();
                setData(item);
                break;
            case "All":
                break;
            default:
                console.log("ruh roh")
        }
    }

    let inputFields;
    if(type === "Date"){
        inputFields =  
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="MM/dd/yyyy"
                        value={date1}
                        onChange={handleDate1}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="MM/dd/yyyy"
                        value={date2}
                        onChange={handleDate2}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        
    }else if(type === "Random"){
        inputFields = 
            <>
                <TextField id="filled-basic" label="Random" variant="filled" /> 
                <FormHelperText>Enter number of rides</FormHelperText>
            </>
        

    }else if(type === "Location"){
         inputFields = 
            <>
                <TextField id="filled-basic" label="Location" variant="filled" /> 
                <FormHelperText>Enter requested Location</FormHelperText>
            </>
    }else{
        inputFields =
            <>
                <TextField id="filled-basic" label="RideID" variant="filled" /> 
                <FormHelperText>Enter requested ID</FormHelperText>
            </> 
    }

    //return form with component
    return (
        <div className="search-page">
            {/* two components, ride list and input fields */}
            <h1 id='search-title'>
                <div>Search</div>
            </h1>

            <div className="row">
                <div className="col-1">
                    <RandomRides />
                </div>

                <div className="col-2" id="interface">
                    <Card className={classes.card} variant="outlined">
                        <CardContent>

                            <form onSubmit={handleSubmit} className={classes.root}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-helper-label">RideID</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={type}
                                        onChange={handleTypeChange}
                                    >
                                        <MenuItem value="RideID">RideID</MenuItem>
                                        <MenuItem value="Location">Location</MenuItem>
                                        <MenuItem value="Date">Date</MenuItem>
                                        <MenuItem value="Random">Random</MenuItem>
                                    </Select>
                                    <FormHelperText>Choose Type of Ride to Request</FormHelperText>
                                </FormControl>

                                {inputFields}

                                <Button variant="outlined" type="submit" >Submit</Button>

                            </form>
                        </CardContent>
                    </Card>                   
                </div>
            </div>

        </div>
    )

}
