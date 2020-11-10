import { AppReducer } from "../reducers/AppReducer";
import React from 'react'

const { createContext, useReducer } = require("react");

// CONTEXT HOLDS THE GLOBAL APP STATE, ALL THE DATA HERE CAN BE SEEN BY THE WHOLE APP
export const AppContext = createContext()

// hold themes and current window size
const AppState = {
    lightStyle: {

    },
    darkStyle: {
        
    },
    isLightTheme: true, // determines if the theme is currently light
    isDesktopView: false,   // 
}

// provider sends the appContext to all the components inside of its tags
const AppContextProvider = (props) => {

    const [appState, dispatch] = useReducer(AppReducer, AppState);

    return (
        <AppContext.Provider value={{ appState, dispatch }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider