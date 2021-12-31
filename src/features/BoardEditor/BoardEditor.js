import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  IconButton,
  Check,
  MarqueeSelection,
  Selection,
  SelectionZone,
} from '@fluentui/react';

import * as OBF from '../../open-board-format';
import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { Board, Tile, Pictogram } from '../../components';
import {
  ButtonCallout,
  useButtonCallout,
} from '../../components/ButtonCallout';

import styles from './BoardEditor.module.css';
import { nanoid } from 'nanoid';

function BoardEditor(props) {
  const {
    actionHandlers,
    board,
    buttonColors,
    buttonImages,
    buttonLabelHidden,
    buttonLabelPosition,
    className,
    draggable,
    linkableBoards = [],
    onBoardRequested,
    onButtonChange,
    onButtonChangeDiscard,
    onButtonChangeSave,
    onButtonClick,
    onButtonPositionChange,
    onImagesRequested,
    selection,
    selectionEnabled,
    ...other
  } = props;

  const speech = useSpeech();

  const {
    button,
    buttonPosition,
    calloutTarget,
    resetButton,
    setButton,
    setButtonPosition,
    setCalloutTarget,
  } = useButtonCallout();

  const rootClassName = clsx(className, styles.root);

  const boardsOptions = linkableBoards.map((board) => ({
    key: board.id,
    text: board.name,
  }));

  const tileDraggable = draggable && !selectionEnabled;

  const handleTileClick = OBF.createButtonClickHandler({
    speak,
    playAudio,
    actionHandlers,
    requestBoard: onBoardRequested,
    fetchBoard: (url) => {
      console.log(`Fetch board: ${url}`);
    },
    redirect: (url) => {
      console.log(`Redirect: ${url}`);
    },
  });

  function speak(text) {
    speech.speak(text);
  }

  function playAudio(url) {
    utils.playAudio(url);
  }

  function handleButtonDiscard() {
    resetButton();
    onButtonChangeDiscard();
  }

  function handleButtonChange(button) {
    const newButton = addFallbackId(button);

    setButton(newButton);
    onButtonChange(newButton, buttonPosition);
  }

  function handleButtonSave(button) {
    const newButton = addFallbackId(button);

    resetButton();
    onButtonChangeSave(newButton, buttonPosition);
  }

  function handleImagesRequested(query) {
    onImagesRequested(query);
  }

  function handleShouldStartSelection(event) {
    const shouldStartSelection = !(
      event.target.children.length &&
      event.target.className.includes('Tile') &&
      !selection.getSelectedCount()
    );

    return shouldStartSelection;
  }

  function renderTilePlaceholder(position) {
    function handleClick(event) {
      if (selectionEnabled) {
        return;
      }

      setButtonPosition(position);
      setCalloutTarget(event.target.parentElement);
    }

    return (
      <div className={styles.placeholderContainer}>
        <Tile
          component={selection.getSelectedCount() ? 'div' : 'button'}
          onClick={handleClick}
        />
      </div>
    );
  }

  function renderTile(button, index, position) {
    const { backgroundColor, borderColor, image, label, loadBoard } = button;

    const imageUrl = image?.data || image?.url;
    const variant = loadBoard ? 'folder' : 'button';
    const isSelected = selection?.isIndexSelected(index);

    const tileClassName = clsx(styles.tile, {
      [styles.tileDraggable]: tileDraggable,
    });

    const tileControlsClassName = clsx(styles.tileControls, {
      [styles.isTileControlsHidden]: !selectionEnabled,
      [styles.isTileControlsSelected]: isSelected,
    });

    function handleClick() {
      if (selectionEnabled) {
        selection.toggleIndexSelected(index);
        return;
      }

      handleTileClick(button);
    }

    function handleEditClick(event) {
      event.stopPropagation();

      setButton(button);
      setButtonPosition(position);

      setCalloutTarget(
        // TODO: tightly coupled with DOM structure
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement
      );
    }

    function handleKeyDown(event) {
      if (event.code === 'Space') {
        event.preventDefault();
        selection.toggleIndexSelected(index);
      }
    }

    return (
      <div
        className={styles.tileContainer}
        data-selection-index={index}
        data-selection-invoke={true}
      >
        <Tile
          className={tileClassName}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          variant={variant}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <Pictogram
            key={image?.url}
            label={label}
            labelHidden={buttonLabelHidden}
            labelPosition={buttonLabelPosition}
            src={imageUrl}
          />
        </Tile>

        <div className={tileControlsClassName}>
          {!selectionEnabled && (
            <IconButton
              className={`${styles.tileControlButton} ${styles.tileEditButton}`}
              onClick={handleEditClick}
              iconProps={{ iconName: 'Edit' }}
              title={'Edit'}
            />
          )}

          <button
            className={`${styles.tileControlButton} ${styles.tileSelectToggle}`}
            data-selection-toggle={true}
            data-is-focusable={false}
          >
            <Check checked={isSelected} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <MarqueeSelection
        className={rootClassName}
        selection={selection}
        isEnabled={true}
        isDraggingConstrainedToRoot={true}
        onShouldStartSelection={handleShouldStartSelection}
      >
        <SelectionZone
          className={styles.selectionZone}
          selection={selection}
          selectionPreservedOnEmptyClick={false}
          isSelectedOnFocus={false}
        >
          <Board
            name={board.name}
            buttons={board.buttons}
            grid={board.grid}
            draggable={tileDraggable}
            renderButton={renderTile}
            renderButtonPlaceholder={renderTilePlaceholder}
            onButtonPositionChange={onButtonPositionChange}
            {...other}
          />
        </SelectionZone>
      </MarqueeSelection>

      {calloutTarget && (
        <ButtonCallout
          target={calloutTarget}
          button={button}
          colors={buttonColors}
          images={buttonImages}
          boards={boardsOptions}
          onSave={handleButtonSave}
          onDiscard={handleButtonDiscard}
          onChange={handleButtonChange}
          onImagesRequested={handleImagesRequested}
        />
      )}
    </>
  );
}

BoardEditor.propTypes = {
  /**
   * Board data
   */
  board: PropTypes.shape({}),
  /**
   * Colors for the button callout
   */
  buttonColors: PropTypes.array,
  /**
   * Images for the button callout
   */
  buttonImages: PropTypes.array,
  /**
   * If `true` button label is hidden
   */
  buttonLabelHidden: PropTypes.bool,
  /**
   * Button label position
   */
  buttonLabelPosition: PropTypes.oneOf(['top', 'bottom']),
  /**
   * If `true` board is draggable
   */
  draggable: PropTypes.bool,
  /**
   * Linkable boards for button callout
   */
  linkableBoards: PropTypes.array,
  /**
   * Callback, fired when a button changes
   */
  onButtonChange: PropTypes.func.isRequired,
  /**
   * Callback, fired when button change is discarded
   */
  onButtonChangeDiscard: PropTypes.func.isRequired,
  /**
   * Callback, fired when button change is saved
   */
  onButtonChangeSave: PropTypes.func.isRequired,
  /**
   * Callback, fired when button is clicked
   */
  onButtonClick: PropTypes.func.isRequired,
  /**
   * Callback, fired when buttons position is changed
   */
  onButtonPositionChange: PropTypes.func.isRequired,
  /**
   * Callback, fired when drag ends
   */
  onDragEnd: PropTypes.func,
  /**
   * Callback, fired when drag starts
   */
  onDragStart: PropTypes.func,
  /**
   * Callback, fred when images are requested
   */
  onImagesRequested: PropTypes.func,
  /**
   * A store that maintains the selection state of items.
   * https://developer.microsoft.com/en-us/fluentui#/controls/web/selection
   */
  selection: PropTypes.instanceOf(Selection),
  /**
   * If `true` buttons will be selectable
   */
  selectionEnabled: PropTypes.bool,
};

function addFallbackId(obj) {
  return { id: obj?.id || nanoid(), ...obj };
}

export default BoardEditor;
