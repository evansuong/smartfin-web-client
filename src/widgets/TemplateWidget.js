import React from 'react';
import PropTypes from 'prop-types'

export default function TemplateWidget({rideData}) {
   
    // obtain list of the keys of the ride data because 
    const keys = Object.keys(rideData)

    return (
        <div>
            {keys.map((key) => (
                <div>{key}: {rideData[key]}</div>
            ))}
        </div>
    )
}

TemplateWidget.propTypes = {
    rideId: PropTypes.string,
}