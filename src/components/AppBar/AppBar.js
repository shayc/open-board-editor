import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Stack, Text } from '@fluentui/react';
import clsx from 'clsx';

import styles from './AppBar.module.css';

function AppBar(props) {
  const { actions, className, title } = props;

  const rootClassName = clsx(className, styles.root);

  return (
    <Stack horizontal className={rootClassName} horizontalAlign="space-between">
      <Stack
        horizontal
        verticalAlign="center"
        styles={{ root: { minWidth: '0' } }}
      >
        <Text className={styles.title} variant="mediumPlus">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            {title}
          </Link>
        </Text>
      </Stack>

      <Stack horizontal verticalAlign="center">
        {actions}
      </Stack>
    </Stack>
  );
}

AppBar.propTypes = {
  /**
   * Action buttons to render
   */
  actions: PropTypes.node,
};

export default AppBar;
