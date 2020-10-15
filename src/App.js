import React from 'react';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import StartPage from './components/pages/StartPage';
import AppContextProvider from './contexts/AppContext';

function App() {

// TODO: figure out react router to add multiple pages to ui: home, login, dataview, user profile

  return (
    <AppContextProvider>
      <div className="App">

        <StartPage>
          
        </StartPage>
        <MainPage>

        </MainPage>
        <LoginPage>

        </LoginPage>
        
      </div>
    </AppContextProvider>
  );
}

export default App;
