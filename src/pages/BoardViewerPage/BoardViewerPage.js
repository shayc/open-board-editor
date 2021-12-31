import { useEffect, useState } from 'react';
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import BoardViewer from '../../features/BoardViewer';
import { useBoardNavigation } from '../../hooks/board';
import { EditToggleButton, NavButtons, Seo } from '../../components';
import styles from './BoardViewerPage.module.css';

function BoardViewerPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { boardId } = useParams();
  const [board, setBoard] = useState();
  const [rootId, setRootId] = useState();

  const boardNavigation = useBoardNavigation({
    navigate,
    history: [{ id: board?.id }],
    index: 0,
  });

  const boardSetUrl = searchParams.get('boardSetUrl');

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
      boardNavigation.reset({ id, name });
    }

    if (boardSetUrl) {
      importBoardSet(`${boardSetUrl}`);
    }
  }, [boardSetUrl, boardNavigation]);

  function handleBoardRequest(id) {
    boardNavigation.push({ id });
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

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <BoardViewer
        board={board}
        barStart={
          <NavButtons
            backDisabled={boardNavigation.backDisabled}
            forwardDisabled={boardNavigation.forwardDisabled}
            onBackClick={() => {
              boardNavigation.goBack();
            }}
            onForwardClick={() => {
              boardNavigation.goForward();
            }}
            onHomeClick={() => {
              boardNavigation.reset({ id: rootId });
            }}
          />
        }
        barEnd={
          <EditToggleButton
            checked={false}
            onClick={() => {
              navigate(pathname.replace('view', 'edit'));
            }}
          />
        }
        onBoardRequested={handleBoardRequest}
        onFetchRequested={handleFetchRequest}
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
