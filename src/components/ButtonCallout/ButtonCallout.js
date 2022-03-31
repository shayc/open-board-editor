import { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Text,
  TextField,
  Callout,
  DefaultButton,
  PrimaryButton,
  DirectionalHint,
  FocusTrapZone,
  SearchBox,
  Dropdown,
  SwatchColorPicker,
} from '@fluentui/react';

import { getPartOfSpeech } from '../../open-board-format/part-of-speech';
import { getSemanticColor } from '../../open-board-format/color-codes';
import { ImagePicker } from '../../components';
import messages from './ButtonCallout.messages';
import styles from './ButtonCallout.module.css';

function ButtonCallout(props) {
  const {
    boards,
    button,
    className,
    colors,
    images,
    onChange,
    onDiscard,
    onImagesRequested,
    onSave,
    target,
  } = props;

  const intl = useIntl();
  const labelTextFieldRef = useRef();
  const rootClassName = clsx(className, styles.root);

  const labelPartOfSpeech =
    button.label.split(' ').length === 1 ? getPartOfSpeech(button.label) : '';

  function handleImageSearchChange(event, text) {
    onImagesRequested(text);
  }

  function handleLoadBoardChange(event, item) {
    onChange({ ...button, loadBoard: { id: item.key } });
  }

  function handleLabelChange(event, label) {
    const semanticColor =
      null && label.split(' ').length === 1 ? getSemanticColor(label) : '';

    onChange({
      ...button,
      label,
      ...(semanticColor ? { backgroundColor: semanticColor } : {}),
      ...(semanticColor ? { borderColor: semanticColor } : {}),
    });
  }

  function handleLabelKeyDown(event) {
    if (event.key === 'Enter') {
      handleSave();
    }
  }

  function handleDiscard() {
    onDiscard(button);
  }

  function handleSave() {
    onSave(button);
  }

  function handleColorChange(color) {
    onChange({
      ...button,
      backgroundColor: color,
      borderColor: color,
    });
  }

  function handleImageChange(image) {
    onChange({
      ...button,
      image: {
        id: image.id,
        url: image.url,
        ext_text: image.text,
        content_type: image.content_type,
      },
    });
  }

  useEffect(() => {
    setTimeout(() => {
      labelTextFieldRef.current?.select();
    }, 0);
  }, []);

  return (
    <div className={rootClassName}>
      <Callout
        preventDismissOnScroll
        calloutWidth={300}
        directionalHint={DirectionalHint.rightBottomEdge}
        gapSpace={0}
        target={target}
        onDismiss={handleDiscard}
      >
        <FocusTrapZone
          disabled={false}
          forceFocusInsideTrap
          focusPreviouslyFocusedInnerElement
          isClickableOutsideFocusTrap
        >
          <div className={styles.main}>
            <TextField
              elementRef={(ref) => {
                labelTextFieldRef.current = ref?.querySelector('input');
              }}
              label={`${intl.formatMessage(messages.label)} ${
                labelPartOfSpeech ? `(${labelPartOfSpeech})` : ''
              }`}
              value={button.label}
              onChange={handleLabelChange}
              onKeyDown={handleLabelKeyDown}
            />

            <Text className={styles.label} variant="medium" block>
              <FormattedMessage {...messages.color} />
            </Text>

            <SwatchColorPicker
              columnCount={5}
              cellShape={'circle'}
              colorCells={colors}
              cellWidth={32}
              cellHeight={32}
              onChange={(event, id, color) => {
                handleColorChange(color);
              }}
              onCellFocused={(id, color) => {
                if (color) {
                  handleColorChange(color);
                }
              }}
            />

            <Text className={styles.label} variant="medium" block>
              <FormattedMessage {...messages.image} />
            </Text>
            <SearchBox
              placeholder={intl.formatMessage(messages.search)}
              onChange={handleImageSearchChange}
            />
            <ImagePicker images={images} onChange={handleImageChange} />

            <Dropdown
              label={intl.formatMessage(messages.linkTo)}
              placeholder={intl.formatMessage(messages.selectABoard)}
              selectedKey={button?.loadBoard?.id}
              options={boards}
              onChange={handleLoadBoardChange}
            />
          </div>

          <div className={styles.footer}>
            <PrimaryButton className={styles.saveButton} onClick={handleSave}>
              <FormattedMessage {...messages.save} />
            </PrimaryButton>

            <DefaultButton onClick={handleDiscard}>
              <FormattedMessage {...messages.discard} />
            </DefaultButton>
          </div>
        </FocusTrapZone>
      </Callout>
    </div>
  );
}

ButtonCallout.propTypes = {
  /**
   * Boards to link to
   */
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  /**
   * Button to edit
   */
  button: PropTypes.shape({
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    label: PropTypes.string,
    image: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  /**
   * Colors to select from
   */
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string,
      borderColor: PropTypes.string,
    })
  ),
  /**
   * Images to select from
   */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  /**
   * Callback, fired when the button is changed
   */
  onChange: PropTypes.func,
  /**
   * Callback, fired when discard button is clicked
   */
  onDiscard: PropTypes.func.isRequired,
  /**
   * Callback, fired when the components requests images
   */
  onImagesRequested: PropTypes.func,
  /**
   * Callback, fired when save button is clicked
   */
  onSave: PropTypes.func.isRequired,
  /**
   * The target element that the callout should position itself to
   */
  target: PropTypes.instanceOf(Element),
};

export default ButtonCallout;
