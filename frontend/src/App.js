import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/AppContext';
import Axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from './res/logo.png';
import './styles/App.css';

import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';

// test
import Map from './components/AllMaps'
import RideContextProvider from './contexts/RideContext';
import UserContextProvider, { UserContext } from './contexts/UserContext';

import e4eIcon from "./res/e4e-icon.png"
import smartfinIcon from "./res/smartfin-icon.jpg"
import surfriderIcon from "./res/surfrider-icon.png"


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
})

function App() {

  const { appDispatch } = useContext(AppContext)
  const { userState, userDispatch } = useContext(UserContext);
  console.log("ISERSTATE APP 43")
  const { favoriteRides } = userState;

  /** 
    useEffect(() => {
      const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await Axios.post("http://localhost:9000/users/tokenIsValid", null, {
          headers: {
            "auth-token": token
          }
        });
        if (tokenRes.data) {
  
        }
      }
  
      checkLoggedIn();
    }, []);
    **/

  async function setUserRides() {
    
  }

 
  // on webpage startup, check if window is desktop or mobile dimensions for responsiveness
  useEffect(() => {
    window.matchMedia("(min-width: 768px)").addListener(handler)
    // set global state
    appDispatch({
      type: "SET_WINDOW",
      payload: window.matchMedia('(max-width: 768px)').matches
    });

   
  }, [])

  // check window size every time the window changes size
  function handler(e) {
    appDispatch({
      type: "SET_WINDOW",
      payload: window.matchMedia('(max-width: 768px)').matches
    })
  }

  return (
    <Router>
      <UserContextProvider>
        <RideContextProvider>
          <MuiThemeProvider theme={muiTheme}>
            <div className="app">
              <Navbar />
              <div className="app__page">
                {/* page routes */}
                <Switch>
                  <Route path="/" exact component={StartPage} />
                  <Route path="/main" component={MainPage} />
                  <Route path="/user" component={UserPage} />
                  <Route path="/search" component={SearchPage} />
                  {/* test */}
                  <Route path="/test" component={Map} />
                </Switch>
              </div>
              {/* footer with links to project related websites */}
              <div className="footer-container">
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
                    <a className="link-wrapper" href="http://e4e.ucsd.edu/smartfin">
                      e4e
                      <img 
                        src={e4eIcon}
                        className="footer-link-icon"
                        alt="Link to Engineers for Exploration website"
                      /> 
                    </a>
                    <a className="link-wrapper" href="https://smartfin.org/">
                      smartfin website
                      <img 
                        src={smartfinIcon}
                        className="footer-link-icon"
                        alt="Link to Smartfin Official website"
                      />
                    </a>
                    <a className="link-wrapper" href="https://www.surfrider.org/programs/smartfin">
                      surfrider
                      <img 
                        src={surfriderIcon} 
                        className="footer-link-icon"
                        alt="Link to Surfrider feature on Smartfin"/>
                    </a>
                  </div>
                </div>
              </div>          
            </div>
          </MuiThemeProvider>
        </RideContextProvider>
      </UserContextProvider>       
    </Router>
  );
}

export default App;
