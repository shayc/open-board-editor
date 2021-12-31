import { useIntl } from 'react-intl';
import { DefaultButton } from '@fluentui/react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import messages from './EditToggleButton.messages';
import styles from './EditToggleButton.module.css';

function EditToggleButton(props) {
  const { checked, className, onClick } = props;

  const intl = useIntl();
  const rootClassName = clsx(className, styles.root);

  const rootStyles = {
    root: {
      background: 'transparent',
    },
  };

  return (
    <DefaultButton
      styles={rootStyles}
      className={rootClassName}
      iconProps={{ iconName: checked ? 'Play' : 'Edit' }}
      onClick={onClick}
      title={intl.formatMessage(checked ? messages.view : messages.edit)}
      text={
        checked
          ? intl.formatMessage(messages.view)
          : intl.formatMessage(messages.edit)
      }
    />
  );
}

EditToggleButton.propTypes = {
  /**
   * Callback, fired when the button is clicked.
   */
  onClick: PropTypes.func,
};

export default EditToggleButton;
