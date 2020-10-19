import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import AppContextProvider from './contexts/AppContext';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';

function App() {

  const styles = {
    footerStyle: {
      footer: {
        backgroundColor: 'black',
        padding: '20px',
        height: '200px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        alignItems: 'center',
      },
      footerIcon: {
        justifySelf: 'center',
        height: '100px',
        marginTop: '-5px',
      },
      footerLinks: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifySelf: 'right',
      },
    }
  }

// TODO: figure out react router to add multiple pages to ui: home, login, dataview, user profile

  return (
    <AppContextProvider>
      <Router>
        <div className="app">
          <Navbar/>
          <div className="app__page">
            <Switch>
              <Route path="/" exact component={StartPage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/main" component={MainPage}/>
              <Route path="/user" component={UserPage}/>
              <Route path="/search" component={SearchPage}/>
            </Switch>
          </div>

          <div className="footer" style={styles.footerStyle.footer}>
            <div></div>
            <Link to="/">
              <img className="footer__icon" style={styles.footerStyle.footerIcon} src={require("./res/logo.png")} />
            </Link>
            <div className="footer__links" style={styles.footerStyle.footerLinks}>
              <a href="http://e4e.ucsd.edu/smartfin">e4e</a>
              <a href="https://smartfin.org/">smartfin website</a>
              <a href="https://www.surfrider.org/programs/smartfin">surfrider</a>
            </div>
          </div>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
