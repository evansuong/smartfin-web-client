import { createContext } from "react"


export const RideContext = createContext()

const RideState = {
    currentRide: {}
}

// todo: finish implenmebting ride context so its not isolated to a page