import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import {
  CommandBar,
  ContextualMenuItemType,
  SwatchColorPicker,
} from '@fluentui/react';

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
      ...(large
        ? [
            {
              key: 'large',
              text: `${intl.formatMessage(messages.large)} ${
                large.columns * large.rows
              }`,
              onClick: () => {
                onGridSizeChange({ columns: large.columns, rows: large.rows });
              },
            },
          ]
        : []),
    ],
  };
}

function BoardCommandBar(props) {
  const {
    className,
    commandContext,
    colors,
    onImportFileClick,
    onExportFileClick,
    onDetailsClick,
    onPrintClick,
    onShareClick,
    onNewBoardClick,
    onDeleteButtonClick,
    onDeleteBoardClick,
    onGridSizeChange,
    onColorClick,
  } = props;

  const rootClassName = clsx(className, styles.root);

  const commands = useCommands(
    commandContext,
    {
      onImportFileClick,
      onExportFileClick,
      onDetailsClick,
      onPrintClick,
      onShareClick,
      onNewBoardClick,
      onDeleteButtonClick,
      onDeleteBoardClick,
      onGridSizeChange,
      onColorClick,
    },
    colors
  );

  const commandBarStyles = {
    root: {
      padding: '0',
    },
  };

  return (
    <CommandBar
      className={rootClassName}
      styles={commandBarStyles}
      items={commands.items}
      farItems={commands.farItems}
      overflowItems={commands.overflowItems}
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
  commandContext: PropTypes.oneOf([
    'board-active',
    'board-selected',
    'button-selected',
  ]),
};

export default BoardCommandBar;

function useCommands(commandContext, handlers, colors) {
  const intl = useIntl();
  const { isPhone, portrait, landscape } = useMediaQuery();

  const items = {
    print: {
      key: 'print',
      text: intl.formatMessage(messages.print),
      iconProps: { iconName: 'Print' },
      onClick: handlers.onPrintClick,
    },

    share: {
      key: 'share',
      text: intl.formatMessage(messages.share),
      iconProps: { iconName: 'Share' },
      onClick: handlers.onShareClick,
    },

    importFile: {
      key: 'import-file',
      text: intl.formatMessage(messages.importFile),
      iconProps: { iconName: 'OpenFile' },
      onClick: handlers.onImportFileClick,
    },

    exportFile: {
      key: 'export-file',
      text: intl.formatMessage(messages.exportFile),
      iconProps: { iconName: 'Download' },
      onClick: handlers.onExportFileClick,
    },

    new: {
      key: 'new',
      text: intl.formatMessage(messages.new),
      iconProps: { iconName: 'Add' },
      subMenuProps: {
        items: [
          {
            key: 'board',
            text: intl.formatMessage(messages.board),
            iconProps: { iconName: '' },
            onClick: handlers.onNewBoardClick,
          },
          {
            key: 'tile',
            text: intl.formatMessage(messages.tile),
            iconProps: { iconName: '' },
            onClick: handlers.onNewTileClick,
          },
        ],
      },
    },

    deleteButton: {
      key: 'deleteButton',
      text: intl.formatMessage(messages.delete),
      iconProps: { iconName: 'Delete' },
      onClick: handlers.onDeleteButtonClick,
    },

    color: {
      key: 'color',
      text: 'Color',
      iconProps: { iconName: 'Color' },
      subMenuProps: {
        items: [
          {
            key: 'colors',
            text: intl.formatMessage(messages.board),
            iconProps: { iconName: '' },
            onClick: handlers.onNewBoardClick,
            colors,
            onRender: (item) => {
              return (
                <SwatchColorPicker
                  columnCount={5}
                  cellShape={'circle'}
                  colorCells={item.colors}
                  cellWidth={32}
                  cellHeight={32}
                  onChange={(event, id, color) => {
                    handlers.onColorClick(color);
                  }}
                />
              );
            },
          },
        ],
      },
      onClick: handlers.onColorClick,
    },

    deleteBoard: {
      key: 'deleteBoard',
      text: intl.formatMessage(messages.delete),
      iconProps: { iconName: 'Delete' },
      onClick: handlers.onDeleteBoardClick,
    },

    grid: {
      key: 'grid',
      text: intl.formatMessage(messages.grid),
      iconProps: { iconName: 'GridViewMedium' },
      subMenuProps: createGridMenuProps(
        isPhone ? PhoneGridSize : TabletGridSize,
        (landscape && 'landscape') || (portrait && 'portrait') || 'portrait',
        handlers.onGridSizeChange,
        intl
      ),
    },

    info: {
      key: 'info',
      text: intl.formatMessage(messages.info),
      iconProps: { iconName: 'Info' },
      onClick: handlers.onDetailsClick,
    },

    divider: { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
  };

  const defaultCommands = {
    items: [items.new],
    overflowItems: [items.importFile, items.exportFile],
    farItems: [],
  };

  const boardActiveCommands = {
    items: [items.new, items.grid, items.print, items.share],
    overflowItems: [
      items.info,
      items.divider,
      items.importFile,
      items.exportFile,
    ],
    farItems: [],
  };

  const boardSelectedCommands = {
    items: [items.deleteBoard, items.grid],
    overflowItems: [],
    farItems: [],
  };

  const buttonSelectedCommands = {
    items: [items.deleteButton, items.color],
    overflowItems: [],
    farItems: [],
  };

  switch (commandContext) {
    case 'button-selected': {
      return buttonSelectedCommands;
    }
    case 'board-selected': {
      return boardSelectedCommands;
    }
    case 'board-active': {
      return boardActiveCommands;
    }
    default: {
      return defaultCommands;
    }
  }
}
