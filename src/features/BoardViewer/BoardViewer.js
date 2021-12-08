import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useSettings } from '../../contexts/settings';
import { useMediaQuery } from '../../contexts/media-query';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import { useBoard, useBoardNavigation } from '../../hooks/board';
import {
  Board,
  NavBar,
  Tile,
  Pictogram,
  Output,
  Seo,
  AppBar,
} from '../../components';
import styles from './BoardViewer.module.css';

function BoardViewer(props) {
  const { actions, boardId, navigate } = props;

  const [rootBoardId, setRootBoardId] = useState();
  const { board: boardSettings } = useSettings();

  const { board, boardCtrl, output, outputCtrl } = useBoard({
    playAudio,
    speak,
    changeBoard,
  });

  const nav = useBoardNavigation({
    navigate,
    rootState: { id: rootBoardId },
  });
  const speech = useSpeech();
  const { isSmallScreen } = useMediaQuery();

  useEffect(() => {
    async function getBoard(id) {
      const board = await boardRepo.getById(id);
      const rootId = await boardRepo.getRootId();

      if (board) {
        boardCtrl.setBoard(boardMap.toDTO(board));
        setRootBoardId(rootId);
      }
    }

    if (boardId) {
      getBoard(boardId);
    }
  }, [boardId, boardCtrl]);

  function playAudio(url) {
    utils.playAudio(url);
  }

  function speak(text) {
    speech.speak(text);
  }

  function changeBoard(id) {
    nav.goTo(id);
  }

  function renderTile(button) {
    const { backgroundColor, borderColor, image, label, loadBoard } = button;

    const variant = loadBoard ? 'folder' : 'button';
    const pictogramSrc = image?.data || image?.url;

    function handleClick() {
      boardCtrl.activateButton(button);
    }

    return (
      <Tile
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        variant={variant}
        onClick={handleClick}
      >
        <Pictogram
          key={image?.url}
          label={label}
          labelHidden={boardSettings.isLabelHidden}
          labelPosition={boardSettings.labelPosition}
          src={pictogramSrc}
        />
      </Tile>
    );
  }

  function renderOutputValue(value) {
    const { image, label } = value;
    const imageSrc = image?.data || image?.url;

    return imageSrc ? (
      <Pictogram
        label={label}
        src={imageSrc}
        labelHidden={boardSettings.isLabelHidden}
        labelPosition={boardSettings.labelPosition}
      />
    ) : (
      <span className={styles.outputTextValue}>{label}</span>
    );
  }

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <AppBar
        actions={actions}
        title={isSmallScreen ? board?.name : 'Board Editor'}
      />

      <div className={styles.outputWrapper}>
        <Output
          className={styles.output}
          values={output}
          onBackspaceClick={outputCtrl.backspace}
          onClearClick={outputCtrl.clear}
          onClick={outputCtrl.activate}
          renderValue={renderOutputValue}
        />
      </div>

      {!isSmallScreen && (
        <div className={styles.navBarWrapper}>
          <NavBar
            backDisabled={nav.backDisabled}
            forwardHidden={true}
            text={board?.name}
            onBackClick={nav.goBack}
            onHomeClick={nav.goToRoot}
          />
        </div>
      )}

      <div className={styles.boardWrapper}>
        <Board
          buttons={board?.buttons}
          grid={board?.grid}
          renderButton={renderTile}
          scrollSnap={true}
          scrollDirection="vertical"
        />
      </div>

      {isSmallScreen ? (
        <div className={styles.smallScreenBottomBar}>
          <NavBar
            backDisabled={nav.backDisabled}
            onBackClick={nav.goBack}
            forwardHidden={true}
            onHomeClick={nav.goToRoot}
          />
        </div>
      ) : null}
    </div>
  );
}

BoardViewer.propTypes = {
  /**
   * Actions to render on the actions bar.
   */
  actions: PropTypes.node,
  /**
   * The id of the board to display, loads from IndexedDB.
   */
  boardId: PropTypes.string,
  /**
   *
   */
  navigate: PropTypes.func,
};

export default BoardViewer;
