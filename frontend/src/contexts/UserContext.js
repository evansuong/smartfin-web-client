
import React, { createContext, useReducer } from "react"
import { UserReducer } from "../reducers/Reducers";


// CONTEXT HOLDS THE GLOBAL APP STATE, ALL THE DATA HERE CAN BE SEEN BY THE WHOLE APP
export const UserContext = createContext()

// hold themes and current window size
const UserState = {}

// provider sends the appContext to all the components inside of its tags
const UserContextProvider = (props) => {

  const [userState, dispatch] = useReducer(UserReducer, UserState);
  const userDispatch = dispatch;

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider