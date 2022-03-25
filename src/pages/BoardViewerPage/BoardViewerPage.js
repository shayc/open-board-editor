import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Seo } from '../../components';
import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import BoardViewer from '../../features/BoardViewer';

import styles from './BoardViewerPage.module.css';

function useBoardViewer(boardId) {
  const [board, setBoard] = useState();
  const [rootBoard, setRootBoard] = useState();

  async function onFetch(url) {
    const board = await OBF.fetchBoard(url);
    setBoard(board);
  }

  function onRedirect(url) {
    window.open(url, '_blank');
  }

  useEffect(() => {
    async function getBoard(id) {
      const board = await boardRepo.getById(id);

      if (board) {
        const boardDTO = boardMap.toDTO(board);
        setBoard(boardDTO);
      }
    }

    if (boardId) {
      getBoard(boardId);
    }
  }, [boardId]);

  useEffect(() => {
    async function getRootBoard() {
      const rootBoard = await boardRepo.getRoot();

      if (rootBoard) {
        setRootBoard(rootBoard);
      }
    }

    getRootBoard();
  }, []);
  return { board, setBoard, onRedirect, onFetch };
}

function BoardViewerPage(props) {
  const { boardId } = useParams();
  const { board, onChange, onFetch, onRedirect } = useBoardViewer(boardId);

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <BoardViewer
        board={board}
        onFetch={onFetch}
        onRedirect={onRedirect}
        onChange={onChange}
      />
    </div>
  );
}

export default BoardViewerPage;
