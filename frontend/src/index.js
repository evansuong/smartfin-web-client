import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppContextProvider from './contexts/AppContext';
import UserContextProvider from './contexts/UserContext';

// AppContextProvider gives all components inside of it access to the AppContext
ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

 