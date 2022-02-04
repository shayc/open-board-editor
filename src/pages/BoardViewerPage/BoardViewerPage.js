import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { DefaultButton } from '@fluentui/react';

import { Seo } from '../../components';
import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import BoardViewer from '../../features/BoardViewer';

import messages from './BoardViewerPage.messages';
import styles from './BoardViewerPage.module.css';

function BoardViewerPage(props) {
  const { onEditClick } = props;

  const intl = useIntl();
  const { boardId } = useParams();
  const [board, setBoard] = useState();
  const [rootBoard, setRootBoard] = useState();

  const boardBarEnd = (
    <DefaultButton
      className={styles.editButton}
      iconProps={{ iconName: 'Edit' }}
      title={intl.formatMessage(messages.editBoard)}
      text={intl.formatMessage(messages.edit)}
      onClick={onEditClick}
    />
  );

  async function handleFetchRequest(url) {
    const board = await OBF.fetchBoard(url);
    setBoard(board);
  }

  function handleRedirectRequest(url) {
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

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <BoardViewer
        board={board}
        rootBoard={rootBoard}
        barEnd={boardBarEnd}
        onFetchRequested={handleFetchRequest}
        onRedirectRequested={handleRedirectRequest}
      />
    </div>
  );
}

export default BoardViewerPage;
