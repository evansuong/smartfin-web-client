import React, { useEffect, useState} from 'react';
import RandomRide from './RandomRide';
import '../styles/RandomRide.css';

function RandomRides(props){
    const [rides, setRides] = useState([{rideId: 10, loc1: 12, startTime: 14}, {rideId: 13, loc1: 15, startTime: 17}]);
    
    //get random rides on load
    useEffect(() => {
        get5RandomRides();
    }, []);

    //get 5 random rides
    const get5RandomRides = async () => {
        let pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/random/ride-get/5/?format=json`);
        let item = await pog.json();
        console.log(item);
        // setRides(item);
    };

    return(
        <div className="column">
            <h3>Some Rides</h3>

            {rides.map((ride)=>{
                return(
                    <RandomRide ride={ride}/>
                )
            })}

            <br></br>
        </div>
    );

}

export default RandomRides;