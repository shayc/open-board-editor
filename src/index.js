import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
import AppProviders from './AppProviders';
import App from './App';
import './index.css';

// Accessibility testing library. Results will show in the Chrome DevTools console.
// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('@axe-core/react');
//   axe(React, ReactDOM, 1000);
// }

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({ onUpdate: () => {}, onSuccess: () => {} });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// function sendToAnalytics(metric) {
//   const body = JSON.stringify(metric);
//   const url = 'https://example.com/analytics';

//   // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
//   if (navigator.sendBeacon) {
//     navigator.sendBeacon(url, body);
//   } else {
//     fetch(url, { body, method: 'POST', keepalive: true });
//   }
// }

// reportWebVitals(sendToAnalytics);
