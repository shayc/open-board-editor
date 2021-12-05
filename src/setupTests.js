import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { setIconOptions } from '@fluentui/react';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { MediaQueryProvider } from './contexts/media-query';
import { LocaleProvider } from './contexts/locale';
import { ThemeProvider } from './contexts/theme';
import { SpeechProvider } from './contexts/speech';
import messages from './i18n/extracted-messages/en-US.json';

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
});

export function renderWithReactIntl(component) {
  const locale = 'en';

  return render(
    <IntlProvider locale={locale} messages={messages}>
      {component}
    </IntlProvider>
  );
}

export function renderWithProviders(component) {
  mockMatchMedia();

  const locale = 'en-US';

  return render(
    <MemoryRouter>
      <MediaQueryProvider>
        <ThemeProvider>
          <LocaleProvider locale={locale}>
            <SpeechProvider>{component}</SpeechProvider>
          </LocaleProvider>
        </ThemeProvider>
      </MediaQueryProvider>
    </MemoryRouter>
  );
}

function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}
