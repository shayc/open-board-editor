import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Dropdown, Text } from '@fluentui/react';

import { useSpeech } from '../../../contexts/speech';
import { useLocale } from '../../../contexts/locale';
import messages from './LanguageSettings.messages';
import styles from './LanguageSettings.module.css';

function LanguageSettings(props) {
  const { className } = props;

  const { locale, appLanguages, setLocale } = useLocale();
  const speech = useSpeech();

  const rootClassName = clsx(className, styles.root);

  function handleLocaleChange(event, locale) {
    setLocale(locale.key);
  }

  useEffect(() => {
    if (locale) {
      speech.setLang(locale);
    }
  }, [locale, speech]);

  return (
    <div className={rootClassName}>
      <Text as="p" variant="large" block>
        <FormattedMessage {...messages.language} />
      </Text>

      <Dropdown
        className={rootClassName}
        label={<FormattedMessage {...messages.displayLanguage} />}
        defaultSelectedKey={locale}
        options={appLanguages}
        onChange={handleLocaleChange}
      />
    </div>
  );
}

LanguageSettings.propTypes = {
  /**
   *
   */
  className: PropTypes.string,
};

export default LanguageSettings;
