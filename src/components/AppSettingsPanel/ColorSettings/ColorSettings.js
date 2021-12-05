import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Text, Toggle } from '@fluentui/react';

import { useTheme } from '../../../contexts/theme/theme-context';
import messages from './ColorSettings.messages';
import styles from './ColorSettings.module.css';

function ColorSettings(props) {
  const { className } = props;

  const { isDarkMode, setIsDarkMode } = useTheme();

  const rootClassName = clsx(className, styles.root);

  function handleDarkModeChange(event, isDarkMode) {
    setIsDarkMode(isDarkMode);
  }

  return (
    <div className={rootClassName}>
      <Text as="p" variant="large" block>
        <FormattedMessage {...messages.colors} />
      </Text>

      <Toggle
        inlineLabel
        checked={isDarkMode}
        onText={<FormattedMessage {...messages.on} />}
        offText={<FormattedMessage {...messages.off} />}
        label={<FormattedMessage {...messages.darkMode} />}
        onChange={handleDarkModeChange}
      />
    </div>
  );
}

ColorSettings.propTypes = {
  /**
   * React children
   *
   * @ignore
   */
  children: PropTypes.node,
};

export default ColorSettings;
