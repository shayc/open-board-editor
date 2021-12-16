import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { DragOverlay } from '@dnd-kit/core';

import {
  gridService,
  createMatrix,
} from '../../../open-board-format/board/grid/grid.service';
import DndProvider from './DndProvider';
import Row from './Row/Row';
import DroppableCell from './DroppableCell/DroppableCell';
import DraggableItem from './DraggableItem/DraggableItem';
import styles from './Grid.module.css';

function Grid(props) {
  const {
    className,
    columns,
    draggable,
    gap = '8px',
    items,
    onDragEnd,
    onDragStart,
    onItemPositionChange,
    order,
    renderItem,
    renderPlaceholder,
    rows,
    scrollDirection,
    scrollSnap,
    style,
    ...other
  } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [movingItem, setMovingItem] = useState(null);

  const pages = chunks(items, rows * columns);

  const gridPages = pages.length
    ? pages.map((pageItems) => {
        return (
          pageItems.length &&
          gridService.sortItems(pageItems, {
            columns,
            rows,
            order,
          })
        );
      })
    : [createMatrix(rows, columns)];

  const isScrollHorizontal = scrollDirection === 'horizontal';

  const rootStyle = {
    ...style,
    '--gap': gap,
    '--root-flex-direction': isScrollHorizontal ? 'row' : 'column',
    '--root-overflow': isScrollHorizontal ? 'auto hidden' : 'hidden auto',
    '--root-scroll-snap-type':
      scrollSnap && !isDragging ? 'both mandatory' : 'none',
    '--page-padding': scrollSnap ? gap : '0',
  };

  const rootClassName = clsx(styles.root, className);

  function handleDragStart(event) {
    const item = items.find(({ id }) => id === event.active.id);

    if (item) {
      setMovingItem(item);
      setIsDragging(true);
    }

    onDragStart?.(event);
  }

  function handleDragEnd(event) {
    const { over, active } = event;

    if (over) {
      const { position: from } = active.data.current;
      const { position: to } = over.data.current;

      onItemPositionChange?.(from, to);
    }

    setIsDragging(false);
    setMovingItem(null);
    onDragEnd?.(event);
  }

  return (
    <DndProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={rootClassName} style={rootStyle} {...other}>
        {gridPages.map((grid, pageIndex) => {
          let itemIndex = 0;

          return (
            <div className={styles.page} key={pageIndex}>
              {grid.map((row, rowIndex) => (
                <Row key={rowIndex}>
                  {row.map((item, columnIndex) => {
                    const position = { row: rowIndex, column: columnIndex };

                    return (
                      <DroppableCell
                        className={styles.cell}
                        key={columnIndex}
                        id={`${pageIndex},${rowIndex},${columnIndex}`}
                        data={{ position }}
                        disabled={!draggable}
                      >
                        <DraggableItem
                          id={item?.id || ''}
                          data={{ position }}
                          disabled={!item?.id || !draggable}
                        >
                          {item
                            ? renderItem?.(item, itemIndex++, position)
                            : renderPlaceholder?.(position)}
                        </DraggableItem>
                      </DroppableCell>
                    );
                  })}
                </Row>
              ))}
            </div>
          );
        })}
      </div>

      {createPortal(
        <DragOverlay dropAnimation={null}>
          {isDragging && (
            <div className={styles.dragOverlay}>{renderItem(movingItem)}</div>
          )}
        </DragOverlay>,
        document.body
      )}
    </DndProvider>
  );
}

Grid.propTypes = {
  /**
   * Number of columns.
   */
  columns: PropTypes.number.isRequired,
  /**
   * Gap between cells.
   */
  gap: PropTypes.string,
  /**
   * Items to render.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Item ID.
       */
      id: PropTypes.string.isRequired,
    })
  ),
  /**
   * Callback, fired when drag ends.
   */
  onDragEnd: PropTypes.func,
  /**
   * Callback, fired when drag starts.
   */
  onDragStart: PropTypes.func,
  /**
   * Callback, fired when item changes position.
   */
  onItemPositionChange: PropTypes.func,
  /**
   * Ordered item ID's.
   */
  order: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  /**
   * Item renderer.
   */
  renderItem: PropTypes.func.isRequired,
  /**
   * Number of rows.
   */
  rows: PropTypes.number.isRequired,
  /**
   * Scroll direction.
   */
  scrollDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, scroll will snap to pages.
   */
  scrollSnap: PropTypes.bool,
};

function chunks(array, size) {
  const newArray = [...array];
  const results = [];

  while (newArray.length) {
    results.push(newArray.splice(0, size));
  }

  return results;
}

export default React.memo(Grid);
