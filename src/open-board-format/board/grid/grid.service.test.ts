import { gridService } from './grid.service';
import { createGrid } from './grid';

describe('Grid service', () => {
  describe('setColumns', () => {
    it('should set columns', () => {
      const grid = createGrid();
      const columns = 3;

      const result = gridService.setColumns(columns, grid);

      expect(result.columns).toBe(columns);
    });
  });

  describe('setRows', () => {
    it('should set rows', () => {
      const grid = createGrid();
      const rows = 3;

      const result = gridService.setRows(rows, grid);

      expect(result.rows).toBe(rows);
    });
  });

  describe('setItem', () => {
    it('should set item position', () => {
      const grid = createGrid({ rows: 3, columns: 3 });
      const id = 'A';
      const position = { row: 2, column: 2 };

      const result = gridService.setItem(id, position, grid);

      expect(result.order[2][2]).toBe(id);
    });
  });

  describe('removeItem', () => {
    it('should remove item', () => {
      const grid = createGrid({ rows: 3, columns: 3 });
      const id = 'A';
      grid.order[2][2] = id;

      const result = gridService.removeItem(id, grid);

      expect(result.order[2][2]).toBe(null);
    });
  });

  describe('moveItem', () => {
    it('should move item', () => {
      const grid = createGrid({ rows: 3, columns: 3 });
      const id = 'A';
      grid.order[2][2] = id;

      const from = { row: 2, column: 2 };
      const to = { row: 0, column: 0 };

      const result = gridService.moveItem(from, to, grid);

      expect(result.order[0][0]).toBe(id);
    });
  });
});
