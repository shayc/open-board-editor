import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  FocusZone,
  FocusZoneDirection,
  FocusZoneTabbableElements,
} from '@fluentui/react';

import * as OBF from '../../open-board-format';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import NavText from '../NavText';
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
    name,
    onDragEnd,
    onDragStart,
    onButtonPositionChange,
    renderButton,
    renderButtonPlaceholder,
    scrollSnap,
    scrollDirection,
    ...other
  } = props;

  const { isSmallScreen } = useMediaQuery();

  const rootClassName = clsx(styles.root, className);

  const shouldRenderAbsolutePosition =
    OBF.shouldButtonsPositionedAbsolute(buttons);

  const shouldRenderGrid = Boolean(
    !shouldRenderAbsolutePosition && grid?.columns && grid?.rows
  );

  return (
    <div className={rootClassName} {...other}>
      <div className={styles.safeAreaInsetX}>
        <Bar
          startGroup={!isSmallScreen ? barStart : null}
          middleGroup={<NavText>{name}</NavText>}
          endGroup={!isSmallScreen ? barEnd : null}
        />
      </div>

      {shouldRenderGrid && (
        <FocusZone
          className={styles.focusZone}
          direction={FocusZoneDirection.bidirectional}
          handleTabKey={FocusZoneTabbableElements.none}
        >
          <Grid
            columns={grid.columns}
            rows={grid.rows}
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

      {isSmallScreen && (
        <Bar
          startGroup={isSmallScreen ? barStart : null}
          middleGroup={null}
          endGroup={isSmallScreen ? barEnd : null}
        />
      )}
    </div>
  );
}

Board.propTypes = {
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
