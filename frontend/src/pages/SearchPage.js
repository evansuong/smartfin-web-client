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
import RideAPI from '../apis/rideController';
import { getDate, setDate } from 'date-fns';
import { Input } from '@material-ui/core';

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
		marginTop: '0px',
		'& > *': {
		  margin: theme.spacing(1),
			width: '25ch',
			marginTop: '0px',
		},
	  },
	card: {
		minWidth: 275,
		backgroundColor: "transparent",
		marginTop: '0px',
	}
  }));

export default function Searches({ history }){

	// input fields
	const [rideID, setRideID] = useState('');
	const [location, setLocation] = useState('');
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());

	// error message
	const [errorMsg, setErrorMsg] = useState('');

	//track type requested
  const [type, setType] = useState('RideID');
  const [favoriteRides, setFavoriteRides] = useState([]);
  const [searchedRides, setSearchedRides] = useState([]);
  //track date
	const { rideDispatch } = useContext(RideContext);
  const { userState } = useContext(UserContext);
  
	//store styles
	const classes = useStyles();

	// on page load show favorite rides
  useEffect(async () => {
		let favRides = await getFavoriteRides()
		favRides = unixToDateString(favRides)
		console.log('favorite rides inside date processing', favRides)
		setFavoriteRides(favRides)
	}, [])

	//on submit of form, gets the data and sets it, doesn't work directly for some reason
	function handleSubmit(e, queryType){
		e.preventDefault();
		console.log('getting seached rides')
		getSearchedRides(queryType);
	};

	async function handleKeySubmit(e, queryType) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			getSearchedRides(queryType);
		}	
	}

	async function getSearchedRides(queryType) {
		setSearchedRides([])
		setErrorMsg('')
		let searchedRides = await fetchRides(queryType);
		if(searchedRides.length === 0) {
			console.log("Error");
			setErrorMsg("No sessions found");
		} else {
			searchedRides = unixToDateString(searchedRides);
			setSearchedRides(searchedRides);
		}
	}

	async function fetchRides(queryType) {
		if(queryType === 'rideId') {
			let response = await RideAPI.getRideById(rideID);
			if(response.status) {
				return [response.data];
			} else {
				// TODO REPLACE WITH ERROR CODE MESSAGE
				return [];
			}
		} else {
			let locationResponse = [];
			let dateResponse = [];
			console.log("are starttime and end time initialized:", startTime, endTime)
			console.log("is location initialized", location)
			if (startTime !== '' && endTime !== '') {

				// format query
				let startDate = new Date(startTime);
				let endDate = new Date(endTime);
				startDate = parseInt(startDate.getTime() / 1000);
				endDate = parseInt(endDate.getTime() / 1000);

				// call API for sessions within start and end date
				dateResponse = await RideAPI.getRideByTime(startDate, endDate);
				if(dateResponse.status) {
					dateResponse = dateResponse.data;
				} else {
					return [];
				}
				//TEMP CODE CAN GET RID OF WHEN I SEND BACK ERROR CODES
				if(Object.keys(dateResponse)[0] === "Error") return [];
			}
			if (location !== '') {
				// make query
				locationResponse = await RideAPI.getRideByLocation(location);	
				if (locationResponse.status) {
					locationResponse = locationResponse.data;	
				} else {
					return [];
				}
					//TEMP CODE CAN GET RID OF WHEN I SEND BACK ERROR CODES
					if(Object.keys(locationResponse)[0] === "Error") return [];
			}

			// format responses
			if (dateResponse.length === 0) {
				console.log('returning location response')
				return locationResponse;
			} else if (locationResponse.length === 0) {
				console.log('returning date response')
				return dateResponse;
			} else {
				// combine results from both sets
				let dateIds = dateResponse.map(ride => (ride.rideId));
				let intersection = locationResponse.filter(x => dateIds.includes(x.rideId));
				console.log('retiurning intersection');
				return intersection;
			}
		}
	}
  
  function selectRide(rideId, listType) {
		let selectedRide = listType === 'search' ?
		 	searchedRides.filter(ride => ride.rideId === rideId)
		 	:
			 favoriteRides.filter(ride => ride.rideId === rideId);
			 
    console.log('SELECTED RIDE SEARCHPAGE 95', selectedRide) 
    rideDispatch({
      type: 'SET_RIDE',
      payload: { ...selectedRide[0] }
    });
    history.push('main')
  }
	
	function getDateTime(unixTime) {
		let dateStr = new Date(unixTime * 1000).toString();
		console.log('getdatetime unix time', unixTime)
		dateStr = dateStr.substring(4, 15)
		return dateStr
	}

	function unixToDateString(rideList) {
		rideList.map(ride => console.log('ride in ridelist', ride))
		let rides = rideList.map(ride => (Object.assign({}, {
				...ride,
				startTime: getDateTime(ride.startTime), 
				endTime: getDateTime(ride.endTime),
			}))
		)
		console.log('formatting dateTime searchpage 205', rides)
		return rides	
	}
	
	const getFavoriteRides = async () => {
		let favIds = ['15692', '16380']; // create this from a get request
		return Promise.all(favIds.map(item => 
			RideAPI.getRideById(item)
			.then(res => {
				if (res.status) {
					return res.data
				} 
			})))
	}

	function handleDate1(e) {	setStartTime(e) }
	function handleDate2(e) { setEndTime(e) }
	function handleLocationChange(e) { setLocation(e.target.value) }

	let inputFields = 
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label="Start Date"
					format="MM/dd/yyyy"
					value={startTime}
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
					value={endTime}
					onChange={handleDate2}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</Grid>
			<TextField onChange={handleLocationChange} id="filled-basic" label="Location" variant="filled" /> 
			<FormHelperText>Enter requested Location</FormHelperText>
		</MuiPickersUtilsProvider>
	
	//return form with component
	return (
		<div className="search-page">
			{/* two components, ride list and input fields */}
			<h1 id='search-title'>
				<div>Search</div>
			</h1>

			<div className="body">
				<div className="list-container">
					<h2 className="list-container__title">Favorite Rides</h2>
					{favoriteRides && favoriteRides.map(ride => (
					<div 
						key={ride.rideId} 
						className="ride-entry" 
						onClick={() => selectRide(ride.rideId, 'favorite')}
					>
						<div className="ride-entry__ride-name">
							<div>{ride.rideId}</div>
							<div>{ride.startTime}</div>
						</div>
						<div className="ride-entry__ride-location">
							{ride.loc1}
						</div>
					</div>		
					))}
				</div>

				<div className="list-container">
          <div className="scroll-view">
						<h2 className="list-container__title">Search Results</h2>
						{errorMsg !== "" && 
							<div style={{color: 'black'}}>{errorMsg}</div>
						}
						{searchedRides && searchedRides.map(ride => (
							<div 
								key={ride.rideId} 
								className="ride-entry" 
								onClick={() => selectRide(ride.rideId, 'search')}
							>
							<div className="ride-entry__ride-name">
								<div>{ride.rideId}</div>
								<div>{ride.startTime}</div>
							</div>
							<div className="ride-entry__ride-location">
								{ride.loc1}
							</div>
						</div>		
            ))}
          </div>
				</div>

				<div className="list-container">
					<Card className={classes.card}>
						<h2 className="list-container__title">Quick Search</h2>
						<CardContent>
							<form onSubmit={(e) => handleSubmit(e, 'rideId')}>
								<FormControl>
									<div>
										<InputLabel htmlFor="component-simple">RideID</InputLabel>
										<Input
											type="text"
											id="component-simple"
											value={rideID}
											onClick={() => setErrorMsg('')}
											onChange={(e) => {
												e.preventDefault();
												setRideID(e.target.value);
											}}
											onKeyPress={(e) => handleKeySubmit(e, 'rideId')}
										/>
										<Button variant="outlined" type="submit">Search</Button>
									</div>
								</FormControl>
							</form>
						</CardContent>
					</Card>   
													
					<Card className={classes.card}>
						<h2 className="list-container__title">Find your session</h2>
						<CardContent>
							<form onSubmit={(e) => handleSubmit(e, 'filter')} className={classes.root}>
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
