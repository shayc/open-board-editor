import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { CommandBar, ContextualMenuItemType } from '@fluentui/react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import messages from './BoardCommandBar.messages';
import styles from './BoardCommandBar.module.css';

const PhoneGridSize = {
  portrait: {
    small: {
      columns: 2,
      rows: 2,
    },
    medium: {
      columns: 3,
      rows: 4,
    },
    large: {
      columns: 4,
      rows: 4,
    },
  },
  landscape: {
    small: {
      columns: 2,
      rows: 2,
    },
    medium: {
      columns: 4,
      rows: 2,
    },
    large: {
      columns: 6,
      rows: 3,
    },
  },
};

const TabletGridSize = {
  portrait: {
    small: {
      columns: 2,
      rows: 2,
    },
    medium: {
      columns: 3,
      rows: 4,
    },
    large: {
      columns: 4,
      rows: 6,
    },
  },
  landscape: {
    small: {
      columns: 2,
      rows: 2,
    },
    medium: {
      columns: 4,
      rows: 3,
    },
    large: {
      columns: 6,
      rows: 4,
    },
  },
};

function createGridMenuProps(device, orientation, onGridSizeChange, intl) {
  const { small, medium, large } = device[orientation] || {};

  return {
    items: [
      {
        key: 'small',
        text: `${intl.formatMessage(messages.small)} ${
          small.columns * small.rows
        }`,
        onClick: () => {
          onGridSizeChange({ columns: small.columns, rows: small.rows });
        },
      },
      {
        key: 'medium',
        text: `${intl.formatMessage(messages.medium)} ${
          medium.columns * medium.rows
        }`,
        onClick: () => {
          onGridSizeChange({ columns: medium.columns, rows: medium.rows });
        },
      },
      {
        key: 'large',
        text: `${intl.formatMessage(messages.large)} ${
          large.columns * large.rows
        }`,
        onClick: () => {
          onGridSizeChange({ columns: large.columns, rows: large.rows });
        },
      },
    ],
  };
}

function BoardCommandBar(props) {
  const {
    className,
    isBoardActive,
    isBoardSelected,
    onImportFileClick,
    onExportFileClick,
    onDetailsClick,
    onPrintClick,
    onShareClick,
    onNewBoardClick,
    onDeleteBoardClick,
    onGridSizeChange,
  } = props;

  const intl = useIntl();
  const { isPhone, isSmallScreen, portrait, landscape } = useMediaQuery();

  const rootClassName = clsx(className, styles.root);
  const buttonStyles = {
    root: {},
    rootHovered: {},
  };

  const newItem = {
    buttonStyles,
    key: 'new',
    text: intl.formatMessage(messages.new),
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      items: [
        {
          key: 'board',
          text: intl.formatMessage(messages.board),
          iconProps: { iconName: '' },
          onClick: onNewBoardClick,
        },
        {
          key: 'tile',
          text: intl.formatMessage(messages.tile),
          iconProps: { iconName: '' },
        },
      ],
    },
  };

  const importFileItem = {
    buttonStyles,
    key: 'import-file',
    text: intl.formatMessage(messages.importFile),
    iconProps: { iconName: 'OpenFile' },
    onClick: onImportFileClick,
  };

  const deleteItem = {
    buttonStyles,
    key: 'delete',
    text: intl.formatMessage(messages.delete),
    iconProps: { iconName: 'Delete' },
    onClick: onDeleteBoardClick,
  };
  console.log('isPhone :>> ', isPhone);
  const gridMenuProps = createGridMenuProps(
    isPhone ? PhoneGridSize : TabletGridSize,
    (landscape && 'landscape') || (portrait && 'portrait') || 'portrait',
    onGridSizeChange,
    intl
  );

  const gridItem = {
    buttonStyles,
    key: 'grid',
    text: intl.formatMessage(messages.grid),
    iconProps: { iconName: 'GridViewMedium' },
    subMenuProps: gridMenuProps,
    // onClick: onGridClick,
  };

  const activeBoardItems = [
    {
      buttonStyles,
      key: 'print',
      text: intl.formatMessage(messages.print),
      iconProps: { iconName: 'Print' },
      onClick: onPrintClick,
    },
    {
      buttonStyles,
      key: 'share',
      text: intl.formatMessage(messages.share),
      iconProps: { iconName: 'Share' },
      onClick: onShareClick,
    },
    gridItem,
  ];

  const selectedBoardItems = [deleteItem];

  const items = [
    // panelToggleItem,
    newItem,
    ...(isBoardSelected ? selectedBoardItems : []),
    ...(!isSmallScreen && isBoardActive ? activeBoardItems : []),
  ];

  const overflowItems = [
    ...(isSmallScreen && isBoardActive ? activeBoardItems : []),
    { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
    {
      buttonStyles,
      key: 'info',
      text: intl.formatMessage(messages.info),
      iconProps: { iconName: 'Info' },
      onClick: onDetailsClick,
    },
    importFileItem,
    {
      buttonStyles,
      key: 'export-file',
      text: intl.formatMessage(messages.exportFile),
      iconProps: { iconName: 'Download' },
      onClick: onExportFileClick,
    },
  ];

  const farItems = [];

  return (
    <CommandBar
      className={rootClassName}
      styles={{
        root: {
          padding: '0',
        },
      }}
      overflowButtonProps={{ styles: buttonStyles }}
      items={items}
      farItems={farItems}
      overflowItems={overflowItems}
      ariaLabel="Use left and right arrow keys to navigate between commands"
    />
  );
}

BoardCommandBar.propTypes = {
  /**
   * React children
   *
   * @ignore
   */
  children: PropTypes.node,
};

export default BoardCommandBar;
