import { createTheme as createMuiTheme, Theme } from '@mui/material';
import { createThemeComponents } from './components';
import mixins from './mixins';
import { darkPalette, lightPalette } from './palette';
import shape from './shape';
import transitions from './transitions';
import typography from './typography';

export const createTheme = (mode: 'dark' | 'light'): Theme => {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  // Create base theme
  const baseTheme = createMuiTheme({
    mixins,
    palette,
    shape,
    transitions,
    typography,
  });

  // Inject base theme to be used in components
  return createMuiTheme(
    {
      components: createThemeComponents(baseTheme),
    },
    baseTheme
  );
};
