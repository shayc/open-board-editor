import { nanoid } from 'nanoid';

import * as OBF from '../interfaces';
import { createGrid } from './grid/grid';
import { createButton } from './button/button';
import { createLicense } from './license/license';

export function createBoard(props: Partial<OBF.Board> = {}): OBF.Board {
  const {
    id = nanoid(),
    name = '',
    locale = '',
    url = '',
    format = 'open-board-0.1',
    buttons = [],
    images = [],
    sounds = [],
    strings = {},
    grid,
    license,
    description_html,
  } = props;

  const board: OBF.Board = {
    id,
    buttons: buttons.map((b) => createButton(b)),
    grid: createGrid(grid),
    license: createLicense(license),
    name,
    locale,
    url,
    format,
    images,
    sounds,
    strings,
    description_html,
  };

  return board;
}
