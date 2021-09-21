import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  DetailsRow,
  DetailsRowFields,
  DetailsList,
  SelectionMode,
  SearchBox,
  Icon,
  Text,
  CheckboxVisibility,
  Stack,
  Selection,
} from '@fluentui/react';
import { useForceUpdate } from '@fluentui/react-hooks';

import Highlighter from 'react-highlight-words';

import useFuzzySearch from './useFuzzySearch';
import BoardListHeader from './BoardListHeader/BoardListHeader';
import messages from './BoardList.messages';
import styles from './BoardList.module.css';

const boardNameField = 'name';

const columns = [
  {
    key: '1',
    fieldName: boardNameField,
  },
];

const selectionZoneProps = {
  isSelectedOnFocus: false,
};

function BoardList(props) {
  const {
    activeId,
    className,
    items,
    onActiveIdChange,
    onSelectionChange,
    rootId,
  } = props;

  const intl = useIntl();

  const { matchedItems, searchWords, searchText, onSearchChange } =
    useFuzzySearch(items, {
      threshold: 0.6,
      includeMatches: true,
      minMatchCharLength: 1,
      shouldSort: true,
      keys: [boardNameField],
    });

  const boardList = searchText.length > 0 ? matchedItems : items;

  const forceUpdate = useForceUpdate();

  const { current: selection } = useRef(
    new Selection({
      onSelectionChanged: () => {
        onSelectionChange(selection.getSelection());
        forceUpdate();
      },
      items,
    })
  );

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
    if (selectedCount) {
      return;
    }

    if (item?.id) {
      onActiveIdChange?.(item.id);
    }
  }

  function handleSearchChange(event, text) {
    onSearchChange(text);
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

    return (
      <DetailsRow
        {...other}
        rowFieldsAs={renderRowFields}
        item={{
          ...item,
          name: (
            <Text className={styles.rowText}>
              {searchWords.length ? (
                <Highlighter
                  autoEscape={true}
                  searchWords={searchWords}
                  textToHighlight={item.name}
                />
              ) : (
                item.name
              )}

              {item.id === rootId && <Icon iconName="Home" />}
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
          searchText
            ? intl.formatMessage(messages.results)
            : intl.formatMessage(messages.boards)
        }
      />

      <div className={styles.container}>
        <DetailsList
          columns={columns}
          items={boardList}
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

      {Boolean(searchText.length) && !matchedItems.length && (
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
   * Root item Id
   */
  rootId: PropTypes.string,
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
