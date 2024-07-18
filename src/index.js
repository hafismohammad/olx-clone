// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import { auth } from './firebase/config';
import Context from './store/FirebaseContext';
import { SearchProvider } from './store/SearchContext';

ReactDOM.render(
  <FirebaseContext.Provider value={{ auth }}>
    <Context>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
