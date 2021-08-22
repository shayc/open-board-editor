import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Dropdown, Text } from '@fluentui/react';

import { useLocale } from '../../../features/locale';
import messages from './LanguageSettings.messages';
import styles from './LanguageSettings.module.css';

function LanguageSettings(props) {
  const { className } = props;

  const { locale, localeList, setLocale } = useLocale();

  const rootClassName = clsx(className, styles.root);

  function handleLocaleChange(event, locale) {
    setLocale(locale.key);
  }

  return (
    <div className={rootClassName}>
      <Text as="p" variant="large" block>
        <FormattedMessage {...messages.language} />
      </Text>

      <Dropdown
        className={rootClassName}
        label={<FormattedMessage {...messages.displayLanguage} />}
        defaultSelectedKey={locale}
        options={localeList}
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
