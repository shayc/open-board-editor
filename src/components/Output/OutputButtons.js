import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { IconButton, getRTL } from '@fluentui/react';
import clsx from 'clsx';

import messages from './OutputButtons.messages';
import BackspaceSvg from './images/BackspaceSvg';
import ClearSvg from './images/ClearSvg';
import styles from './OutputButtons.module.css';

function OutputButtons(props) {
  const {
    backspaceDisabled,
    clearDisabled,
    clearHidden,
    onClearClick,
    onBackspaceClick,
  } = props;

  const isRTL = getRTL();
  const intl = useIntl();

  const buttonClassName = clsx(styles.button, {
    [styles.buttonLarge]: true,
  });

  const iconClassName = clsx(styles.icon, {
    [styles.iconLarge]: true,
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

OutputButtons.propTypes = {
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

export default OutputButtons;
