import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { getUserLocale, APP_LOCALES, DEFAULT_LOCALE } from './i18n/i18n';
import { SpeechProvider } from './contexts/speech';
import { LocaleProvider } from './contexts/locale';
import { ThemeProvider } from './contexts/theme';
import { SettingsProvider } from './contexts/settings';

const initialLocale =
  getUserLocale(APP_LOCALES, navigator.language) || DEFAULT_LOCALE;

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
