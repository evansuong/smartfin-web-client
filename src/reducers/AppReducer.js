
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
        default: 
            return state
    }
}