import * as OBF from '../';

interface ButtonClickHandlerParams {
  actionHandlers: any;
  changeBoard: (board: { id: string; name?: string }) => void;
  fetchBoard: (url: string) => Promise<OBF.Board>;
  redirect: (url: string) => void;
  playAudio: (url: string) => void;
  speak: (text: string) => void;
  pushOutput?: (button: OBF.ButtonDTO) => void;
}

export function createButtonClickHandler(params: ButtonClickHandlerParams) {
  const {
    actionHandlers,
    changeBoard,
    fetchBoard,
    redirect,
    playAudio,
    speak,
    pushOutput,
  } = params;

  function handleLoadBoard(loadBoard: OBF.LoadBoardDTO) {
    const { id, dataUrl, url, name } = loadBoard;

    if (id) {
      changeBoard({ id, name });
    } else if (dataUrl) {
      fetchBoard?.(dataUrl);
    } else if (url) {
      redirect?.(url);
    }
  }

  function handleAction(action: OBF.SpecialtyActions) {
    const handler = actionHandlers[action];

    if (handler) {
      handler();
    } else {
      const SpellAction = OBF.SpecialtyActions.Spell;

      if (action.startsWith(SpellAction)) {
        const value = action.slice(SpellAction.length);
        actionHandlers[SpellAction](value);
      }
    }
  }

  function doActions(actions: OBF.SpecialtyActions[]) {
    actions.forEach(handleAction);
  }

  function handleButtonClick(button: OBF.ButtonDTO) {
    const {
      action,
      actions: actionsProp,
      label,
      vocalization,
      sound,
      loadBoard,
    } = button;

    const actions = action ? [action, ...(actionsProp || [])] : actionsProp;

    if (actions?.length) {
      doActions(actions);

      return;
    }

    if (loadBoard) {
      handleLoadBoard(loadBoard);
    } else if (label || sound) {
      pushOutput?.(button);
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

  return handleButtonClick;
}
