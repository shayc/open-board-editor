import * as OBF from '../../interfaces';
import { createMatrix, iterateMatrix, fillEmptyMatrixCells } from './matrix';

const gridService = {
  setColumns(columns: number, grid: OBF.Grid): OBF.Grid {
    return { ...grid, columns };
  },

  setRows(rows: number, grid: OBF.Grid): OBF.Grid {
    return { ...grid, rows };
  },

  setItem(
    id: string,
    position: { row: number; column: number },
    grid: OBF.Grid
  ): OBF.Grid {
    const order = grid.order.map((row) => [...row]);
    order[position.row][position.column] = id;

    return { ...grid, order };
  },

  removeItem(id: string | string[], grid: OBF.Grid): OBF.Grid {
    const ids = Array.isArray(id) ? id : [id];

    const order = grid.order.map((row) =>
      row.map((itemId) => (itemId && ids.includes(itemId) ? null : itemId))
    );

    return { ...grid, order };
  },

  moveItem(from: GridPosition, to: GridPosition, grid: OBF.Grid): OBF.Grid {
    const order = grid.order.map((row) => [...row]);
    const fromItem = order[from.row][from.column];
    const toItem = order[to.row][to.column];

    order[from.row][from.column] = toItem;
    order[to.row][to.column] = fromItem;

    return { ...grid, order };
  },

  sortItems(items: { id: string; [key: string]: any }[], grid: OBF.Grid) {
    const { rows, columns, order } = grid;

    const matrix = createMatrix(rows, columns);
    const itemsToSort = [...items];

    iterateMatrix(order, (id, rowIndex, columnIndex) => {
      const itemIndex = itemsToSort.findIndex((item) => item.id === id);
      const itemExists = itemIndex > -1;

      const exceedsBoundaries = rowIndex >= rows || columnIndex >= columns;

      if (itemExists && !exceedsBoundaries) {
        const item = itemsToSort.splice(itemIndex, 1)[0];
        matrix[rowIndex][columnIndex] = item;
      }
    });

    const sortedItems = fillEmptyMatrixCells(matrix, itemsToSort);

    return sortedItems;
  },
};

type GridPosition = { row: number; column: number };

export { createMatrix, gridService };
