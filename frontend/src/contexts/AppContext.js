import React, { createContext, useReducer } from 'react'
import { AppReducer } from "../reducers/Reducers";


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
    const appDispatch = dispatch;

    return (
        <AppContext.Provider value={{ appState, appDispatch }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider