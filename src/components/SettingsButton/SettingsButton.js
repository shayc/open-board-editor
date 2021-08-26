import { useIntl } from 'react-intl';
import { IconButton } from '@fluentui/react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import messages from './SettingsButton.messages';
import styles from './SettingsButton.module.css';

function SettingsButton(props) {
  const { className, onClick } = props;

  const intl = useIntl();
  const rootClassName = clsx(className, styles.root);

  return (
    <IconButton
      styles={{ root: { color: 'inherit' } }}
      iconProps={{
        iconName: 'Settings',
      }}
      className={rootClassName}
      ariaLabel={intl.formatMessage(messages.settings)}
      title={intl.formatMessage(messages.settings)}
      onClick={onClick}
    />
  );
}

SettingsButton.propTypes = {
  /**
   * Callback, fired when the button is clicked.
   */
  onClick: PropTypes.func,
};

export default SettingsButton;
