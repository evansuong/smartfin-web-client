import React, { useState, useEffect } from 'react'



export default function SessionInfo({ rideData }) {

    const { startTime, endTime } = rideData;
    const [renderedData, setRenderedData] = useState({
       
    })

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
        
    }, [rideData])

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