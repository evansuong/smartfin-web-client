import React from 'react'

export default function LocationInfo({rideData}) {
    const {loc1, loc2, loc3, latitude, longitude} = rideData;
    return (
        <div>
            city: {loc1, loc2, loc3}
            <br/>
            latitude: {latitude}
            <br/>
            longitudeL {longitude}
        </div>
    )
}
