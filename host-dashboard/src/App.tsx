import * as Sentry from '@sentry/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRoutes from './AppRoutes';
import SettingsProvider from './core/contexts/SettingsProvider';
import Loader from './core/components/Loader';
import QueryWrapper from 'core/components/QueryWrapper';
import { AuthProvider } from 'remoteAuth/contexts';
import { SnackbarProvider } from 'remoteComponents/contexts';
import { BrowserRouter } from 'react-router-dom';

if (import.meta.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: import.meta.env.REACT_APP_SENTRY_DSN,
  });
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Sentry.ErrorBoundary fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <QueryWrapper>
              <SnackbarProvider>
                <AuthProvider>
                  <BrowserRouter basename="/">
                    <AppRoutes />
                  </BrowserRouter>
                </AuthProvider>
              </SnackbarProvider>
            </QueryWrapper>
          </SettingsProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </React.Suspense>
  );
}

export default App;
