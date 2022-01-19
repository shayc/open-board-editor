import { useMedia } from 'react-use';

const mediaQueries = {
  phone: `
    (min-device-width: 320px)
    and (max-device-width: 844px)
    and (min-device-height: 320px)
    and (max-device-height: 844px)
    and (-webkit-min-device-pixel-ratio: 2)
  `,
  smallScreen: '(max-width: 600px)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersColorSchemeDark: '(prefers-color-scheme: dark)',
};

export function useMediaQuery() {
  const isPhone = useMedia(mediaQueries.phone);
  const portrait = useMedia(mediaQueries.portrait);
  const landscape = useMedia(mediaQueries.landscape);
  const isSmallScreen = useMedia(mediaQueries.smallScreen);
  const prefersReducedMotion = useMedia(mediaQueries.prefersReducedMotion);
  const prefersColorSchemeDark = useMedia(mediaQueries.prefersColorSchemeDark);

  return {
    portrait,
    landscape,
    isPhone,
    isSmallScreen,
    prefersReducedMotion,
    prefersColorSchemeDark,
  };
}
