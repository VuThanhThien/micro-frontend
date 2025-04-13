import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './config/i18n';
import ThemeProvider from 'contexts/SettingsProvider.tsx';
import ErrorWrapper from 'components/QueryWrapper/index.tsx';
import { SnackbarProvider } from 'contexts/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorWrapper>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ErrorWrapper>
    </ThemeProvider>
  </StrictMode>
);
