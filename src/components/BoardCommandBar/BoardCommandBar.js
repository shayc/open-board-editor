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
    key: 'new-board',
    text: intl.formatMessage(messages.newBoard),
    onClick: onNewBoardClick,
    onRender: (item) => {
      return (
        <div className={styles.newBoardButtonContainer}>
          <DefaultButton data-is-focusable primary onClick={item.onClick}>
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
