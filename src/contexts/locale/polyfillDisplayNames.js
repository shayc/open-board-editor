import { shouldPolyfill } from '@formatjs/intl-displaynames/should-polyfill';

export async function polyfillDisplayNames(locale) {
  if (shouldPolyfill()) {
    await import('@formatjs/intl-displaynames/polyfill');
  }

  if (Intl.DisplayNames.polyfilled) {
    await import('@formatjs/intl-displaynames/locale-data/en');
    await import('@formatjs/intl-displaynames/locale-data/he');
    await import('@formatjs/intl-displaynames/locale-data/fr');
    await import('@formatjs/intl-displaynames/locale-data/es');
  }
}
