import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements,
  Text,
  MarqueeSelection,
  SelectionZone,
} from '@fluentui/react';

import * as OBF from '../../open-board-format';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Bar from './Bar';
import Grid from './Grid';
import AbsolutePosition from './AbsolutePosition';
import styles from './Board.module.css';

function Board(props) {
  const {
    barEnd,
    barStart,
    buttons,
    className,
    draggable,
    gap,
    grid,
    title,
    onButtonPositionChange,
    onDragEnd,
    onDragStart,
    onShouldStartSelection,
    renderButton,
    renderButtonPlaceholder,
    scrollSnap,
    scrollDirection,
    selection,
    ...other
  } = props;

  const { isSmallScreen, landscape, portrait } = useMediaQuery();

  const rootClassName = clsx(styles.root, className);

  const shouldRenderAbsolutePosition =
    OBF.shouldButtonsPositionedAbsolute(buttons);

  const shouldRenderGrid = Boolean(
    !shouldRenderAbsolutePosition && grid?.columns && grid?.rows
  );

  const boardTitle = (
    <Text className={styles.title} variant="large" nowrap={true}>
      {title}
    </Text>
  );

  // TODO: refactor this logic elsewhere
  const gridOrientation =
    grid?.columns / grid?.rows > 1 ? 'landscape' : 'portrait';

  const adaptiveGrid = (((landscape && gridOrientation === 'landscape') ||
    (portrait && gridOrientation === 'portrait')) &&
    grid) || {
    ...grid,
    columns: grid?.rows,
    rows: grid?.columns,
  };

  function renderWithSelection(children) {
    return selection ? (
      <MarqueeSelection
        className={styles.selectionZone}
        selection={selection}
        isEnabled={true}
        isDraggingConstrainedToRoot={true}
        onShouldStartSelection={onShouldStartSelection}
      >
        <SelectionZone
          className={styles.selectionZone}
          selection={selection}
          selectionPreservedOnEmptyClick={false}
          isSelectedOnFocus={false}
        >
          {children}
        </SelectionZone>
      </MarqueeSelection>
    ) : (
      children
    );
  }

  return (
    <div className={rootClassName} {...other}>
      <Bar
        className={styles.nameBar}
        startGroup={!isSmallScreen && barStart}
        middleGroup={boardTitle}
        endGroup={!isSmallScreen && barEnd}
      />

      {renderWithSelection(
        <>
          {shouldRenderGrid && (
            <FocusZone
              className={styles.focusZone}
              direction={FocusZoneDirection.bidirectional}
              handleTabKey={FocusZoneTabbableElements.none}
            >
              <Grid
                columns={adaptiveGrid.columns}
                rows={adaptiveGrid.rows}
                order={grid.order}
                items={buttons}
                renderItem={renderButton}
                renderPlaceholder={renderButtonPlaceholder}
                draggable={draggable}
                gap={gap}
                scrollSnap={scrollSnap}
                scrollDirection={scrollDirection}
                onItemPositionChange={onButtonPositionChange}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            </FocusZone>
          )}

          {shouldRenderAbsolutePosition && (
            <AbsolutePosition items={buttons} renderItem={renderButton} />
          )}
        </>
      )}

      {isSmallScreen && (
        <Bar
          className={styles.bottomBar}
          startGroup={barStart}
          endGroup={barEnd}
        />
      )}
    </div>
  );
}

Board.propTypes = {
  /**
   * Slot for rendering.
   */
  barEnd: PropTypes.node,
  /**
   * Slot for rendering.
   */
  barStart: PropTypes.node,
  /**
   * Buttons to render.
   */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Button ID.
       */
      id: PropTypes.string.isRequired,
    })
  ),
  /**
   * If `true`, buttons can be dragged and dropped.
   */
  draggable: PropTypes.bool,
  /**
   * Gap between grid cells.
   */
  gap: PropTypes.string,
  /**
   * Grid props.
   */
  grid: PropTypes.shape({
    /**
     * Number of columns.
     */
    columns: PropTypes.number.isRequired,
    /**
     * Ordered button ID's.
     */
    order: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    /**
     * Number of rows.
     */
    rows: PropTypes.number.isRequired,
  }),
  /**
   * Title to render.
   */
  title: PropTypes.string,
  /**
   * Calback, fired when button changes position.
   */
  onButtonPositionChange: PropTypes.func,
  /**
   * Callback, fired when drag ends.
   */
  onDragEnd: PropTypes.func,
  /**
   * Callback, fired when drag starts.
   */
  onDragStart: PropTypes.func,
  /**
   * Button renderer.
   */
  renderButton: PropTypes.func.isRequired,
  /**
   * Button placeholder renderer.
   */
  renderButtonPlaceholder: PropTypes.func,
  /**
   * Scroll direction of grid pages.
   */
  scrollDirection: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, scrolling will snap to grid pages
   */
  scrollSnap: PropTypes.bool,
};

export default Board;
