import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import AppDataContext, { AppDataProvider } from './context/AppContext';


ReactDOM.render(
  <React.StrictMode>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

