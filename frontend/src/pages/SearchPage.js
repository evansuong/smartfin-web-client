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
  }));

export default function Searches({ history }){
    //state for tracking current data
    const [data, setData] = useState({});
    //state for tracking the current ride being requested
    const [req, setReq] = useState('');
    //track type requested
    const [type, setType] = useState('RideID');
    //track date
    const [date, setDate] = useState({});

    const classes = useStyles();

    //update changes of request form
    const handleChange = (event) => {
        setType(event.target.value);
    };

    //on submit of form, gets the data and sets it, doesn't work directly for some reason
    function handleSubmit(e){
        e.preventDefault();
        setReq(e.target[1].value)
    };

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
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/ride-get/${req}/?format=json`); //update to get two dates, start and beginning
                item = await pog.json();    
                setData(item);
                break;
            case "Random":
                let count = parseInt(req)
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/random/ride-get/${count}/?format=json`);
                item = await pog.json();
                setData(item);
                break;
            default:
                console.log("ruh roh")
        }
    }

    let inputFields;
    if(type === "Date"){
        inputFields = 
            <>
               <label htmlFor="start">start date</label>
               <input type="date" name="start" />
               <label htmlFor="end">end date</label>
               <input type="date" name="end"  /> 
            </>
    }if(type === "Random"){
        inputFields = 
            <>
                <TextField id="filled-basic" label="Random" variant="filled" /> 
                <FormHelperText>Enter number of rides</FormHelperText>
            </>

    }if(type === "Location"){
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

    //create render component if data exists, otherwise load...
    let itemsToRender;

    if(type === 'RideID'){
        if (data.rideId !== undefined){
            itemsToRender = 
                <div className="requested-ride">
                    <h3>Ride ID: {data.rideId}</h3>
                    <h3>Location: {data.loc1}</h3>
                    <button onClick={() => history.push({
                        pathname: "/main",
                        state: data,
                    })}>
                        View Ride
                    </button>
                </div>
        }
    } else {
        if (data.length > 0) {
            console.log(data.length)
            itemsToRender = <>
            {data.map(data => (
                <>
                    <h1>{data.rideId}</h1>
                    <h2>{data.loc1}</h2>
                    <h2>{data.loc2}</h2>
                    <h2>Latitude: {data.latitude}</h2>
                    <h2>Longitude: {data.longitude}</h2>
                    <button onClick={() => history.push({
                        pathname: "/main",
                        state: data,
                    })}>
                        view ride
                    </button>
                </>
            ))}
        </>
        }
    }
        

    //return form with component
    return (
        <div className="search-page">
            {/* two components, ride list and input fields */}
            <h1 id='search-title'>
                <div>Search</div>
            </h1>

            <div className="row">
                <div className="col">
                    <RandomRides />
                </div>

                <div className="col" id="interface">
                    <form onSubmit={handleSubmit} className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">RideID</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={type}
                                onChange={handleChange}
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
                    
                    <div>{itemsToRender}</div>


                    
                    
                </div>
            </div>

        </div>
    )

}
