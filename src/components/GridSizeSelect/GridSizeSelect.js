import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { CommandBarButton } from '@fluentui/react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import messages from './GridSizeSelect.messages';
import styles from './GridSizeSelect.module.css';

function GridSizeSelect(props) {
  const { className, onChange } = props;

  const intl = useIntl();
  const { isSmallScreen } = useMediaQuery();
  const rootClassName = clsx(className, styles.root);

  const smallScreenItems = [
    {
      key: 'small',
      text: `${intl.formatMessage(messages.small)} 4`,
      onClick: () => {
        onChange({ columns: 2, rows: 2 });
      },
    },
    {
      key: 'medium',
      text: `${intl.formatMessage(messages.medium)} 9`,
      onClick: () => {
        onChange({ columns: 3, rows: 3 });
      },
    },
    {
      key: 'large',
      text: `${intl.formatMessage(messages.large)} 12`,
      onClick: () => {
        onChange({ columns: 3, rows: 4 });
      },
    },
    {
      key: 'x-large',
      text: `${intl.formatMessage(messages.extraLarge)} 16`,
      onClick: () => {
        onChange({ columns: 4, rows: 4 });
      },
    },
  ];

  const items = [
    {
      key: 'small',
      text: `${intl.formatMessage(messages.small)} 4`,
      onClick: () => {
        onChange({ columns: 2, rows: 2 });
      },
    },
    {
      key: 'medium',
      text: `${intl.formatMessage(messages.medium)} 12`,
      onClick: () => {
        onChange({ columns: 4, rows: 3 });
      },
    },
    {
      key: 'large',
      text: `${intl.formatMessage(messages.large)} 24`,
      onClick: () => {
        onChange({ columns: 6, rows: 4 });
      },
    },
    {
      key: 'x-large',
      text: `${intl.formatMessage(messages.extraLarge)} 60`,
      onClick: () => {
        onChange({ columns: 10, rows: 6 });
      },
    },
  ];

  return (
    <CommandBarButton
      className={rootClassName}
      title={intl.formatMessage(messages.changeGridSize)}
      iconProps={{ iconName: 'GridViewMedium' }}
      menuProps={{
        items: isSmallScreen ? smallScreenItems : items,
      }}
    />
  );
}

GridSizeSelect.propTypes = {
  /**
   * React children
   *
   * @ignore
   */
  children: PropTypes.node,
};

export default GridSizeSelect;
