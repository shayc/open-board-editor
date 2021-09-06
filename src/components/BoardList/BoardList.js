import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  DetailsRow,
  DetailsRowFields,
  DetailsList,
  SelectionMode,
  SearchBox,
  IconButton,
  Icon,
  Text,
  CheckboxVisibility,
  Stack,
  Selection,
} from '@fluentui/react';
import Highlighter from 'react-highlight-words';

import useFuzzySearch from './useFuzzySearch';
import BoardListHeader from './BoardListHeader/BoardListHeader';
import messages from './BoardList.messages';
import styles from './BoardList.module.css';

function BoardList(props) {
  const {
    activeId,
    className,
    items,
    onActiveIdChange,
    onDeleteClick,
    onDetailsClick,
    onRootIdChange,
    rootId,
    selection,
  } = props;

  const intl = useIntl();

  const { matchedItems, searchText, onSearchChange } = useFuzzySearch(items, {
    threshold: 0.6,
    includeMatches: true,
    minMatchCharLength: 1,
    shouldSort: true,
    keys: ['name'],
  });

  const columns = [
    {
      key: 'board',
      fieldName: 'name',
    },
    {
      key: 'actions',
      minWidth: 34,
      onRender: renderRowActions,
    },
  ];

  const sortedItems = searchText.length
    ? matchedItems.items
    : sortItems(items, rootId);

  const selectionZoneProps = {
    isSelectedOnFocus: false,
  };

  const selectedCount = selection?.getSelectedCount();
  const isAllSelected = selection?.isAllSelected();
  const selectionMode = selection ? SelectionMode.multiple : SelectionMode.none;

  const checkboxVisibility = selectedCount
    ? CheckboxVisibility.always
    : CheckboxVisibility.onHover;

  const rootClassName = clsx(className, styles.root);

  function handleToggleSelectAll() {
    selection?.toggleAllSelected();
  }

  function handleActiveItemChange(item, index, event) {
    if (selection.getSelectedCount() > 0) {
      return;
    }

    if (item?.id) {
      onActiveIdChange?.(item.id);
    }
  }

  function handleSearchChange(event, text) {
    onSearchChange(text);
  }

  function renderRowActions(item) {
    const items = [
      {
        key: 'setAsHomeBoard',
        text: intl.formatMessage(messages.setAsHomeBoard),
        iconProps: { iconName: 'Home' },
        onClick: () => {
          onRootIdChange(item.id);
        },
      },
      {
        key: 'info',
        text: intl.formatMessage(messages.boardInfo),
        iconProps: { iconName: 'Info' },
        onClick: () => {
          onDetailsClick(item.id);
        },
      },
      {
        key: 'delete',
        text: intl.formatMessage(messages.deleteBoard),
        iconProps: { iconName: 'Delete' },
        onClick: () => {
          onDeleteClick(item.id);
        },
      },
    ];

    function handleFocus(event) {
      event.stopPropagation();
    }

    return (
      <div className={styles.rowActions}>
        <IconButton
          iconProps={{ iconName: 'More' }}
          menuIconProps={{ style: { display: 'none' } }}
          menuProps={{ items }}
          ariaLabel={intl.formatMessage(messages.moreActions)}
          title={intl.formatMessage(messages.moreActions)}
          onFocus={handleFocus}
        />
      </div>
    );
  }

  function renderRowFields(props) {
    return (
      <div data-selection-disabled>
        <DetailsRowFields {...props} />
      </div>
    );
  }

  function renderRow(props) {
    const { item, ...other } = props;

    const isActive = item.id === activeId;
    const isRoot = item.id === rootId;

    const className = clsx(styles.row, {
      [styles.isActiveRow]: isActive,
    });

    return (
      <DetailsRow
        {...other}
        className={className}
        rowFieldsAs={renderRowFields}
        item={{
          ...item,
          name: (
            <Text>
              <Highlighter
                autoEscape={true}
                searchWords={matchedItems.searchWords}
                textToHighlight={item.name}
              />
              {isRoot && <Icon iconName="Home" />}
            </Text>
          ),
        }}
      />
    );
  }

  return (
    <div className={rootClassName}>
      <div className={styles.filterBar}>
        <SearchBox
          className={styles.searchBox}
          placeholder={intl.formatMessage(messages.filter)}
          iconProps={{ iconName: 'Filter' }}
          onChange={handleSearchChange}
          value={searchText}
        />
      </div>

      <BoardListHeader
        onToggleSelectAll={handleToggleSelectAll}
        isAllSelected={isAllSelected}
        selectedCount={selectedCount}
        title={
          searchText.length
            ? intl.formatMessage(messages.results)
            : intl.formatMessage(messages.boards)
        }
      />

      <div className={styles.container}>
        <DetailsList
          columns={columns}
          items={sortedItems}
          selection={selection}
          selectionZoneProps={selectionZoneProps}
          selectionMode={selectionMode}
          checkboxCellClassName={styles.checkboxCell}
          checkboxVisibility={checkboxVisibility}
          checkButtonAriaLabel="Row checkbox"
          onActiveItemChanged={handleActiveItemChange}
          onRenderRow={renderRow}
          isHeaderVisible={false}
        />
      </div>

      {Boolean(searchText.length) && !matchedItems.items.length && (
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

BoardList.propTypes = {
  /**
   * Active item Id
   */
  activeId: PropTypes.string,
  /**
   * Items to render
   */
  items: PropTypes.arrayOf(
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
   * Callback, fired when clicking on delete button
   */
  onDeleteClick: PropTypes.func,
  /**
   * Callback, fired when clicking on details button
   */
  onDetailsClick: PropTypes.func,
  /**
   * Callback, fired when rootId changes
   */
  onRootIdChange: PropTypes.func,
  /**
   * Root item Id
   */
  rootId: PropTypes.string,
  /**
   * A store that maintains the selection state of items.
   * https://developer.microsoft.com/en-us/fluentui#/controls/web/selection
   */
  selection: PropTypes.instanceOf(Selection),
};

function sortItems(items, rootId) {
  const sortedItems = items.sort((a, b) => a.name?.localeCompare(b.name));
  const rootItemIndex = items.findIndex((item) => item.id === rootId);

  if (rootItemIndex > 0) {
    const rootItem = sortedItems.splice(rootItemIndex, 1)[0];
    sortedItems.unshift(rootItem);
  }

  return sortedItems;
}

export default React.memo(BoardList);
