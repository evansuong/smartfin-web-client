import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import AppContextProvider from './contexts/AppContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from './res/logo.png';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';

const myTheme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    textTransform: 'none',
  }
})

function App() {
 
  return (
    <AppContextProvider>
      <Router>
        <MuiThemeProvider theme={myTheme}>
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
    </AppContextProvider>
  );
}

export default App;
