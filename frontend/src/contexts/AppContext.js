import { AppReducer } from "../reducers/AppReducer";
import React from 'react'

const { createContext, useReducer } = require("react");

export const AppContext = createContext()

const AppState = {
    lightStyle: {

    },
    darkStyle: {
        
    },
    isLightTheme: true,
}

const AppContextProvider = (props) => {

    const [appState, dispatch] = useReducer(AppReducer, AppState);

    return (
        <AppContext.Provider value={{ appState, dispatch }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider