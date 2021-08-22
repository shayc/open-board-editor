import { useIntl } from 'react-intl';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  IconButton,
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements,
} from '@fluentui/react';

import messages from './NavButtons.messages';
import styles from './NavButtons.module.css';
import { getRTL } from '@fluentui/react';

const noop = () => {};

function NavButtons(props) {
  const {
    backDisabled,
    backHidden,
    className,
    forwardDisabled,
    forwardHidden,
    homeDisabled,
    homeHidden,
    onBackClick = noop,
    onForwardClick = noop,
    onHomeClick = noop,
  } = props;

  const isRTL = getRTL();
  const intl = useIntl();

  const iconSize = '20px';

  const iconStyles = {
    root: { fontSize: iconSize, height: iconSize, lineHeight: iconSize },
  };

  const backIconName = isRTL ? 'Forward' : 'Back';
  const backIconProps = { iconName: backIconName, styles: iconStyles };
  const forwardIconName = isRTL ? 'Back' : 'Forward';
  const forwardIconProps = { iconName: forwardIconName, styles: iconStyles };
  const homeIconProps = { iconName: 'Home', styles: iconStyles };

  const rootClassName = clsx(className, styles.root);

  const buttonStyles = {
    rootDisabled: {
      background: 'initial',
    },
    iconDisabled: {
      color: 'var(--neutralTertiaryAlt)',
    },
  };

  return (
    <FocusZone
      className={rootClassName}
      direction={FocusZoneDirection.horizontal}
      handleTabKey={FocusZoneTabbableElements.all}
    >
      {!backHidden && (
        <IconButton
          className={styles.button}
          styles={buttonStyles}
          disabled={backDisabled}
          iconProps={backIconProps}
          ariaLabel={intl.formatMessage(messages.back)}
          title={intl.formatMessage(messages.goBack)}
          onClick={onBackClick}
        />
      )}

      {!forwardHidden && (
        <IconButton
          className={styles.button}
          styles={buttonStyles}
          disabled={forwardDisabled}
          iconProps={forwardIconProps}
          ariaLabel={intl.formatMessage(messages.forward)}
          title={intl.formatMessage(messages.goForward)}
          onClick={onForwardClick}
        />
      )}

      {!homeHidden && (
        <IconButton
          className={styles.button}
          styles={buttonStyles}
          disabled={homeDisabled}
          iconProps={homeIconProps}
          ariaLabel={intl.formatMessage(messages.home)}
          title={intl.formatMessage(messages.goHome)}
          onClick={onHomeClick}
        />
      )}
    </FocusZone>
  );
}

NavButtons.propTypes = {
  /**
   * If `true`, back button is disabled
   */
  backDisabled: PropTypes.bool,
  /**
   * If `true`, back button is hidden
   */
  backHidden: PropTypes.bool,
  /**
   * If `true`, forward button is disabled
   */
  forwardDisabled: PropTypes.bool,
  /**
   * If `true`, forward button is hidden
   */
  forwardHidden: PropTypes.bool,
  /**
   * If `true`, home button is hidden
   */
  homeHidden: PropTypes.bool,
  /**
   * Callback, fired when back button is clicked
   */
  onBackClick: PropTypes.func,
  /**
   * Callback, fired when forward button is clicked
   */
  onForwardClick: PropTypes.func,
  /**
   * Callback, fired when home button is clicked
   */
  onHomeClick: PropTypes.func,
};

export default NavButtons;
