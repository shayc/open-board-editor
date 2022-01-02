import PropTypes from 'prop-types';
import clsx from 'clsx';
import { getContrastColor } from 'hex-a11y';

import styles from './Tile.module.css';

export const TileVariant = {
  Button: 'button',
  Folder: 'folder',
};

function Tile(props) {
  const {
    backgroundColor = '#fff',
    borderColor = 'transparent',
    children,
    className,
    component: ComponentProp = 'button',
    style,
    variant = TileVariant.Button,
    ...other
  } = props;

  const buttonProps = {
    ...(ComponentProp === 'button' ? { type: 'button' } : null),
  };

  const isFolder = variant === TileVariant.Folder;

  const tileClassName = clsx(styles.root, className, {
    [styles.isFolder]: isFolder,
  });

  const tileStyle = {
    ...style,
    '--background-color': backgroundColor,
    '--border-color': borderColor,
  };

  if (CSS.supports('not (color: color-contrast(red vs black, white))')) {
    tileStyle.color = getContrastColor(backgroundColor);
  }

  return (
    <ComponentProp
      className={tileClassName}
      style={tileStyle}
      {...buttonProps}
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
