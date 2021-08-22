import { useState } from 'react';
import { FocusZone } from '@fluentui/react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ColorPicker.module.css';

function ColorPicker(props) {
  const { className, colors, onChange } = props;

  const [selectedId, setSelectedId] = useState('');
  const rootClassName = clsx(className, styles.root);

  function handleActiveElementChanged(element) {
    element.click();
  }

  return (
    <FocusZone
      className={rootClassName}
      onActiveElementChanged={handleActiveElementChanged}
    >
      {colors.map((color) => {
        const style = {
          '--background-color': color.backgroundColor,
          '--border-color': color.borderColor,
        };

        const buttonClassName = clsx(styles.button, {
          [styles.isSelected]: color.id === selectedId,
        });

        return (
          <button
            className={buttonClassName}
            style={style}
            onClick={() => {
              setSelectedId(color.id);
              onChange(color);
            }}
            key={color.id}
          ></button>
        );
      })}
    </FocusZone>
  );
}

ColorPicker.propTypes = {
  /**
   * Colors to select from
   */
  colors: PropTypes.array.isRequired,
  /**
   * Callback, fired when selected color changes
   */
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
