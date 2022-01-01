import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getContrastColor } from 'hex-a11y';

import styles from './Tile.module.css';

function Tile(props) {
  const {
    backgroundColor,
    borderColor,
    children,
    className,
    component: ComponentProp = 'button',
    onClick,
    style,
    variant = 'button',
    ...other
  } = props;

  const tileProps = {};
  if (ComponentProp === 'button') {
    tileProps.type = 'button';
  }

  const isFolder = variant === 'folder';

  const tileClassName = clsx(styles.root, className, {
    [styles.isFolder]: isFolder,
  });

  const tileStyle = {
    ...style,
    '--background-color': backgroundColor,
    '--border-color': borderColor,
  };

  if (CSS.supports('not (color: color-contrast(red vs black, white))')) {
    tileStyle.color = backgroundColor ? getContrastColor(backgroundColor) : '';
  }

  return (
    <ComponentProp
      className={tileClassName}
      style={tileStyle}
      onClick={onClick}
      {...tileProps}
      {...other}
    >
      {children}
    </ComponentProp>
  );
}

Tile.propTypes = {
  /**
   * Background color
   */
  backgroundColor: PropTypes.string,
  /**
   * Border color
   */
  borderColor: PropTypes.string,
  /**
   * Component to render
   */
  component: PropTypes.elementType,
  /**
   * Tile variant
   */
  variant: PropTypes.oneOf(['button', 'folder']),
};

export default Tile;
