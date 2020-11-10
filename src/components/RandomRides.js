import React, {useEffect, useState} from 'react'
import RandomRide from './RandomRide'

function RandomRides(props){
    const [rides, setRides] = useState([]);
    // const rides = [];
    
    //get random rides on load
    // useEffect(() => {
    //     get5RandomRides();
    // }, []);

    //get 5 random rides
    const get5RandomRides = async () => {
        let pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/random/ride-get/5/?format=json`);
        let item = await pog.json();
        // setRides(item);
    };

    return(
        <>
            {rides.map((ride)=>{
                return(
                    <RandomRide ride={ride}/>
                )
            })}
        </>
    );

}

export default RandomRides();