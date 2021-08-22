import * as OBF from '../../interfaces';
import { createGrid } from './grid';

export const gridMap = {
  toDomain(raw: any): OBF.Grid {
    const grid = createGrid(raw);

    return grid;
  },

  toDTO(grid: OBF.Grid): OBF.GridDTO {
    const dto: OBF.GridDTO = {
      ...grid,
    };

    return dto;
  },

  toPersistence(grid: OBF.Grid): any {},
};
