import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IconButton, Check } from '@fluentui/react';
import { nanoid } from 'nanoid';
import { useIntl } from 'react-intl';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardService } from '../../open-board-format/board/board.service';
import { useSettings } from '../../contexts/settings';
import { Board, Tile, Pictogram, NavButtons } from '../../components';
import {
  ButtonCallout,
  useButtonCallout,
} from '../../components/ButtonCallout';
import useBoardEditor from './useBoardEditor';
import messages from './BoardEditor.messages';
import styles from './BoardEditor.module.css';

function BoardEditor(props) {
  const { className, barStart, barEnd } = props;

  const intl = useIntl();

  const {
    board,
    navigation,
    selection,
    onButtonClick,
    onButtonChange,
    onButtonChangeDiscard,
    onButtonChangeSave,
    onButtonPositionChange,
  } = useBoardEditor();
  const selectionEnabled = false;

  const { board: boardSettings } = useSettings();

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

  const boardsOptions = boardRepo.getAll().map((board) => ({
    key: board.id,
    text: board.name,
  }));

  const tileDraggable = true;

  const selectedCount = selection.getSelectedCount();
  const itemsSelectedMessage = intl.formatMessage(messages.itemsSelected, {
    number: selectedCount,
  });

  const boardTitle = selectedCount ? itemsSelectedMessage : board.name;

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
    // onImagesRequested(query);
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
      setCalloutTarget(event.target);
    }

    return (
      <div className={styles.placeholderContainer}>
        <Tile
          style={{ boxShadow: 'none' }}
          aria-label="Add tile"
          backgroundColor={'var(--neutralLighter)'}
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
      [styles.isTileControlsVisible]: selectionEnabled,
      [styles.isTileControlsSelected]: isSelected,
    });

    function handleClick() {
      if (selectionEnabled) {
        selection.toggleIndexSelected(index);
        return;
      }

      onButtonClick(button);
    }

    function handleEditClick(event) {
      event.stopPropagation();

      setButton(button);
      setButtonPosition(position);

      setCalloutTarget(
        // TODO: tightly coupled with DOM structure
        event.target.closest('[data-selection-index]')
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
            labelHidden={boardSettings.isLabelHidden}
            labelPosition={boardSettings.labelPosition}
            src={imageUrl}
          />
        </Tile>

        <div className={tileControlsClassName}>
          {!selectionEnabled && (
            <IconButton
              className={`${styles.tileControlButton} ${styles.tileEditButton}`}
              onClick={handleEditClick}
              iconProps={{ iconName: 'Edit' }}
              title={'Edit tile'}
              data-is-focusable={false}
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
      <Board
        className={rootClassName}
        title={boardTitle}
        buttons={board.buttons}
        grid={board.grid}
        draggable={tileDraggable}
        renderButton={renderTile}
        renderButtonPlaceholder={renderTilePlaceholder}
        onButtonPositionChange={onButtonPositionChange}
        selection={selection}
        onShouldStartSelection={handleShouldStartSelection}
        barStart={
          !false && (
            <NavButtons
              backDisabled={navigation.isBackDisabled}
              forwardDisabled={navigation.isForwardDisabled}
              onBackClick={navigation.onBackClick}
              onForwardClick={navigation.onForwardClick}
              onHomeClick={navigation.onHomeClick}
            />
          )
        }
        barEnd={barEnd}
      />

      {calloutTarget && (
        <ButtonCallout
          target={calloutTarget}
          button={button}
          colors={[]}
          images={[]}
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
   *
   */
  barEnd: PropTypes.node,
  /**
   *
   */
  barStart: PropTypes.node,
};

function addFallbackId(obj) {
  return { id: obj?.id || nanoid(), ...obj };
}

export default BoardEditor;
