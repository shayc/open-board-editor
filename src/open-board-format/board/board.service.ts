import * as OBF from '../interfaces';
import { buttonService } from './button/button.service';
import { gridService } from './grid/grid.service';

export const boardService = {
  setName(name: string, board: OBF.Board): OBF.Board {
    return { ...board, name };
  },

  setLocale(locale: string, board: OBF.Board): OBF.Board {
    return { ...board, locale };
  },

  setLocaleString(
    locale: string,
    key: string,
    value: string,
    board: OBF.Board
  ): OBF.Board {
    const strings = board.strings || {};

    return {
      ...board,
      strings: {
        ...strings,
        [locale]: {
          ...strings[locale],
          [key]: value,
        },
      },
    };
  },

  addButton(button: OBF.Button | OBF.Button[], board: OBF.Board): OBF.Board {
    const buttons = buttonService.add(button, board.buttons);

    return { ...board, buttons };
  },

  removeButton(id: string | string[], board: OBF.Board): OBF.Board {
    const buttons = buttonService.remove(id, board.buttons);

    return { ...board, buttons };
  },

  updateButton(button: OBF.Board | OBF.Board[], board: OBF.Board): OBF.Board {
    const buttons = buttonService.update(button, board.buttons);

    return { ...board, buttons };
  },

  setColumns(columns: number, board: OBF.Board): OBF.Board {
    const grid = gridService.setColumns(columns, board.grid);

    return { ...board, grid };
  },

  setRows(rows: number, board: OBF.Board): OBF.Board {
    const grid = gridService.setRows(rows, board.grid);

    return { ...board, grid };
  },

  setButtonPosition(id: string, position: GridPosition, board: OBF.Board) {
    const grid = gridService.setItem(id, position, board.grid);

    return { ...board, grid };
  },

  removeButtonPosition(id: string, board: OBF.Board) {
    const grid = gridService.removeItem(id, board.grid);

    return { ...board, grid };
  },

  moveButtonPosition(from: GridPosition, to: GridPosition, board: OBF.Board) {
    const grid = gridService.moveItem(from, to, board.grid);

    return { ...board, grid };
  },

  getLocalizedBoard(
    board: OBF.Board,
    locale: string | undefined = board.locale
  ) {
    if (!locale) {
      return board;
    }

    const buttons = board.buttons.map(({ label, vocalization, ...other }) => {
      const localeLabel = label
        ? getLocaleString(label, locale, board.strings)
        : '';

      const localeVocalization = vocalization
        ? getLocaleString(vocalization, locale, board.strings)
        : '';

      return {
        ...other,
        label: localeLabel,
        vocalization: localeVocalization,
      };
    });

    const name = getLocaleString(board.name, locale, board.strings);

    return {
      ...board,
      name,
      buttons,
    };
  },
};

function getLocaleString(
  message: string,
  locale: string,
  strings?: OBF.TranslationStrings
) {
  const localeMessage = strings?.[locale]?.[message];

  return localeMessage || message;
}

type GridPosition = { row: number; column: number };
