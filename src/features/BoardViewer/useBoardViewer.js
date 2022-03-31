import { useEffect, useState } from 'react';
import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import { boardService } from '../../open-board-format/board/board.service';
import * as utils from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useBoardOutput, useBoardNavigation } from '../../hooks/board';

function useBoardViewer({ actionHandlers, locale } = {}) {
  const [board, setBoard] = useState({});
  const navigation = useBoardNavigation();

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

  function onChangeBoard(id) {
    navigation.push({ id });
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
        const localizeBoard = boardService.getLocalizedBoard(board, locale);
        const boardDTO = boardMap.toDTO(localizeBoard);
        setBoard(boardDTO);
      }
    }

    if (navigation.activeState.id) {
      getBoard(navigation.activeState.id);
    }
  }, [navigation.activeState.id, locale]);

  return {
    board,
    navigation,
    output,
    onButtonClick,
  };
}

export default useBoardViewer;