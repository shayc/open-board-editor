import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Check,
  DetailsRow,
  DetailsRowFields,
  DetailsList,
  SelectionMode,
  SearchBox,
  Icon,
  IconButton,
  Text,
  CheckboxVisibility,
  Stack,
  Selection,
} from '@fluentui/react';
import Highlighter from 'react-highlight-words';
import Fuse from 'fuse.js';

import messages from './BoardList.messages';
import styles from './BoardList.module.css';

function BoardList(props) {
  const {
    activeId: activeIdProp,
    className,
    items,
    onActiveIdChange,
    onDeleteClick,
    onDetailsClick,
    onSetAsHomeClick,
    rootId,
    selection,
  } = props;

  const intl = useIntl();
  const [activeId, setActiveId] = useState(activeIdProp);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (activeIdProp) {
      setActiveId(activeIdProp);
    }
  }, [activeIdProp]);

  const fuse = useMemo(() => {
    const options = {
      threshold: 0.6,
      includeMatches: true,
      minMatchCharLength: 1,
      shouldSort: true,
      keys: ['name'],
    };

    return new Fuse(items, options);
  }, [items]);

  const filtered = useMemo(() => {
    function filterItems(text) {
      const results = fuse.search(text);

      const matches = results
        .map((res) => {
          return res.matches;
        })
        .flat();

      const words = matches
        .map((match) => {
          return match.indices.map(([start, end]) => {
            return match.value.slice(start, end + 1);
          });
        })
        .flat();

      const items = results.map((res) => res.item);

      return { items, words };
    }

    return filterItems(filterText);
  }, [fuse, filterText]);

  const sortedItems = filterText.length
    ? filtered.items
    : sortItems(items, rootId);

  const selectedCount = selection?.getSelectedCount();
  const isAnySelected = Boolean(selectedCount);

  const checkboxVisibility = isAnySelected
    ? CheckboxVisibility.always
    : CheckboxVisibility.onHover;

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

  const rootClassName = clsx(className, styles.root);

  function handleFilterTextChange(event, text = '') {
    setFilterText(text);
  }

  function handleToggleSelectAll() {
    selection?.toggleAllSelected();
  }

  function handleActiveItemChange(item, index, event) {
    const targetRole = event.target.getAttribute('role');

    if (targetRole === 'checkbox' && selection.getSelectedCount()) {
      return;
    }

    if (item?.id) {
      setActiveId(item.id);
      onActiveIdChange?.(item.id);
    }
  }

  function renderRowActions(item) {
    const items = [
      {
        key: 'setAsHomeBoard',
        text: intl.formatMessage(messages.setAsHomeBoard),
        iconProps: { iconName: 'Home' },
        onClick: () => {
          onSetAsHomeClick(item.id);
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
          menuProps={{
            items,
            directionalHintFixed: true,
          }}
          ariaLabel={intl.formatMessage(messages.moreActions)}
          title={intl.formatMessage(messages.moreActions)}
          onFocus={handleFocus}
        />
      </div>
    );
  }

  function renderRowFields(props) {
    return (
      <span data-selection-disabled={true}>
        <DetailsRowFields {...props} />
      </span>
    );
  }

  function renderRow(props) {
    const { item, ...other } = props;
    const isRoot = item.id === rootId;
    const isActive = activeId === item.id;

    const className = clsx(styles.row, {
      [styles.isActiveRow]: isActive,
    });

    return (
      <DetailsRow
        className={className}
        styles={{
          root: [
            {
              background: isActive
                ? 'var(--themeLight)'
                : 'var(--neutralLighterAlt)',
              borderBottom: `1px solid var(--neutralLighter)`,
              selectors: {
                '&:hover': {
                  background: isActive ? 'var(--themeLight)' : 'var(--white)',
                },
                '&:focus, &:focus:hover, &.is-selected': {
                  background: 'var(--themeLight)',
                },
              },
            },
          ],
        }}
        {...other}
        rowFieldsAs={renderRowFields}
        item={{
          ...item,
          name: (
            <Text
              variant="medium"
              style={{
                lineHeight: '32px',
              }}
            >
              <Highlighter
                autoEscape={true}
                searchWords={filtered.words}
                textToHighlight={item.name}
              />{' '}
              {isRoot && <Icon iconName={'Home'} />}
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
          styles={{
            root: {
              border: '1px solid var(--neutralLight)',
              '&:hover': {
                border: '1px solid var(--neutralQuaternary)',
              },
            },
          }}
          className={styles.searchBox}
          placeholder={intl.formatMessage(messages.filter)}
          iconProps={{ iconName: 'Filter' }}
          onChange={handleFilterTextChange}
          value={filterText}
        />
      </div>

      <div className={styles.header}>
        {selection && (
          <button
            className={styles.selectAllButton}
            onClick={handleToggleSelectAll}
            title={intl.formatMessage(messages.selectAllBoards)}
          >
            <Check
              styles={{
                check: {
                  opacity: 1,
                },
              }}
              checked={selection?.isAllSelected()}
            />
          </button>
        )}

        <div className={styles.title}>
          <Text as="span" variant="large">
            {`${selectedCount ? `(${selectedCount})` : ''} `}

            {filterText.length
              ? intl.formatMessage(messages.results)
              : intl.formatMessage(messages.boards)}
          </Text>
        </div>
      </div>

      <div className={styles.container}>
        <DetailsList
          columns={columns}
          items={sortedItems}
          selection={selection}
          selectionZoneProps={{
            isSelectedOnFocus: false,
          }}
          selectionMode={
            selection ? SelectionMode.multiple : SelectionMode.none
          }
          isHeaderVisible={false}
          checkboxCellClassName={styles.checkboxCell}
          checkboxVisibility={checkboxVisibility}
          checkButtonAriaLabel="Row checkbox"
          onActiveItemChanged={handleActiveItemChange}
          onRenderRow={renderRow}
        />
      </div>

      {Boolean(filterText.length) && !filtered.items.length && (
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
   * Callback, fired when clicking on set as home button
   */
  onSetAsHomeClick: PropTypes.func,
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
