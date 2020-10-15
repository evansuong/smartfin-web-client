
export const AppReducer = (state, action) => {

    switch (action.payload) {
        case "SET_RIDE": 
            return action.payload
        default: 
            return state
    }
}