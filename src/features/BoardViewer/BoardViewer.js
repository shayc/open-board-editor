import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './BoardViewer.messages';
import styles from './BoardViewer.module.css';

function BoardViewer(props) {
  const { children } = props;

  return (
    <div className={styles.root}>
      <h2>
        <FormattedMessage {...messages.title} />
      </h2>
      {children}
    </div>
  );
}

BoardViewer.propTypes = {
  /**
   * React children
   *
   * @ignore
   */
  children: PropTypes.node,
};

export default BoardViewer;
