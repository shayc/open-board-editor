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
    isPanelOpen,
    menuType,
    onPanelToggleClick,
    onOpenFileClick,
    onDownloadFileClick,
    onPrintClick,
    onShareClick,
    onNewBoardClick,
    onNewTileClick,
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

  const newBoardItem = {
    buttonStyles,
    key: 'new-board',
    text: intl.formatMessage(messages.newBoard),
    onClick: onNewBoardClick,
    onRender: (item) => {
      const className = clsx(styles.newBoardButtonContainer, {
        [styles.fixedWidth]: isPanelOpen && menuType !== 'selected-board',
      });

      return (
        <div className={className}>
          <DefaultButton
            data-is-focusable={true}
            primary={true}
            onClick={item.onClick}
          >
            {item.text}
          </DefaultButton>
        </div>
      );
    },
  };

  const openFileItem = {
    buttonStyles,
    key: 'open-file',
    text: intl.formatMessage(messages.openFile),
    iconProps: { iconName: 'OpenFile' },
    onClick: onOpenFileClick,
  };

  const deleteItem = {
    buttonStyles,
    key: 'delete',
    text: intl.formatMessage(messages.delete),
    disabled: false,
    iconProps: { iconName: 'Delete' },
  };

  const permanentItems = [
    {
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
    },
    newBoardItem,
  ];

  const defaultItems = [
    {
      buttonStyles,
      key: 'new-tile',
      text: intl.formatMessage(messages.newTile),
      iconProps: { iconName: 'Add' },
      onClick: onNewTileClick,
    },
  ];

  const selectedBoardItems = [
    {
      ...deleteItem,
      onClick: onDeleteBoardClick,
    },
  ];

  const noBoardSelectedItems = [openFileItem];

  let items = [...permanentItems];

  switch (menuType) {
    case 'selected-button': {
      items = [...items, ...defaultItems];
      break;
    }
    case 'selected-board': {
      items = [...items, ...selectedBoardItems];
      break;
    }
    case 'no-board-selected': {
      items = [...items, ...noBoardSelectedItems];
      break;
    }
    default: {
      items = [...items, ...defaultItems];
    }
  }

  const overflowItems = [
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
    { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
    openFileItem,
    {
      buttonStyles,
      key: 'downloadFile',
      text: intl.formatMessage(messages.downloadFile),
      iconProps: { iconName: 'Download' },
      onClick: onDownloadFileClick,
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
      overflowItems={menuType === 'no-board-selected' ? [] : overflowItems}
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
