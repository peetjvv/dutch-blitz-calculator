import '@total-typescript/ts-reset';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './scss/main.scss';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.error('SW registration failed: ', registrationError);
        });
    });
  }
};

registerServiceWorker();

const container = document.getElementById('app');
const root = createRoot(container!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
root.render(<App />);
