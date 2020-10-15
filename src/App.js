import React from 'react';
import './App.css';
import MainPage from './components/pages/MainPage';
import AppContextProvider from './contexts/AppContext';

function App() {

// TODO: figure out react router to add multiple pages to ui: home, login, dataview, user profile

  return (
    <AppContextProvider>
      <div className="App">
        

        <MainPage>

        </MainPage>
        
      </div>
    </AppContextProvider>
  );
}

export default App;
