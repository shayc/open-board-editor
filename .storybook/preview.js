import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { SpeechProvider } from '../src/contexts/speech';
import { LocaleProvider } from '../src/contexts/locale';
import { ThemeProvider } from '../src/contexts/theme';
import { SettingsProvider } from '../src/contexts/settings';

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
  withSettingsProvider,
  withRouterProvider,
];
