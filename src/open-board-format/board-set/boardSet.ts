import * as OBF from '../interfaces';
import { getBoardColors } from '../board/board.utils';
import { createManifest } from './manifest';

export function createBoardSet(board?: OBF.Board, path?: string): OBF.BoardSet {
  const manifest = createManifest();

  const boardSet: OBF.BoardSet = {
    manifest,
    boards: {},
    files: {},
  };

  if (board && path) {
    boardSet.boards[path] = board;
    boardSet.manifest.root = path;
    boardSet.manifest.paths.boards[board.id] = path;
  }

  return boardSet;
}

export function getBoardsColors(boards: OBF.Board[]) {
  const boardsColors = boards.map(getBoardColors).flat();
  const uniqueColors = getUniqueColors(boardsColors);

  return uniqueColors;
}

function getUniqueColors(
  colors: {
    background_color: string | undefined;
    border_color: string | undefined;
  }[]
) {
  const uniqueColors = colors?.filter((color, index, arr) => {
    return (
      index ===
      arr.findIndex((c) => {
        const isDuplicate =
          c.background_color === color.background_color &&
          c.border_color === color.border_color;

        return isDuplicate;
      })
    );
  });

  return uniqueColors;
}
