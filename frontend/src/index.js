import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppContextProvider from './contexts/AppContext';

// AppContextProvider gives all components inside of it access to the AppContext
ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
        {/* video section */}
        <div className="start-page__info-panel">
              <div className="info-panel__description">
                  <p>{projectMessage}</p>
              </div>
              <div className="info-panel__video">
                  <iframe className="video"
                      title="REU Video"
                      src="https://www.youtube.com/embed/rY145HV-ReM" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" 
                  />
              </div>
          </div>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

 