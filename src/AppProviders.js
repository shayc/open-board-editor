import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { APP_LOCALES, DEFAULT_LOCALE } from './i18n/i18n';
import { SpeechProvider } from './contexts/speech';
import { LocaleProvider } from './contexts/locale';
import { ThemeProvider } from './contexts/theme';
import { SettingsProvider } from './contexts/settings';

const userLocale = APP_LOCALES.find((locale) => {
  // TODO: Some browsers expose navigator.language in different format: 'en-US', 'en-us' 'en_US', 'en'
  return locale.includes(navigator.language);
});

const initialLocale = userLocale || DEFAULT_LOCALE;

function AppProviders(props) {
  const { children } = props;

  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <LocaleProvider locale={initialLocale}>
            <SpeechProvider>
              <SettingsProvider>{children}</SettingsProvider>
            </SpeechProvider>
          </LocaleProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}
export default AppProviders;
