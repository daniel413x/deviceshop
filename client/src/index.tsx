import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import Context from './context/context';
import './App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>,
);
