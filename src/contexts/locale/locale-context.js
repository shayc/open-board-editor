import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { IntlProvider } from 'react-intl';
import { setRTL } from '@fluentui/react';

import { APP_LOCALES, importMessages } from '../../i18n/i18n';
import { polyfillDisplayNames } from './polyfillDisplayNames';

const LocaleContext = React.createContext();

function LocaleProvider(props) {
  const { locale: initialLocale } = props;

  const [locale, setLocale] = useState(initialLocale);
  const [appLanguages, setAppLanguages] = useState([]);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    async function loadMessages(locale) {
      const messages = await importMessages(locale);
      setMessages(messages.default);
    }

    async function getAppLanguages(locale) {
      await polyfillDisplayNames(locale);

      const languages = APP_LOCALES.map((appLocale) => {
        const displayNames = new Intl.DisplayNames(appLocale, {
          type: 'language',
        });

        return { key: appLocale, text: displayNames.of(appLocale) };
      });

      setAppLanguages(languages);
    }

    setRTL(getIsRTL(locale));
    getAppLanguages(locale);
    loadMessages(locale);
  }, [locale]);

  const context = useMemo(() => {
    return {
      locale,
      appLanguages,
      setLocale,
    };
  }, [locale, appLanguages, setLocale]);

  return (
    messages && (
      <IntlProvider locale={locale} messages={messages}>
        <LocaleContext.Provider value={context} {...props} />
      </IntlProvider>
    )
  );
}

LocaleProvider.propTypes = {
  /**
   * Initial locale
   */
  locale: PropTypes.string.isRequired,
};

function useLocale() {
  const context = React.useContext(LocaleContext);

  if (!context) {
    throw new Error(`useLocale must be used within a LocaleProvider`);
  }

  return context;
}

function getIsRTL(locale) {
  const lang = locale.slice(0, 2);
  const isRTL = lang === 'he' || lang === 'ar';

  return isRTL;
}

export { LocaleProvider, useLocale };
