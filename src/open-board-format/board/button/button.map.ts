import * as OBF from '../../interfaces';
import { createButton } from './button';

export const buttonMap = {
  toDomain(raw: any): OBF.Button {
    const button = createButton(raw);

    return button;
  },
  // TODO: type any
  toDTO(button: OBF.Button, assets?: any): OBF.ButtonDTO {
    const {
      id,
      label,
      action,
      actions,
      load_board: loadBoard,
      background_color: backgroundColor,
      border_color: borderColor,
      left,
      top,
      width,
      height,
      vocalization,
    } = button;

    const dto: OBF.ButtonDTO = {
      id,
      label,
      image: assets?.image,
      action,
      actions,
      sound: assets?.sound,
      loadBoard,
      backgroundColor,
      borderColor,
      left,
      top,
      width,
      height,
      vocalization,
    };

    return dto;
  },

  toPersistence(button: OBF.Button): any {},
};
