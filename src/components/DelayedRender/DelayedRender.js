import PropTypes from 'prop-types';

import useDelayedRender from './useDelayedRender';

function DelayedRender(props) {
  const { children, delay } = props;

  return useDelayedRender(delay)(() => children);
}

DelayedRender.propTypes = {
  /**
   * React children
   */
  children: PropTypes.node.isRequired,
  /**
   * Delay in milliseconds
   */
  delay: PropTypes.number.isRequired,
};

export default DelayedRender;
