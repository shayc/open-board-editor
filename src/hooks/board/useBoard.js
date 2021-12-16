import * as OBF from '../../open-board-format';
import useBoardState from './useBoardState';

export function useBoard(params) {
  const {
    actionHandlers,
    getBoard,
    fetchBoard,
    redirect,
    playAudio,
    speak,
    pushOutput,
  } = params;

  const [board, boardCtrl] = useBoardState();

  const handleButtonClick = OBF.createButtonClickHandler({
    getBoard,
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
