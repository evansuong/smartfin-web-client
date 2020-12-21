import React, { useContext } from 'react'
import { RideContext } from '../contexts/RideContext'

export default function TemperatureChart() {
    const { rideState } = useContext(RideContext);
    const { tempSmartfin } = rideState;

    return (
        <div>
            { tempSmartfin }
        </div>
    )
}
