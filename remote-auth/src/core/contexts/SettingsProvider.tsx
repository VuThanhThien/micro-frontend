import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createTheme } from '../theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

interface SettingsContextInterface {
  collapsed: boolean;
  mode: string;
  open: boolean;
  changeCollapsed: (collapsed: boolean) => void;
  changeMode: (mode: string) => void;
  toggleDrawer: () => void;
}

export const SettingsContext = createContext({} as SettingsContextInterface);

type SettingsProviderProps = {
  children: React.ReactNode;
};

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [collapsed, setCollapsed] = useLocalStorage('sidebarcollapsed', false);
  const [mode, setMode] = useLocalStorage('mode', 'light');
  const [open, setOpen] = useState(false);

  const theme = useMemo(() => createTheme(mode as 'dark' | 'light'), [mode]);

  const changeCollapsed = (collapsed: boolean) => {
    if (typeof collapsed === 'boolean') {
      setCollapsed(collapsed);
    }
  };

  const changeMode = (mode: string) => {
    if (mode) {
      setMode(mode);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <SettingsContext.Provider
      value={{
        collapsed,
        mode,
        open,
        changeCollapsed,
        changeMode,
        toggleDrawer,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  return useContext(SettingsContext);
}

export default SettingsProvider;
