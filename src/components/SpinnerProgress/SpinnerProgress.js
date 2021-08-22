import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import { Spinner, SpinnerSize } from '@fluentui/react';

import messages from './SpinnerProgress.messages';
import styles from './SpinnerProgress.module.css';

function SpinnerProgress(props) {
  const { className, label } = props;

  const intl = useIntl();
  const rootClassName = clsx(className, styles.root);

  return (
    <div className={rootClassName}>
      <Spinner
        label={label || intl.formatMessage(messages.loading)}
        size={SpinnerSize.large}
      />
    </div>
  );
}

SpinnerProgress.propTypes = {
  /**
   * Label to render
   */
  label: PropTypes.string,
};

export default SpinnerProgress;
