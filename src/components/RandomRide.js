import React from 'react'
import '../styles/RandomRide.css'

function RandomRide(props){


    return(
        //columns of ride number, location, date
        <div className='ride-row'>
            <div className='column'>
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