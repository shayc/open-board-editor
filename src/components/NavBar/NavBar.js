import React from 'react';
import PropTypes from 'prop-types';

import { Bar, NavButtons, NavText } from '../../components';
import styles from './NavBar.module.css';

function NavBar(props) {
  const {
    backDisabled,
    backHidden,
    actions,
    forwardDisabled,
    forwardHidden,
    homeHidden,
    homeDisabled,
    onBackClick,
    onForwardClick,
    onHomeClick,
    text,
  } = props;

  return (
    <Bar
      className={styles.root}
      startGroup={
        <NavButtons
          backDisabled={backDisabled}
          backHidden={backHidden}
          forwardDisabled={forwardDisabled}
          forwardHidden={forwardHidden}
          homeHidden={homeHidden}
          homeDisabled={homeDisabled}
          onBackClick={onBackClick}
          onForwardClick={onForwardClick}
          onHomeClick={onHomeClick}
        />
      }
      middleGroup={<NavText>{text}</NavText>}
      endGroup={actions}
    />
  );
}

NavBar.propTypes = {
  /**
   * If `true`, back button is disabled
   */
  backDisabled: PropTypes.bool,
  /**
   * If `true`, forward button is disabled
   */
  forwardDisabled: PropTypes.bool,
  /**
   * If `true`, forward button is hidden
   */
  forwardHidden: PropTypes.bool,
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
  /**
   * Text to render
   */
  text: PropTypes.string,
};

export default React.memo(NavBar);
