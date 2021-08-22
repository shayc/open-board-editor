import * as OBF from '../../interfaces';

export const buttonService = {
  add(button: OBF.Button | OBF.Button[], buttons: OBF.Button[]): OBF.Button[] {
    const buttonArray = Array.isArray(button) ? button : [button];
    return [...buttons, ...buttonArray];
  },

  remove(id: string | string[], buttons: OBF.Button[]): OBF.Button[] {
    const ids = Array.isArray(id) ? id : [id];

    return buttons.filter((b) => !ids.includes(b.id));
  },

  update(
    button: OBF.Button | OBF.Button[],
    buttons: OBF.Button[]
  ): OBF.Button[] {
    const newButtons = Array.isArray(button) ? button : [button];

    return buttons.map((b) => {
      const newButton = newButtons.find((newButton) => newButton.id === b.id);

      return newButton ? { ...b, ...newButton } : b;
    });
  },
};
