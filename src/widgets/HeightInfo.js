import React from 'react'

export default function HeightInfo({rideData}) {
    const {heightSmartfin, heightCDIP} = rideData;
    return (
        <div>
            smartfin height: {heightSmartfin}
            <br/>
            CDIP height: {heightCDIP}
        </div>
    )
}
