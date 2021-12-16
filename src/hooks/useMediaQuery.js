import { useMedia } from 'react-use';

const mediaQueries = {
  smallScreen: '(max-width: 600px)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersDarkColorScheme: '(prefers-color-scheme: dark)',
};

export function useMediaQuery() {
  const isSmallScreen = useMedia(mediaQueries.smallScreen);
  const prefersReducedMotion = useMedia(mediaQueries.prefersReducedMotion);
  const prefersDarkColorScheme = useMedia(mediaQueries.prefersDarkColorScheme);

  return {
    isSmallScreen,
    prefersReducedMotion,
    prefersDarkColorScheme,
  };
}
