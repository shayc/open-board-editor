import * as OBF from '../interfaces';

export function getBoardColors(board: OBF.Board) {
  const colors = board?.buttons
    .map((button) => {
      const { background_color, border_color } = button;

      return { background_color, border_color };
    })
    .filter((c) => c.background_color || c.border_color);

  return colors || [];
}

export function shouldButtonsPositionedAbsolute(buttons: OBF.Button[]) {
  return (
    Boolean(buttons?.length) &&
    buttons.every((button) => {
      const { top, left, width, height } = button;

      return top && left && width && height;
    })
  );
}
