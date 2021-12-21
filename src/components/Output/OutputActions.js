import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { IconButton, getRTL } from '@fluentui/react';
import clsx from 'clsx';

import messages from './OutputActions.messages';
import BackspaceSvg from './images/BackspaceSvg';
import ClearSvg from './images/ClearSvg';
import styles from './OutputActions.module.css';

function OutputActions(props) {
  const {
    backspaceDisabled,
    clearDisabled,
    clearHidden,
    onClearClick,
    onBackspaceClick,
    size = 'medium',
  } = props;

  const isLarge = size === 'large';
  const isRTL = getRTL();
  const intl = useIntl();

  const buttonClassName = clsx(styles.button, {
    [styles.buttonLarge]: isLarge,
  });

  const iconClassName = clsx(styles.icon, {
    [styles.iconLarge]: isLarge,
  });

  return (
    <>
      <IconButton
        className={buttonClassName}
        aria-label={intl.formatMessage(messages.clear)}
        disabled={clearDisabled || clearHidden}
        onClick={onClearClick}
        style={{ visibility: clearHidden ? 'hidden' : 'visible' }}
      >
        <ClearSvg
          className={iconClassName}
          style={{ transform: isRTL ? 'scaleX(-1)' : '' }}
        />
      </IconButton>

      <IconButton
        className={buttonClassName}
        aria-label={intl.formatMessage(messages.backspace)}
        disabled={backspaceDisabled}
        onClick={onBackspaceClick}
      >
        <BackspaceSvg
          className={iconClassName}
          style={{ transform: isRTL ? 'scaleX(-1)' : '' }}
        />
      </IconButton>
    </>
  );
}

OutputActions.propTypes = {
  /**
   *
   */
  backspaceDisabled: PropTypes.bool,
  /**
   *
   */
  clearDisabled: PropTypes.bool,
  /**
   *
   */
  onBackspaceClick: PropTypes.func,
  /**
   *
   */
  onClearClick: PropTypes.func,
};

export default OutputActions;
