import { useIntl } from 'react-intl';
import { DefaultButton } from '@fluentui/react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import messages from './ViewButton.messages';
import styles from './ViewButton.module.css';

function ViewButton(props) {
  const { className, onClick } = props;

  const intl = useIntl();
  const rootClassName = clsx(className, styles.root);

  return (
    <DefaultButton
      styles={{
        root: {
          background: 'transparent',
        },
      }}
      className={rootClassName}
      iconProps={{ iconName: 'View' }}
      onClick={onClick}
    >
      {intl.formatMessage(messages.view)}
    </DefaultButton>
  );
}

ViewButton.propTypes = {
  /**
   * Callback, fired when the button is clicked.
   */
  onClick: PropTypes.func,
};

export default ViewButton;
