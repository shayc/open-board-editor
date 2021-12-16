import * as OBF from '../../open-board-format';
import useBoardState from './useBoardState';

export function useBoard(params) {
  const {
    actionHandlers,
    requestBoard,
    fetchBoard,
    redirect,
    playAudio,
    speak,
    pushOutput,
  } = params;

  const [board, boardCtrl] = useBoardState();

  const handleButtonClick = OBF.createButtonClickHandler({
    requestBoard,
    actionHandlers,
    fetchBoard,
    redirect,
    playAudio,
    speak,
    pushOutput,
  });

  boardCtrl.handleButtonClick = handleButtonClick;

  return {
    board,
    boardCtrl,
  };
}
