import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { MediaQueryProvider } from '../src/features/media-query';
import { SpeechProvider } from '../src/features/speech';
import { LocaleProvider } from '../src/features/locale';
import { ThemeProvider } from '../src/features/theme';
import { SettingsProvider } from '../src/features/settings';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en-US',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en-US', right: '🇺🇸', title: 'English' },
        { value: 'he-IL', right: '🇮🇱', title: 'עברית' },
      ],
    },
  },
};

const withThemeProvider = (Story, { globals }) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};

const withLocaleProvider = (Story, { globals }) => {
  return (
    <LocaleProvider locale={globals.locale}>
      <Story />
    </LocaleProvider>
  );
};

const withSpeechProvider = (Story, { globals }) => {
  return (
    <SpeechProvider>
      <Story />
    </SpeechProvider>
  );
};

const withMediaQueryProvider = (Story, { globals }) => {
  return (
    <MediaQueryProvider>
      <Story />
    </MediaQueryProvider>
  );
};

const withSettingsProvider = (Story, { globals }) => {
  return (
    <SettingsProvider>
      <Story />
    </SettingsProvider>
  );
};

const withRouterProvider = (Story, { globals }) => {
  return (
    <Router>
      <Story />
    </Router>
  );
};

export const decorators = [
  withThemeProvider,
  withLocaleProvider,
  withSpeechProvider,
  withMediaQueryProvider,
  withSettingsProvider,
  withRouterProvider,
];
