import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { IntlProvider } from 'react-intl';
import { setRTL } from '@fluentui/react';

import { APP_LOCALES, importTranslation } from '../../i18n/i18n';
import { polyfillDisplayNames } from './polyfillDisplayNames';

const LocaleContext = React.createContext();

function getLocaleDirection(locale) {
  const lang = locale.slice(0, 2);
  const isRTL = lang === 'he' || lang === 'ar';

  return isRTL ? 'rtl' : 'ltr';
}

function LocaleProvider(props) {
  const { locale: initialLocale } = props;

  const [locale, setLocale] = useState(initialLocale);
  const [localeList, setLocaleList] = useState([]);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    async function loadMessages(locale) {
      const translation = await importTranslation(locale);
      setMessages(translation.default);
    }

    async function getLocaleList(locale) {
      await polyfillDisplayNames(locale);

      const languageDisplayNames = APP_LOCALES.map((appLocale) => {
        const displayNames = new Intl.DisplayNames(appLocale, {
          type: 'language',
        });
        return { key: appLocale, text: displayNames.of(appLocale) };
      });

      setLocaleList(languageDisplayNames);
    }

    const isRTL = getLocaleDirection(locale) === 'rtl';
    setRTL(isRTL);

    getLocaleList(locale);
    loadMessages(locale);
  }, [locale]);

  const context = useMemo(() => {
    return {
      locale,
      localeList,
      setLocale,
    };
  }, [locale, localeList, setLocale]);

  return (
    messages && (
      <IntlProvider locale={locale} messages={messages}>
        <LocaleContext.Provider value={context} {...props} />
      </IntlProvider>
    )
  );
}

function useLocale() {
  const context = React.useContext(LocaleContext);

  if (!context) {
    throw new Error(`useLocale must be used within a LocaleProvider`);
  }

  return context;
}

LocaleProvider.propTypes = {
  /**
   * Initial locale
   */
  locale: PropTypes.string.isRequired,
};

export { LocaleProvider, useLocale };
