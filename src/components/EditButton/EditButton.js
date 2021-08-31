import { useIntl } from 'react-intl';
import { DefaultButton } from '@fluentui/react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import messages from './EditButton.messages';
import styles from './EditButton.module.css';

function EditButton(props) {
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
      iconProps={{ iconName: 'Edit' }}
      onClick={onClick}
    >
      {intl.formatMessage(messages.edit)}
    </DefaultButton>
  );
}

EditButton.propTypes = {
  /**
   * Callback, fired when the button is clicked.
   */
  onClick: PropTypes.func,
};

export default EditButton;
