import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';

import styles from './DroppableCell.module.css';

function Droppable(props) {
  const { className, id, disabled, data, ...other } = props;

  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled,
    data,
  });

  const cellClassName = clsx(styles.root, className, {
    [styles.isOver]: isOver,
  });

  return (
    <div className={cellClassName} ref={setNodeRef} {...other}>
      {props.children}
    </div>
  );
}

Droppable.propTypes = {
  /**
   * If `true` droppable is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Unique identifier
   * No other droppable elements can share that same identifier within a given DndContext provider.
   */
  id: PropTypes.string.isRequired,
};

export default Droppable;
