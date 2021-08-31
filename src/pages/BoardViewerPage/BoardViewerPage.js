import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

import * as utils from '../../utils';
import { useSpeech } from '../../features/speech';
import { useUserSettings } from '../../features/user-settings';
import { useBoard, useBoardDB } from '../../features/board/hooks';
import { useMediaQuery } from '../../features/media-query';
import { useNavigation } from '../../features/board/hooks/useNavigation';
import {
  Board,
  NavBar,
  NavText,
  Tile,
  Pictogram,
  Output,
  Seo,
  EditButton,
} from '../../components';
import styles from './BoardViewerPage.module.css';

function BoardViewerPage(props) {
  const history = useHistory();
  const { boardId } = useParams();
  const { board: boardSettings } = useUserSettings();
  const boardDB = useBoardDB();

  const { board, boardCtrl, output, outputCtrl } = useBoard({
    playAudio,
    speak,
    changeBoard,
  });

  const nav = useNavigation({ history, rootState: { id: boardDB.rootId } });
  const speech = useSpeech();
  const { isSmallScreen } = useMediaQuery();

  let grid = { ...board?.grid };

  if (isSmallScreen) {
    const MAX_GRID_COLUMNS = 4;
    const MAX_GRID_ROWS = 4;

    grid.rows = Math.min(grid.rows, MAX_GRID_ROWS);
    grid.columns = Math.min(grid.columns, MAX_GRID_COLUMNS);
  }

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
    const { id, backgroundColor, borderColor, image, label, loadBoard } =
      button;

    const variant = loadBoard ? 'folder' : 'button';
    const imageUrl = image?.data || image?.url;

    function handleClick() {
      boardCtrl.activateButton(button);
    }

    return (
      <Tile
        key={id}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        variant={variant}
        onClick={handleClick}
      >
        <Pictogram
          label={label}
          labelHidden={boardSettings.isLabelHidden}
          labelPosition={boardSettings.labelPosition}
          src={imageUrl}
        />
      </Tile>
    );
  }

  function renderOutputValue(value) {
    const { image, label } = value;
    const imageUrl = image?.data || image?.url;

    return image ? (
      <Pictogram
        label={label}
        src={imageUrl}
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
        <div className={styles.smallScreenBar}>
          <NavText style={{ height: '48px', margin: '0 8px' }}>
            {board?.name}
          </NavText>

          <div className={styles.smallScreenBarGroup}>
            <EditButton
              onClick={() => {
                history.push(`/edit/board/${board?.id || ''}`);
              }}
            />
          </div>
        </div>
      )}

      <div className={styles.outputWrapper}>
        <Output
          className={styles.output}
          values={output}
          onBackspaceClick={outputCtrl.clearLastValue}
          onClearClick={outputCtrl.clear}
          onClick={outputCtrl.activateOutput}
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
            <EditButton
              onClick={() => {
                history.push(`/edit/board/${board?.id || ''}`);
              }}
            />
          </NavBar>
        </div>
      )}

      <div className={styles.boardWrapper}>
        <Board
          buttons={board?.buttons}
          grid={grid}
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
  /**
   * Actions to render.
   */
  actions: PropTypes.node,
};

export default BoardViewerPage;
