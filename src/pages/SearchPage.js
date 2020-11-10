import { display } from '@material-ui/system'
import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import '../styles/SearchPage.css'
import RandomRides from '../components/RandomRides'

//dictionary to track reducer
const ACTIONS = {
    GET_RIDE: "get-ride",
    SET_RIDE: "set-ride"
}

export default function Searches({ history }){
    //state for tracking current data
    const [data, setData] = useState({});
    //state for tracking the current ride being requested
    const [req, setReq] = useState('');
    //track type requested
    const [type, setType] = useState('RideID');
    //track date
    const [date, setDate] = useState({});

    //on submit of form, gets the data and sets it, doesn't work directly for some reason
    function handleSubmit(e){
        e.preventDefault();
        getRideData(req);
        console.log(type);
        setReq('');
        //setType('');
    };

    //asynchronously fetch the ride data using the fetch API and 
    let pog;
    let item;
    const getRideData = async (reqs) => {
        switch(type){
            case "RideID":
                console.log("RideID: " + reqs)
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/ride-get/${reqs}/?format=json`);
                item = await pog.json();   
                setData(item);
                break;
            case "Location":
                console.log("Location: " + reqs)
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/location/ride-get/${reqs}/?format=json`);
                item = await pog.json();    
                setData(item);
                break;
            case "Date":
                pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/ride-get/${reqs}/?format=json`); //update to get two dates, start and beginning
                item = await pog.json();    
                setData(item);
                break;
            case "Random":
                let count = parseInt(reqs)
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
               <input type="date" name="start" value={req} onChange={e => setReq(e.target.value)}/>
               <label htmlFor="end">end date</label>
               <input type="date" name="end" value={req} onChange={e => setReq(e.target.value)}/> 
            </>
    }if(type === "Random"){
        inputFields =
        <>
            <label htmlFor="request">Count</label>
            <input type="number" name="request" value={req} onChange={e => setReq(e.target.value)}/>
        </> 
    }else{
        inputFields =
            <>
                <label htmlFor="request">Request</label>
                <input type="text" name="request" value={req} onChange={e => setReq(e.target.value)}/>
            </> 
    }

    //create render component if data exists, otherwise load...
    let itemsToRender;

   
    console.log(data)
    if(type === 'RideID'){
        if (data.rideId !== undefined){
            itemsToRender = 
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
            <h1>
                search pages
            </h1>
            <Link to="/main">
                back
            </Link>

            <br/>
            <br/>
        
            <RandomRides />

            <form onSubmit={handleSubmit} >
                <label htmlFor="requestType">Request Type</label>
                <select name="requestType" id="" value={type} onSubmit={e => setType(e.target.value)} onChange={e => setType(e.target.value)}>
                    <option value="RideID">RideID</option>
                    <option value="Location">Location</option>
                    <option value="Date">Date</option>
                    <option value="Random">Random</option>
                </select>
                
                {inputFields}

            </form>

            <br/>
            <br/>

            <div>{itemsToRender}</div>

        </div>
    )

}