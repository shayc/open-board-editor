export const DEFAULT_LOCALE = 'en-US';
export const APP_LOCALES = [DEFAULT_LOCALE, 'he-IL', 'es-ES', 'fr-FR'].sort();

export function importTranslation(locale) {
  return import(`./extracted-messages/${locale}.json`);
}
