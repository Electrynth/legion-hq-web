import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import themes from 'constants/themes';

function ThemeWrapper({ children, themeColor }) {
  const theme = responsiveFontSizes(createMuiTheme({
    typography: { useNextVariants: true },
    palette: themes.palettes[themeColor]
  }));
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeWrapper;
