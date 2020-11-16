

// app reducer modifies global app state (theme and desktop/mobile view)
export const AppReducer = (state, action) => {

    switch (action.type) {
        case "SET_WINDOW":
            return Object.assign({}, state, {
                isDesktopView: action.payload
            });
        case "SET_LIGHT_THEME":
            return Object.assign({}, state, {
                isLightTheme: true
            });
        case "SET_DARK_THEME":
            return Object.assign({}, state, {
                isLightTheme: false
            });
        case "SET_RIDE_DATA":
            return Object.assign({}, state, {
                rideData: action.payload
            });
        default: 
            return state;
    }
}