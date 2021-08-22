import PropTypes from 'prop-types';
import {
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements,
  DefaultButton,
  getRTL,
} from '@fluentui/react';
import clsx from 'clsx';
import BackspaceSvg from './BackspaceSvg';
import ClearSvg from './ClearSvg';

import Scroll from './Scroll/Scroll';
import styles from './Output.module.css';

const KeyCodes = {
  enter: 13,
  space: 32,
};

function Output(props) {
  const {
    className,
    onBackspaceClick,
    onClearClick,
    onClick,
    renderValue,
    values,
  } = props;

  const isRTL = getRTL();

  function handleKeyDown(event) {
    if (event.keyCode === KeyCodes.space) {
      event.preventDefault();
    }
  }

  function handleKeyUp(event) {
    switch (event.keyCode) {
      // fall through
      case KeyCodes.enter:
      case KeyCodes.space:
        onClick?.();
        break;
      default:
      // no default
    }
  }

  const outputClassName = clsx(styles.root, className);

  const isFocusable = Boolean(values.length);
  const tabIndex = values.length ? '0' : '-1';
  const role = values.length ? 'button' : '';

  return (
    <FocusZone
      className={outputClassName}
      direction={FocusZoneDirection.horizontal}
      handleTabKey={FocusZoneTabbableElements.none}
    >
      <Scroll
        className={styles.container}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        role={role}
        tabIndex={tabIndex}
        data-is-focusable={isFocusable}
        data-testid="scroll-container"
      >
        {values.map((value, index) => (
          <div className={styles.value} key={index}>
            {renderValue(value)}
          </div>
        ))}
      </Scroll>

      <DefaultButton
        className={styles.button}
        aria-label="Clear"
        disabled={!values.length}
        onClick={onClearClick}
        style={{ visibility: !values.length ? 'hidden' : 'visible' }}
      >
        <ClearSvg
          className={styles.icon}
          style={{ transform: isRTL ? 'scaleX(-1)' : '' }}
        />
      </DefaultButton>

      <DefaultButton
        className={styles.button}
        aria-label="Backspace"
        onClick={onBackspaceClick}
      >
        <BackspaceSvg
          className={styles.icon}
          style={{ transform: isRTL ? 'scaleX(-1)' : '' }}
        />
      </DefaultButton>
    </FocusZone>
  );
}

Output.propTypes = {
  /**
   * Callback, fired when backspace button is clicked.
   */
  onBackspaceClick: PropTypes.func.isRequired,
  /**
   * Callback, fired when clear button is clicked.
   */
  onClearClick: PropTypes.func.isRequired,
  /**
   * Callback, fired when output is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Value renderer.
   */
  renderValue: PropTypes.func.isRequired,
  /**
   * Values to render.
   */
  values: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Output;
