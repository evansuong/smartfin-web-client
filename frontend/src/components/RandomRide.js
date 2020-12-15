import React from 'react'
import '../styles/RandomRide.css'
import { useHistory } from 'react-router'

function RandomRide(props){
    const history = useHistory();


    return(
        //columns of ride number, location, date
        <div className='ride-row'>
            <div className='column' onClick={() => {
                // history.push({
                //     pathname: "/main",
                //     state: props.ride
                // })
            }} >
               RideID: {props.ride.rideId}
            </div>
            <div className='column'>
               Location: {props.ride.loc1}
            </div>
            <div className='column'>
               Start Time: {props.ride.startTime}
            </div>
        </div>
    )
}



export default RandomRide;
