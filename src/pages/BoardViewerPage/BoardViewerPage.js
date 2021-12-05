import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';

import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useUserSettings } from '../../contexts/user-settings';
import { useBoard, useBoardDB } from '../../hooks/board';
import { useMediaQuery } from '../../contexts/media-query';
import { useBoardNavigation } from '../../hooks/board/useBoardNavigation';
import {
  Board,
  NavBar,
  Tile,
  Pictogram,
  Output,
  Seo,
  AppBar,
  EditButton,
} from '../../components';
import styles from './BoardViewerPage.module.css';

function BoardViewerPage(props) {
  const { onEditClick } = props;

  const { boardId } = useParams();
  const { board: boardSettings } = useUserSettings();
  const boardDB = useBoardDB();

  const { board, boardCtrl, output, outputCtrl } = useBoard({
    playAudio,
    speak,
    changeBoard,
  });

  const navigate = useNavigate();
  const nav = useBoardNavigation({
    navigate,
    rootState: { id: boardDB.rootId },
  });
  const speech = useSpeech();
  const { isSmallScreen } = useMediaQuery();

  function playAudio(url) {
    utils.playAudio(url);
  }

  function speak(text) {
    speech.speak(text);
  }

  function changeBoard(id) {
    nav.goTo(id);
  }

  function handleEditClick() {
    onEditClick(boardId);
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

  useEffect(() => {
    async function getBoard() {
      const board = await boardDB.getById(boardId);

      if (board) {
        boardCtrl.setBoard(board);
      }
    }

    if (boardId) {
      getBoard(boardId);
    }
  }, [boardDB, boardId, boardCtrl]);

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      {isSmallScreen && (
        <AppBar
          actions={<EditButton onClick={handleEditClick} />}
          title={board?.name}
        />
      )}

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
          >
            <EditButton onClick={handleEditClick} />
          </NavBar>
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

BoardViewerPage.propTypes = {
  onEditClick: PropTypes.func.isRequired,
};

export default BoardViewerPage;
