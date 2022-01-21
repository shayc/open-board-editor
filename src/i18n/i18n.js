export const DEFAULT_LOCALE = 'en-US';
export const APP_LOCALES = [DEFAULT_LOCALE, 'he-IL', 'es-ES', 'fr-FR'].sort();

export function getUserLocale(locales, userLocale) {
  // TODO: Some browsers expose navigator.language in different format: 'en-US', 'en-us' 'en_US', 'en'
  return locales.find((locale) => locale.includes(userLocale));
}

export function importTranslation(locale) {
  return import(`./extracted-messages/${locale}.json`);
}
