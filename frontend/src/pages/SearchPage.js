import { display } from '@material-ui/system'
import React, { useState, useEffect, useContext } from 'react'
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
import { RideContext } from '../contexts/RideContext';
import { UserContext } from '../contexts/UserContext';

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
	//state for tracking the current ride being requested
	const [req, setReq] = useState('');
	//track type requested
  const [type, setType] = useState('RideID');
  const [favoriteRides, setFavoriteRides] = useState([]);
  const [searchedRides, setSearchedRides] = useState([]);
  //track date
	const [date1, setDate1] = useState(new Date());
	const [date2, setDate2] = useState(new Date());
	const { rideDispatch } = useContext(RideContext);
  const { userState } = useContext(UserContext);
  
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
  
  function selectRide(rideId) {
    let selectedRide = searchedRides.filter(ride => ride.rideId === rideId);
    console.log('SELECTED RIDE SEARCHPAGE 95', selectedRide) 
    rideDispatch({
      type: 'SET_RIDE',
      payload: { ...selectedRide[0] }
    });
    history.push('main')
  }

	//update when req updated
	useEffect(() => {
		console.log("SEARCHPAGE94 GETTING RIDE DATA")
    getRideData();
  }, [req])

  useEffect(() => {
    getFavoriteRides();
  }, [])

  console.log("favorite rides 116", favoriteRides.length)
  console.log("searched rides 117", searchedRides)
  
  async function getFavoriteRides() {
    
    // let favIds = axios.get()
    let favIds = ['15692', '16380']; // create this from a get request
    let favRides = []
    for await (const item of favIds) {
      fetch(`http://ec2-54-203-7-235.us-west-2.compute.amazonaws.com/ride/rides/rideId=${item}`)
      .then(response => response.json())
      .then(data => {
				favRides.push(data)
				console.log(data)
				setFavoriteRides(favRides)
			});
    }
  }

	//asynchronously fetch the ride data using the fetch API and 
	let pog;
	let item;
	const getRideData = async () => {
		console.log("SEARCHPAGE115 switch")
		switch(type){
			case "RideID":
				pog = await fetch(`'http://ec2-54-203-7-235.us-west-2.compute.amazonaws.com/ride/rides/rideId=${req}?format=json`);
				item = await pog.json();   
				setSearchedRides(item);
				break;
			case "Location":
				pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides/location=${req}`);
				item = await pog.json();    
				setSearchedRides(item);
				break;
			case "Date":
				pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides/startDate=${date1},endDate=${date2}`); //update to get two dates, start and beginning
				item = await pog.json();  
				console.log(item);  
				setSearchedRides(item);
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
	
	console.log('length of favorite rides searchpage 205', favoriteRides)


	//return form with component
	return (
		<div className="search-page">
			{/* two components, ride list and input fields */}
			<h1 id='search-title'>
				<div>Search</div>
			</h1>

			<div className="body">

{/* for some reason this is only rendering one entry and i dont know why */}
        <div className="list-container">
					{favoriteRides.length > 0 && favoriteRides.map(ride => {
						console.log(ride)
						return <div key={ride.rideId} className="ride-entry" onClick={() => selectRide(ride.rideId)}>
						<div className="ride-entry__ride-name">
							<div>{ride.rideId}</div>
							<div>{ride.loc3}</div>
						</div>
						<div>
							{ride.startTime}
						</div>
					</div>
				}
					)}
					
        </div>

				<div className="list-container">
          <div className="scroll-view">
            {searchedRides && searchedRides.map(ride => (
              <div key={ride.rideId} onClick={() => selectRide(ride.rideId)}>{ride.rideId + ' ' + ride.startTime + ' ' + ride.loc3}</div>
            ))}
          </div>
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
