import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Stack, Text, Icon } from '@fluentui/react';
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
          className={styles.homeLink}
          title={intl.formatMessage(messages.home)}
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
   * Actions to render (e.g. `<Button>`s).
   */
  actions: PropTypes.node,
  /**
   * App name
   */
  name: PropTypes.string,
};

export default AppBar;
