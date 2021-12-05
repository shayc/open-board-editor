import React, { useMemo, useContext } from 'react';
import { useMedia } from 'react-use';

const MediaQueryContext = React.createContext();

const mediaQueries = {
  smallScreen: '(max-width: 600px)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersDarkColorScheme: '(prefers-color-scheme: dark)',
};

function MediaQueryProvider(props) {
  const { children } = props;

  const isSmallScreen = useMedia(mediaQueries.smallScreen);
  const prefersReducedMotion = useMedia(mediaQueries.prefersReducedMotion);
  const prefersDarkColorScheme = useMedia(mediaQueries.prefersDarkColorScheme);

  const context = useMemo(
    () => ({
      isSmallScreen,
      prefersReducedMotion,
      prefersDarkColorScheme,
    }),
    [isSmallScreen, prefersReducedMotion, prefersDarkColorScheme]
  );

  return (
    <MediaQueryContext.Provider value={context}>
      {children}
    </MediaQueryContext.Provider>
  );
}

function useMediaQuery() {
  const context = useContext(MediaQueryContext);

  if (!context) {
    throw new Error(`useMediaQuery must be used within a MediaQueryProvider`);
  }

  return context;
}

export { MediaQueryProvider, useMediaQuery };
