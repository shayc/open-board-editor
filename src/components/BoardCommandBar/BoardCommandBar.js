import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import {
  CommandBar,
  ContextualMenuItemType,
  DefaultButton,
  getRTL,
} from '@fluentui/react';

import messages from './BoardCommandBar.messages';
import styles from './BoardCommandBar.module.css';

function BoardCommandBar(props) {
  const {
    className,
    isBoardActive,
    isBoardSelected,
    isPanelOpen,
    isSmallScreen,
    onPanelToggleClick,
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

  const isRTL = getRTL();
  const closePaneIconName = isRTL ? 'OpenPaneMirrored' : 'ClosePaneMirrored';
  const openPaneIconName = isRTL ? 'ClosePaneMirrored' : 'OpenPaneMirrored';

  const rootClassName = clsx(className, styles.root);
  const buttonStyles = {
    root: {
      background: 'var(--neutralLighterAlt)',
    },
    rootHovered: {
      background: 'var(--neutralLight)',
    },
  };

  const panelToggleItem = {
    buttonStyles,
    key: 'panel-toggle',
    title: isPanelOpen
      ? intl.formatMessage(messages.hideBoardsPanel)
      : intl.formatMessage(messages.showBoardsPanel),
    iconOnly: true,
    iconProps: {
      iconName: isPanelOpen ? closePaneIconName : openPaneIconName,
    },
    onClick: onPanelToggleClick,
  };

  const newBoardItem = {
    buttonStyles,
    key: 'new',
    text: intl.formatMessage(messages.newBoard),
    menuProps: {
      items: [
        {
          key: 'board',
          text: 'New board',
          iconProps: { iconName: '' },
        },
        {
          key: 'tile',
          text: 'New tile',
          iconProps: { iconName: '' },
        },
      ],
    },
    onClick: onNewBoardClick,
    onRender: (item) => {
      return (
        <div className={styles.newBoardButtonContainer}>
          <DefaultButton
            data-is-focusable
            primary
            split
            splitButtonAriaLabel="See 2 options"
            aria-roledescription="split button"
            {...item}
          >
            {item.text}
          </DefaultButton>
        </div>
      );
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

  const gridMenuProps = {
    items: [
      {
        key: 'small',
        text: `${intl.formatMessage(messages.small)} 4`,
        onClick: () => {
          onGridSizeChange({ columns: 2, rows: 2 });
        },
      },
      {
        key: 'medium',
        text: `${intl.formatMessage(messages.medium)} 12`,
        onClick: () => {
          onGridSizeChange({ columns: 3, rows: 4 });
        },
      },
      {
        key: 'large',
        text: `${intl.formatMessage(messages.large)} 24`,
        onClick: () => {
          onGridSizeChange({ columns: 6, rows: 4 });
        },
      },
      {
        key: 'x-large',
        text: `${intl.formatMessage(messages.extraLarge)} 60`,
        onClick: () => {
          onGridSizeChange({ columns: 10, rows: 6 });
        },
      },
    ],
  };

  const gridItem = {
    buttonStyles,
    key: 'grid',
    text: intl.formatMessage(messages.grid),
    iconProps: { iconName: 'GridViewMedium' },
    subMenuProps: gridMenuProps,
    // onClick: onGridClick,
  };

  const activeBoardItems = [
    gridItem,
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
  ];

  const selectedBoardItems = [deleteItem];

  const items = [
    panelToggleItem,
    newBoardItem,
    ...(isBoardSelected ? selectedBoardItems : []),
    ...(!isSmallScreen && isBoardActive ? activeBoardItems : []),
  ];

  const overflowItems = [
    ...(isSmallScreen && isBoardActive ? activeBoardItems : []),
    { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
    {
      buttonStyles,
      key: 'info',
      text: intl.formatMessage(messages.details),
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
          background: 'var(--neutralLighterAlt)',
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
