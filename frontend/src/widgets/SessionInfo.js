import React, { useState, useEffect, useContext } from 'react'
import { RideContext } from '../contexts/RideContext';



export default function SessionInfo() {

    const [renderedData, setRenderedData] = useState({  
    })

    const { rideState } = useContext(RideContext);
    const { startTime, endTime } = rideState;
    console.log("RIDESTATE IN SESSIONINFO", rideState.rideState)

    // TODO: FETCH ALL RIDES IN LOCATION FROM API

    useEffect(() => {
        let duration = (endTime - startTime) / 60;
        duration = duration.toString() + "min"

        let date = startTime ? parseDate(new Date(startTime * 1000)) : 0;

        // Hours part from the timestamp
        setRenderedData({
            duration: duration,
            date: date,
        })
        
    }, [rideState])

    return (
        <div>
            {Object.keys(renderedData).map((key) => (
                <div>{renderedData[key]}</div>
            ))}
        </div>
    );
}

function parseDate(date) {
    let weekday = days[date.getDay()]
    let month = months[date.getMonth()]
    let year = date.getFullYear()
    let day = date.getDate()
    let daySuffix = 'th'
    if (day === 1) {
        daySuffix = 'st';
    } else if (day === 2) {
        daySuffix = 'nd';
    } else if (day === 3) {
        daySuffix = 'rd';
    }
    return weekday + '\n ' + month + ' ' + day + daySuffix + ', ' + year
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];