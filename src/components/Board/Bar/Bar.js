import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Bar.module.css';

function Bar(props) {
  const { className, endGroup, middleGroup, startGroup } = props;

  const rootClassName = clsx(className, styles.root);

  return (
    <div className={rootClassName}>
      <div className={styles.startGroup}>{startGroup}</div>
      <div className={styles.middleGroup}>{middleGroup}</div>
      <div className={styles.endGroup}>{endGroup}</div>
    </div>
  );
}

Bar.propTypes = {
  /**
   * End group
   */
  endGroup: PropTypes.node,
  /**
   * Middle group
   */
  middleGroup: PropTypes.node,
  /**
   * Start group
   */
  startGroup: PropTypes.node,
};

export default Bar;
