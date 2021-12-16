import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import BoardViewer from '../../features/BoardViewer';
import { Seo } from '../../components';
import styles from './BoardViewerPage.module.css';

function BoardViewerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { boardId } = useParams();
  const [board, setBoard] = useState();
  const [rootId, setRootId] = useState();

  const boardSetUrl = searchParams.get('boardSetUrl');

  useEffect(() => {
    async function getBoard(id) {
      const board = await boardRepo.getById(id);
      const rootId = await boardRepo.getRootId();

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
    async function fetchFile(url) {
      const response = await fetch(`${url}`);
      const blob = await response.blob();
      const file = new File([blob], url.slice(1));

      return file;
    }

    async function importBoardSet(url) {
      const file = await fetchFile(url);
      const [boardSet] = await OBF.readFiles([file]);
      boardRepo.importBoardSet(boardSet);

      const rootId = await boardRepo.getRootId();
      navigate(rootId);
    }

    if (boardSetUrl) {
      importBoardSet(`${boardSetUrl}`);
    }
  }, [boardSetUrl, navigate]);

  function goBack() {
    navigate(-1);
  }

  function goHome(id) {
    navigate(id);
  }

  function goTo(id) {
    navigate(id);
  }

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <BoardViewer
        board={board}
        rootId={rootId}
        onBoardRequested={goTo}
        onFetchBoardRequested={(url) => {}}
        onRedirectRequested={(url) => {}}
        onBackClick={goBack}
        onHomeClick={goHome}
      />
    </div>
  );
}

export default BoardViewerPage;
