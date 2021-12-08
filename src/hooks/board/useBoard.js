import * as OBF from '../../open-board-format';
import useBoardState from './useBoardState';

export function useBoard(params) {
  const {
    actionHandlers,
    changeBoard,
    fetchBoard,
    redirect,
    playAudio,
    speak,
    addOutput,
  } = params;

  const [board, boardCtrl] = useBoardState();

  const { activateButton } = OBF.createBoardBehavior({
    changeBoard,
    actionHandlers,
    fetchBoard,
    redirect,
    playAudio,
    speak,
    addOutput,
  });

  boardCtrl.activateButton = activateButton;

  return {
    board,
    boardCtrl,
  };
}
