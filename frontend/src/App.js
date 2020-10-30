import React, { useContext, useEffect } from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { AppContext } from './contexts/AppContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from './res/logo.png';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    textTransform: 'none',
  },
  palette: {
    primary: {
      main: "rgba(255, 255, 255, .4)",
    }
  },
  props: {
    // Name of the component
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application!
    }
  },
})

function App() {

  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    window.matchMedia("(min-width: 768px)").addListener(handler)
    dispatch({
      type: "SET_WINDOW", 
      payload: window.matchMedia('(max-width: 768px)').matches
    })
  }, [])
  
  function handler(e) {
    dispatch({
      type: "SET_WINDOW", 
      payload: window.matchMedia('(max-width: 768px)').matches
    })
  }

  return (
      <Router>
        <MuiThemeProvider theme={muiTheme}>
          <div className="app">
            <Navbar/>
            <div className="app__page">
              <Switch>
                <Route path="/" exact component={StartPage}/>
                <Route path="/main" component={MainPage}/>
                <Route path="/user" component={UserPage}/>
                <Route path="/search" component={SearchPage}/>
              </Switch>
            </div>

            <div className="footer">
              <div></div>
              <Link to="/">
                <img 
                  className="footer__icon" 
                  src={logo} 
                  alt="link to homepage"
                />
              </Link>
              <div className="footer__links">
                <a href="http://e4e.ucsd.edu/smartfin">e4e</a>
                <a href="https://smartfin.org/">smartfin website</a>
                <a href="https://www.surfrider.org/programs/smartfin">surfrider</a>
              </div>
            </div>
          </div>
        </MuiThemeProvider> 
      </Router>
  );
}

export default App;
