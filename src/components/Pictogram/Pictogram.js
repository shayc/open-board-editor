import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Pictogram.module.css';

function Pictogram(props) {
  const {
    className,
    label,
    labelHidden,
    labelPosition = 'bottom',
    src,
    ...other
  } = props;

  const pictogramClassName = clsx(styles.root, className, {
    [styles.isColumnReversed]: labelPosition === 'top',
  });

  return (
    <div className={pictogramClassName} {...other}>
      {src && (
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={src}
            alt={labelHidden ? label : ''}
          />
        </div>
      )}

      {!labelHidden && (
        <div className={styles.label}>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

Pictogram.propTypes = {
  /**
   * Label to render.
   */
  label: PropTypes.string,
  /**
   * If `true`, label is hidden
   */
  labelHidden: PropTypes.bool,
  /**
   * Label position.
   */
  labelPosition: PropTypes.oneOf(['top', 'bottom']),
  /**
   * Image source.
   */
  src: PropTypes.string,
};

export default Pictogram;
