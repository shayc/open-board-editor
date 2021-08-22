import * as OBF from '../../interfaces';
import { createMatrix } from './matrix';

export function createGrid(props: Partial<OBF.Grid> = {}): OBF.Grid {
  const { rows = 0, columns = 0, order = createMatrix(rows, columns) } = props;

  const grid = {
    rows,
    columns,
    order,
  };

  return grid;
}
