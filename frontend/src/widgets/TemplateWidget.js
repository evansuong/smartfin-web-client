import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import { RideContext } from '../contexts/RideContext';

export default function TemplateWidget() {
   
    const { rideState } = useContext(RideContext)
    // console.log("TEMPLATEWIDGET 8")
    // obtain list of the keys of the ride data because 
    const keys = Object.keys(rideState)

    return (
        <div>
            {keys.map((key) => (
                <div key={key}>{key}: {rideState[key]}</div>
            ))}
        </div>
    )
}

TemplateWidget.propTypes = {
    rideId: PropTypes.string,
}