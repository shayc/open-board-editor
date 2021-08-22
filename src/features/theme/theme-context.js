import React, { useState, useEffect } from 'react';
import {
  initializeIcons,
  ThemeProvider as FluentThemeProvider,
} from '@fluentui/react';

import { useMediaQuery } from '../media-query';
import { darkTheme, lightTheme } from './themes';

initializeIcons();

const ThemeContext = React.createContext();

function ThemeProvider(props) {
  const { children, ...other } = props;

  const { prefersDarkColorScheme } = useMediaQuery();
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkColorScheme);

  useEffect(() => {
    setIsDarkMode(prefersDarkColorScheme);
  }, [prefersDarkColorScheme]);

  useEffect(() => {
    if (isDarkMode) {
      exposeCSSVariables(darkTheme, document.documentElement);
    } else {
      exposeCSSVariables(lightTheme, document.documentElement);
    }
  }, [isDarkMode]);

  const context = React.useMemo(() => {
    return {
      setIsDarkMode,
      isDarkMode,
    };
  }, [isDarkMode]);

  const appTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={context} {...other}>
      <FluentThemeProvider style={{ height: '100%' }} theme={appTheme}>
        {children}
      </FluentThemeProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }

  return context;
}

function exposeCSSVariables(theme, domElement) {
  const cssVariables = Object.entries(theme.palette)
    .map(([key, value]) => `--${key}: ${value}`)
    .join('; ');

  domElement.style = cssVariables;
}

export { ThemeProvider, useTheme };
