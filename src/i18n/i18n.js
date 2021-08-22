const DEFAULT_LOCALE = 'en-US';
const APP_LOCALES = [DEFAULT_LOCALE, 'he-IL', 'es-ES', 'fr-FR'].sort();

function importTranslation(locale) {
  return import(`./extracted-messages/${locale}.json`);
}

// CommonJS `module.exports` is intentional, used by `extract-intl.js`.
module.exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
module.exports.APP_LOCALES = APP_LOCALES;
module.exports.importTranslation = importTranslation;
