import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'nprogress/nprogress.css';
import App from './App';
import './core/config/i18n';
import './mocks/server';
import setupServiceWorker from 'serviceWorker';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

setupServiceWorker();
reportWebVitals();
