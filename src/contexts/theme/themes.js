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
    themePrimary: '#456680',
    themeLighterAlt: '#f5f8fa',
    themeLighter: '#d9e3eb',
    themeLight: '#bbccd9',
    themeTertiary: '#819db3',
    themeSecondary: '#55768f',
    themeDarkAlt: '#3e5c73',
    themeDark: '#344e61',
    themeDarker: '#273947',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
};

const darkTheme = {
  ...font,
  palette: {
    themePrimary: '#7ec0f2',
    themeLighterAlt: '#05080a',
    themeLighter: '#141f27',
    themeLight: '#263a49',
    themeTertiary: '#4c7391',
    themeSecondary: '#6fa9d5',
    themeDarkAlt: '#8ac6f4',
    themeDark: '#9ccff5',
    themeDarker: '#b5dbf8',
    neutralLighterAlt: '#2b2b2b',
    neutralLighter: '#333333',
    neutralLight: '#414141',
    neutralQuaternaryAlt: '#4a4a4a',
    neutralQuaternary: '#515151',
    neutralTertiaryAlt: '#6f6f6f',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#fff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#212121',
  },
};

export { lightTheme, darkTheme };
