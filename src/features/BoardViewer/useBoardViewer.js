import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useBoardOutput, useBoardNavigation } from '../../hooks/board';

function useBoardViewer({ boardId, actionHandlers } = {}) {
  const [board, setBoard] = useState({});

  const navigation = useBoardNavigation({
    history: boardId ? [{ id: boardId }] : [],
    index: boardId ? 0 : -1,
    navigate: useNavigate(),
  });

  const output = useBoardOutput({
    speak,
    playAudio,
  });

  const speech = useSpeech();

  const onButtonClick = OBF.createButtonClickHandler({
    speak,
    playAudio,
    actionHandlers: { ...actionHandlers, ...output.actionHandlers },
    changeBoard: onChangeBoard,
    fetchBoard: onFetchBoard,
    redirect: onRedirectWindow,
    pushOutput: output.push,
  });

  function speak(text) {
    speech.speak(text);
  }

  function playAudio(url) {
    utils.playAudio(url);
  }

  function onChangeBoard(board) {
    navigation.push(board);
  }

  async function onFetchBoard(url) {
    const board = await OBF.fetchBoard(url);
    setBoard(board);
  }

  function onRedirectWindow(url) {
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

  return {
    board,
    navigation,
    output,
    onButtonClick,
  };
}

export default useBoardViewer;
