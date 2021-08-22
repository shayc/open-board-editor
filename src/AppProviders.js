import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { APP_LOCALES, DEFAULT_LOCALE } from './i18n/i18n';
import { SpeechProvider } from './features/speech';
import { LocaleProvider } from './features/locale';
import { ThemeProvider } from './features/theme';
import { MediaQueryProvider } from './features/media-query';
import { UserSettingsProvider } from './features/user-settings';

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
        <MediaQueryProvider>
          <ThemeProvider>
            <LocaleProvider locale={initialLocale}>
              <SpeechProvider>
                <UserSettingsProvider>{children}</UserSettingsProvider>
              </SpeechProvider>
            </LocaleProvider>
          </ThemeProvider>
        </MediaQueryProvider>
      </Router>
    </HelmetProvider>
  );
}
export default AppProviders;
