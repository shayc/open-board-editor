import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import BoardViewer from '../../features/BoardViewer';

import styles from './BoardViewerPage.module.css';

function BoardViewerPage() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();
  const [rootId, setRootId] = useState();
  const [board, setBoard] = useState();

  const boardUrl = searchParams.get('boardUrl');

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

    if (boardUrl) {
      importBoardSet(`${boardUrl}`);
    }
  }, [boardUrl, navigate]);

  return (
    <div className={styles.root}>
      <BoardViewer
        board={board}
        rootId={rootId}
        onBoardRequested={(id) => {
          navigate(id);
        }}
        onFetchBoardRequested={(url) => {}}
        onRedirectRequested={(url) => {}}
        onBackClick={() => {
          navigate(-1);
        }}
        onForwardClick={() => {
          navigate(1);
        }}
        onHomeClick={() => {
          navigate(rootId);
        }}
      />
    </div>
  );
}

export default BoardViewerPage;
