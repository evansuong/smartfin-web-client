

// app reducer modifies global app state (theme and desktop/mobile view)
export function AppReducer(state, action) {

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
			return state;
	}
}


// app reducer modifies global app state (theme and desktop/mobile view)
export function RideReducer(state, action) {
  switch (action.type) {
		case "SET_RIDE":
			console.log('RIDEREDUCER SETTING RIDE TO', action.payload)
			return action.payload;
		default: 
			return state;
  }
}



// app reducer modifies global app state (theme and desktop/mobile view)
export function UserReducer(state, action) {
	switch (action.type) {
		case "SET_USER":
			return action.payload;
		case "ADD_FAVORITE_RIDE":
			return Object.assign({}, {...state, 
				favoriteRides: [...state.favoriteRides, action.payload],
			}); 
		default: 
			return state;
  }
}

