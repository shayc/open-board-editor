import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { DefaultButton } from '@fluentui/react';
import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import BoardViewer from '../../features/BoardViewer';
import { useBoardNavigation } from '../../hooks/board';
import { NavButtons, Seo } from '../../components';
import messages from './BoardViewerPage.messages';
import styles from './BoardViewerPage.module.css';

function BoardViewerPage() {
  const intl = useIntl();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { boardId } = useParams();
  const [board, setBoard] = useState();
  const [rootId, setRootId] = useState();

  const boardNav = useBoardNavigation({
    navigate,
    history: [{ id: board?.id }],
    index: 0,
  });

  const boardSetUrl = searchParams.get('boardSetUrl');

  function goBack() {
    boardNav.goBack();
  }

  function goForward() {
    boardNav.goForward();
  }

  function goHome() {
    boardNav.reset({ id: rootId });
  }

  function editBoard() {
    navigate(pathname.replace('view', 'edit'));
  }

  function handleBoardRequest(id) {
    boardNav.push({ id });
  }

  async function handleFetchRequest(url) {
    const boardSet = await fetchBoardSet(url);

    const rootBoard =
      boardSet.boards[boardSet.manifest.paths.boards[boardSet.manifest.root]];

    setBoard(rootBoard);
  }

  function handleRedirectRequest(url) {
    window.open(url);
  }

  useEffect(() => {
    async function getBoard(id) {
      const board = await boardRepo.getById(id);
      const { id: rootId } = await boardRepo.getRoot();

      if (board) {
        setBoard(boardMap.toDTO(board));
        setRootId(rootId);
      }
    }

    if (boardId) {
      getBoard(boardId);
    }
  }, [boardId]);

  useEffect(() => {
    async function importBoardSet(url) {
      const boardSet = await fetchBoardSet(url);
      await boardRepo.importBoardSet(boardSet);

      const { id, name } = await boardRepo.getRoot();
      boardNav.reset({ id, name });
    }

    if (boardSetUrl) {
      importBoardSet(`${boardSetUrl}`);
    }
  }, [boardSetUrl, boardNav]);

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <BoardViewer
        board={board}
        barStart={
          <NavButtons
            backDisabled={boardNav.backDisabled}
            forwardDisabled={boardNav.forwardDisabled}
            onBackClick={goBack}
            onForwardClick={goForward}
            onHomeClick={goHome}
          />
        }
        barEnd={
          <DefaultButton
            className={styles.editButton}
            iconProps={{ iconName: 'Edit' }}
            title={intl.formatMessage(messages.editBoard)}
            text={intl.formatMessage(messages.edit)}
            onClick={editBoard}
          />
        }
        onChangeBoardRequested={handleBoardRequest}
        onFetchBoardRequested={handleFetchRequest}
        onRedirectRequested={handleRedirectRequest}
      />
    </div>
  );
}

async function fetchFile(url) {
  const response = await fetch(`${url}`);
  const blob = await response.blob();
  const fileName = url.slice(1);
  const file = new File([blob], fileName);

  return file;
}

async function fetchBoardSet(url) {
  const file = await fetchFile(url);
  const [boardSet] = await OBF.readFiles([file]);

  return boardSet;
}

export default BoardViewerPage;
