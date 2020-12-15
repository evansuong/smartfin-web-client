import React, { createContext, useReducer } from "react"
import { RideReducer } from "../reducers/Reducers";


export const RideContext = createContext()

const RideState = {}


// provider sends the appContext to all the components inside of its tags
const RideContextProvider = (props) => {

    const [rideState, dispatch] = useReducer(RideReducer, RideState);
    const rideDispatch = dispatch;

    return (
        <RideContext.Provider value={{ rideState, rideDispatch }}>
            {props.children}
        </RideContext.Provider>
    )
}

export default RideContextProvider

// todo: finish implenmebting ride context so its not isolated to a page