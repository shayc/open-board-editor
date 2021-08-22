import { shouldPolyfill } from '@formatjs/intl-displaynames/should-polyfill';

export async function polyfillDisplayNames(locale) {
  if (shouldPolyfill()) {
    await import('@formatjs/intl-displaynames/polyfill');
  }

  if (Intl.DisplayNames.polyfilled) {
    switch (locale) {
      default:
        await import('@formatjs/intl-displaynames/locale-data/en');
        break;
      case 'he-IL':
        await import('@formatjs/intl-displaynames/locale-data/he');
        break;
    }
  }
}
