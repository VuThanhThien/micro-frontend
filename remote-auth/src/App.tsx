import * as Sentry from "@sentry/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AppRoutes from "./AppRoutes";
import SettingsProvider from "./core/contexts/SettingsProvider";
import Loader from "./core/components/Loader";
import ErrorWraper from "core/components/QueryWrapper";
import { AuthProvider } from "auth/contexts";
import { SnackbarProvider } from "remoteComponents/contexts";
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
            <ErrorWraper>
              <SnackbarProvider>
                <AuthProvider>
                  <AppRoutes />
                </AuthProvider>
              </SnackbarProvider>
            </ErrorWraper>
          </SettingsProvider>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </React.Suspense>
  );
}

export default App;
