import * as OBF from '../';

interface BoardBehaviorParams {
  actionHandlers: any;
  changeBoard: (id: string) => void;
  fetchBoard: (url: string) => Promise<OBF.Board>;
  redirect: (url: string) => void;
  playAudio: (url: string) => void;
  speak: (text: string) => void;
  addOutput: (button: OBF.ButtonDTO) => void;
}

export function createBoardBehavior(params: BoardBehaviorParams) {
  const {
    actionHandlers,
    changeBoard,
    fetchBoard,
    redirect,
    playAudio,
    speak,
    addOutput,
  } = params;

  function handleLoadBoard(loadBoard: OBF.LoadBoardDTO) {
    const { id, dataUrl, url } = loadBoard;

    if (id) {
      changeBoard(id);
    } else if (dataUrl) {
      fetchBoard?.(dataUrl);
    } else if (url) {
      redirect?.(url);
    }
  }

  function handleAction(action: OBF.SpecialtyActions) {
    const handler = actionHandlers[action];
    const SpellAction = OBF.SpecialtyActions.Spell;

    handler?.();

    if (action.startsWith(SpellAction)) {
      const value = action.slice(SpellAction.length);
      actionHandlers[SpellAction](value);
    }
  }

  function doActions(actions: OBF.SpecialtyActions[]) {
    actions.forEach(handleAction);
  }

  function activateButton(button: OBF.ButtonDTO) {
    const { actions, label, vocalization, sound, loadBoard } = button;

    if (actions?.length) {
      doActions(actions);

      return;
    }

    if (loadBoard) {
      handleLoadBoard(loadBoard);
    } else if (label || sound) {
      addOutput(button);
    }

    if (sound) {
      const url = sound.data || sound.url;

      if (url) {
        playAudio(url);
      }
    } else {
      const text = loadBoard ? vocalization : vocalization || label;

      if (text) {
        speak(text);
      }
    }
  }

  return {
    activateButton,
  };
}
