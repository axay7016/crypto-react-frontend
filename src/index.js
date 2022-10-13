import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { createRoot } from 'react-dom/client';

import "./i18n"
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>

  </React.StrictMode>);
reportWebVitals();