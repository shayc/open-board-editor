import { FocusZone } from '@fluentui/react';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ImagePicker.module.css';

function ImagePicker(props) {
  const { className, images, onChange } = props;
  const containerRef = useRef();
  const rootClassName = clsx(className, styles.root);

  useEffect(() => {
    containerRef.current.scrollLeft = 0;
  }, [images]);

  return (
    <FocusZone
      className={rootClassName}
      ref={containerRef}
      onActiveElementChanged={(button, event) => {
        button.click();
      }}
    >
      {images.map(
        (image) =>
          image && (
            <button
              className={styles.button}
              onClick={(event) => {
                onChange(image);
              }}
              type="button"
              key={image.id}
            >
              <img
                className={styles.image}
                src={image.data || image.url}
                alt={image.text}
              />
            </button>
          )
      )}
    </FocusZone>
  );
}

ImagePicker.propTypes = {
  /**
   * Images to render
   */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      data: PropTypes.string,
      id: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ),
  /**
   * Callback, fired when an image is picked
   */
  onChange: PropTypes.func.isRequired,
};

export default ImagePicker;
