import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Stack, Text } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import clsx from 'clsx';

import messages from './AppBar.messages';
import styles from './AppBar.module.css';

function AppBar(props) {
  const { actions, className, name } = props;

  const intl = useIntl();
  const rootClassName = clsx(className, styles.root);

  return (
    <Stack horizontal className={rootClassName} horizontalAlign="space-between">
      <Stack
        horizontal
        verticalAlign="center"
        styles={{ root: { minWidth: '0' } }}
      >
        <Link
          to="/"
          className={styles.appLauncherLink}
          title={intl.formatMessage(messages.appLauncher)}
        >
          <Icon iconName="Waffle" className={styles.icon} />
        </Link>

        <Text className={styles.name} variant="medium">
          {name}
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
