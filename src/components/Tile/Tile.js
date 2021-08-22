import PropTypes from 'prop-types';
import clsx from 'clsx';

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
  const isntClickable = !onClick;

  const tileClassName = clsx(styles.root, className, {
    [styles.isFolder]: isFolder,
    [styles.isntClickable]: isntClickable,
  });

  const tileStyle = {
    ...style,
    backgroundColor,
    borderColor,
  };

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
