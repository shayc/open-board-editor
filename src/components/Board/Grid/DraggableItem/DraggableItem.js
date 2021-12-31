import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDraggable } from '@dnd-kit/core';

import styles from './DraggableItem.module.css';

function DraggableItem(props) {
  const {
    children,
    className: classNameProp,
    disabled,
    id,
    data,
    ...other
  } = props;

  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id,
    disabled,
    data,
  });

  const className = clsx(styles.root, classNameProp, {
    [styles.isDragging]: isDragging,
    [styles.isDisabled]: disabled,
  });

  return (
    <div
      disabled
      className={className}
      ref={setNodeRef}
      {...other}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

DraggableItem.propTypes = {
  /**
   * If `true` draggable is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Unique identifier
   * No other draggable elements can share that same identifier within a given DndContext provider.
   */
  id: PropTypes.string.isRequired,
};

export default DraggableItem;
