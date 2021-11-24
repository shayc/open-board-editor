import * as OBF from '../../../open-board-format';
import useBoardOutput from './useBoardOutput';
import useBoardState from './useBoardState';

export function useBoard(params) {
  const {
    actionHandlers: actionHandlersProp,
    changeBoard,
    fetchBoard,
    redirectWindow,
    playAudio,
    speak,
  } = params;

  const [board, boardCtrl] = useBoardState();

  const [output, outputCtrl] = useBoardOutput({
    playAudio,
    speak,
  });

  const actionHandlers = {
    [OBF.SpecialtyActions.Backspace]: outputCtrl.backspace,
    [OBF.SpecialtyActions.Clear]: outputCtrl.clear,
    [OBF.SpecialtyActions.Space]: outputCtrl.space,
    [OBF.SpecialtyActions.Speak]: outputCtrl.activate,
    [OBF.SpecialtyActions.Spell]: outputCtrl.spellValue,
    ...actionHandlersProp,
  };

  const { activateButton } = OBF.createBoardBehavior({
    changeBoard,
    actionHandlers,
    fetchBoard,
    redirectWindow,
    playAudio,
    speak,
    spellOutput: outputCtrl.spellValue,
    addOutput: outputCtrl.addValue,
  });

  boardCtrl.activateButton = activateButton;

  return {
    board,
    boardCtrl,
    output,
    outputCtrl,
  };
}
