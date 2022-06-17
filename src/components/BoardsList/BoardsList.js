import React, { useRef, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  DetailsRow,
  DetailsRowFields,
  DetailsList,
  SelectionMode,
  Icon,
  Text,
  CheckboxVisibility,
  Stack,
  Selection,
  IconButton,
} from '@fluentui/react';
import Highlighter from 'react-highlight-words';

import useFuzzySearch from './useFuzzySearch';
import BoardsListHeader from './BoardsListHeader/BoardsListHeader';
import BoardsListFilterBox from './BoardsListFilterBox/BoardsListFilterBox';
import messages from './BoardsList.messages';
import styles from './BoardsList.module.css';

const nameKey = 'name';

const fuseOptions = {
  threshold: 0.6,
  includeMatches: true,
  minMatchCharLength: 1,
  shouldSort: true,
  keys: [nameKey],
};

const selectionZoneProps = {
  isSelectedOnFocus: false,
};

function BoardsList(props) {
  const {
    // activeId,
    className,
    boards,
    onActiveIdChange,
    onDeleteClick,
    onInfoClick,
    onRootIdChange,
    onSelectionChange,
    rootId,
  } = props;

  const intl = useIntl();

  const {
    matchedItems: filteredBoards,
    matchedWords: filteredWords,
    value: filterValue,
    onChange: onFilterChange,
  } = useFuzzySearch(boards, fuseOptions);

  const columns = [
    {
      key: 'name-column',
      fieldName: nameKey,
      minWidth: 154,
      maxWidth: 154,
    },
    {
      key: 'actions-column',
      minWidth: 34,
      onRender: renderActionsColumn,
    },
  ];

  const items = useMemo(() => {
    if (filterValue) {
      return filteredBoards;
    } else {
      return sortItems(boards, rootId);
    }
  }, [boards, rootId, filterValue, filteredBoards]);

  const selectionRef = useRef(
    new Selection({
      items,
      onSelectionChanged: () => {
        onSelectionChange(selectionRef.current);
      },
    })
  );

  const selectedCount = selectionRef.current.getSelectedCount();
  const isAllSelected = selectionRef.current.isAllSelected();

  const title = filterValue
    ? intl.formatMessage(messages.results)
    : intl.formatMessage(messages.boards);

  const titleWithCount = selectedCount ? `(${selectedCount}) ${title}` : title;

  const checkboxVisibility = selectedCount
    ? CheckboxVisibility.always
    : CheckboxVisibility.onHover;

  const rootClassName = clsx(className, styles.root);

  function handleToggleSelectAll() {
    selectionRef.current.toggleAllSelected();
  }

  function handleActiveItemChange(item, index, event) {
    if (selectedCount) {
      return;
    }

    if (item?.id) {
      onActiveIdChange?.(item.id);
    }
  }

  function renderRow(props) {
    const { item, ...other } = props;

    const isHome = item.id === rootId;

    const styles = {
      root: [
        {
          selectors: {
            '&:focus': {
              background: 'var(--themeLight)',
            },
          },
        },
      ],
    };

    return (
      <DetailsRow
        {...other}
        key={item.id}
        styles={styles}
        rowFieldsAs={renderRowFields}
        item={{
          ...item,
          name: (
            <Text styles={{ root: { lineHeight: '32px' } }}>
              {isHome && <Icon iconName="Home" />}{' '}
              <Highlighter
                autoEscape={true}
                searchWords={filteredWords}
                textToHighlight={item.name}
              />
            </Text>
          ),
        }}
      />
    );
  }

  function renderRowFields(props) {
    return (
      <div data-selection-disabled>
        <DetailsRowFields {...props} />
      </div>
    );
  }

  function renderActionsColumn(board) {
    const items = [
      {
        key: 'info',
        text: intl.formatMessage(messages.info),
        iconProps: { iconName: 'Info' },
        onClick: () => {
          onInfoClick(board.id);
        },
      },
      {
        key: 'setAsHomeBoard',
        text: intl.formatMessage(messages.setAsHomeBoard),
        iconProps: { iconName: 'Home' },
        disabled: board.id === rootId,
        onClick: () => {
          onRootIdChange(board.id);
        },
      },
      {
        key: 'delete',
        text: intl.formatMessage(messages.delete),
        iconProps: { iconName: 'Delete' },
        disabled: board.id === rootId,
        onClick: () => {
          onDeleteClick(board.id);
        },
      },
    ];

    function handleFocus(event) {
      event.stopPropagation();
    }

    return (
      <div className={styles.rowActions}>
        <IconButton
          iconProps={{ iconName: 'MoreVertical' }}
          menuIconProps={{ style: { display: 'none' } }}
          menuProps={{ items }}
          ariaLabel={intl.formatMessage(messages.moreActions)}
          title={intl.formatMessage(messages.moreActions)}
          onFocus={handleFocus}
        />
      </div>
    );
  }

  return (
    <div className={rootClassName}>
      <BoardsListFilterBox onChange={onFilterChange} value={filterValue} />

      <BoardsListHeader
        title={titleWithCount}
        isAllSelected={isAllSelected}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <div className={styles.container}>
        <DetailsList
          isHeaderVisible={false}
          columns={columns}
          items={items}
          selection={selectionRef.current}
          selectionMode={SelectionMode.multiple}
          selectionZoneProps={selectionZoneProps}
          checkboxCellClassName={styles.checkboxCell}
          checkboxVisibility={checkboxVisibility}
          checkButtonAriaLabel="Row checkbox"
          onActiveItemChanged={handleActiveItemChange}
          onRenderRow={renderRow}
        />
      </div>

      {filterValue && !filteredBoards.length && (
        <Stack>
          <Stack.Item align="center">
            <Text as="p" variant="large" block>
              <FormattedMessage {...messages.didntFindAnything} />
            </Text>
          </Stack.Item>
        </Stack>
      )}
    </div>
  );
}

BoardsList.propTypes = {
  /**
   * Active board Id
   */
  activeId: PropTypes.string,
  /**
   * Boards to render
   */
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Callback, fired when activeId changes
   */
  onActiveIdChange: PropTypes.func,
  /**
   * Callback, fired when delete button is clicked
   */
  onDeleteClick: PropTypes.func,
  /**
   * Callback, fired when info button is clicked
   */
  onInfoClick: PropTypes.func,
  /**
   * Callback, fired when rootId changes
   */
  onRootIdChange: PropTypes.func,
  /**
   *
   */
  onSelectionChange: PropTypes.func,
  /**
   * Root board Id
   */
  rootId: PropTypes.string,
};

function sortItems(items, rootId) {
  if (!rootId) {
    return items;
  }

  const root = items.find((item) => item.id === rootId);
  const others = items.filter((item) => item.id !== rootId);

  return [root, ...others];
}

export default React.memo(BoardsList);
