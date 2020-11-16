import React, { useState, useEffect } from 'react'

export default function SessionInfo({ rideData }) {

    const { startTime, endTime } = rideData;
    const [renderedData, setRenderedData] = useState({
       
    })

    // TODO: FETCH ALL RIDES IN LOCATION FROM API

    useEffect(() => {
        let duration = (endTime - startTime) / 60;
        duration = duration.toString() + "min"
        let date = startTime ? new Date(startTime * 1000) : 0;
        console.log(date);
        date = date.toString();
        // Hours part from the timestamp
        setRenderedData({
            duration: duration,
            date: date,
        })
        
    }, [rideData])

    return (
        <div>
            {Object.keys(renderedData).map((key) => (
                <div>{key}: {renderedData[key]}</div>
            ))}
        </div>
    );
}
