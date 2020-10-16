import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AppContextProvider from './contexts/AppContext';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';

function App() {

// TODO: figure out react router to add multiple pages to ui: home, login, dataview, user profile

  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Navbar/>
 
          <Switch>
            <Route path="/" exact component={StartPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/main" component={MainPage}/>
            <Route path="/user" component={UserPage}/>
            <Route path="/search" component={SearchPage}/>
          </Switch>

        </div>
      </Router>
      <div className="footer">

      </div>
    </AppContextProvider>
  );
}

export default App;
