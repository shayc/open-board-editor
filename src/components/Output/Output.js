import PropTypes from 'prop-types';
import {
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements,
} from '@fluentui/react';
import clsx from 'clsx';

import Scroll from './Scroll/Scroll';
import styles from './Output.module.css';

const KeyCodes = {
  enter: 13,
  space: 32,
};

function Output(props) {
  const { actions, className, onClick, renderValue, values } = props;

  const outputClassName = clsx(styles.root, className);
  const isFocusable = Boolean(values.length);
  const tabIndex = values.length ? '0' : '-1';
  const role = values.length ? 'button' : '';

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

      <div className={styles.actions}>{actions}</div>
    </FocusZone>
  );
}

Output.propTypes = {
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
