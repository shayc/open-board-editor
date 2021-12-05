import { FontSizes, FontWeights } from '@fluentui/react';

const font = {
  defaultFontStyle: {
    fontFamily: `"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif`,
    fontWeight: 'regular',
  },
  fonts: {
    tiny: {
      fontSize: FontSizes.size12,
    },
    small: {
      fontSize: FontSizes.size14,
    },
    medium: {
      fontSize: FontSizes.size16,
    },
    mediumPlus: {
      fontSize: FontSizes.size18,
    },
    large: {
      fontSize: FontSizes.size20,
      fontWeight: FontWeights.semibold,
    },
    xLarge: {
      fontSize: FontSizes.size22,
      fontWeight: FontWeights.semibold,
    },
  },
};

const lightTheme = {
  ...font,
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#f3f2f1',
    neutralLighter: '#edebe9',
    neutralLight: '#e1dfdd',
    neutralQuaternaryAlt: '#d0d0d0',
    neutralQuaternary: '#c8c6c4',
    neutralTertiaryAlt: '#a19f9d',
    neutralTertiary: '#605e5c',
    neutralSecondary: '#3b3a39',
    neutralPrimaryAlt: '#323130',
    neutralPrimary: '#201f1e',
    neutralDark: '#111',
    black: '#000000',
    white: '#ffffff',
  },
};

const darkTheme = {
  ...font,
  palette: {
    themePrimary: '#6ebdfa',
    themeLighterAlt: '#04080a',
    themeLighter: '#121e28',
    themeLight: '#21394b',
    themeTertiary: '#427296',
    themeSecondary: '#61a7dc',
    themeDarkAlt: '#7cc4fa',
    themeDark: '#90cdfb',
    themeDarker: '#addafc',
    neutralLighterAlt: '#212121',
    neutralLighter: '#2a2a2a',
    neutralLight: '#393939',
    neutralQuaternaryAlt: '#424242',
    neutralQuaternary: '#494949',
    neutralTertiaryAlt: '#686868',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#fff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#181818',
  },
};

export { lightTheme, darkTheme };
