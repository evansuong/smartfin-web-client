import React from 'react'

export default function TempInfo({rideData}) {
    const { tempSmartfin, tempCDIP } = rideData;
    return (
        <div>
            session temp (smartfin): {tempSmartfin}
            <br/>
            session temp (CDIP): {tempCDIP}
        </div>
    )
}
