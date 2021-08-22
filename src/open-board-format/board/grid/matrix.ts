function createMatrix(rows: number, columns: number): any[][] {
  const matrix = [...Array(rows)].map(() => [...Array(columns)]);

  return matrix;
}

function iterateMatrix(
  matrix: any[][],
  callback: (item: any, rowIndex: number, columnIndex: number) => void
) {
  matrix.forEach((row, rowIndex) => {
    row.forEach((item, columnIndex) => {
      callback(item, rowIndex, columnIndex);
    });
  });
}

function fillEmptyMatrixCells(matrix: any[][], items: any[]) {
  const itemQueue = [...items];

  return matrix.map((row) =>
    row.map((item) => {
      return item || itemQueue.shift();
    })
  );
}

export { createMatrix, fillEmptyMatrixCells, iterateMatrix };
