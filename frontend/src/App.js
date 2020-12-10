import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/AppContext';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from './res/logo.png';
import './styles/App.css';

import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';

//testing
import AccountSettings from './pages/AccountSettings';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


// override default MaterialUI themes for MaterialUI components
const muiTheme = createMuiTheme({
  // change fonts
  typography: {
    fontFamily: "Montserrat, sans-serif",
    textTransform: 'none',
  },
  // change colors
  palette: {
    primary: {
      main: "rgba(255, 255, 255, .4)",
    }
  },
  // change props
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
    const checkLoggedIn = async () => {
      //get JWT token from local storage
      let token = localStorage.getItem("auth-token");
      //handles the case when the key 'auth token' does not exist
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      //make post requeest to check if token in local storage is correct
    
  // on webpage startup, check if window is desktop or mobile dimensions for responsiveness
  useEffect(() => {
    window.matchMedia("(min-width: 768px)").addListener(handler)

    // set global state
    dispatch({
      type: "SET_WINDOW",
      payload: window.matchMedia('(max-width: 768px)').matches
    })
  }, [])

  // check window size every time the window changes size
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
            <Navbar />
            <div className="app__page">

              {/* page routes */}
              <Switch>
                {/* test route */}
                <Route path="/test" exact component={AccountSettings}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/reg" component={RegisterPage}/>

                <Route path="/" exact component={StartPage} />
                <Route path="/main" component={MainPage} />
                <Route path="/user" component={UserPage} />
                <Route path="/search" component={SearchPage} />
              </Switch>
            </div>
            {/* footer with links to project related websites */}
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
