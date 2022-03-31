import { boardRepo } from '../../open-board-format/board/board.repo';

function useBoardsList() {
  const selection = useSelection(boards);

  function deleteSelectedBoards() {
    const ids = selection.map((item) => item.id);
    boardRepo.remove(ids);
  }

  function deleteBoard(id) {
    boardRepo.remove(id);
  }

  function setRootId(id) {
    boardRepo.setRootId(id);
  }
  function handleGridSizeChange({ columns, rows }) {
    boardService.setColumns(columns);
    const board = boardService.setRows(rows);
    boardRepo.update(board);
  }

  function handleBoardSelectionChange(selection) {
    const boardSelection = selection.getSelection();
    setSelectedBoards(boardSelection);
  }
}

export default useBoardsList;
