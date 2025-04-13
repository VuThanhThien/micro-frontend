import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import React, { useMemo } from 'react';
import { createTheme } from '../theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import useLocalStorage from 'hooks/useLocalStorage';

type SettingsProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: SettingsProviderProps) => {
  const [mode, _setMode] = useLocalStorage('mode', 'light');

  const theme = useMemo(() => createTheme(mode as 'dark' | 'light'), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {children}
      </LocalizationProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
