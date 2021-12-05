import { useState, useRef, useMemo } from 'react';
import { boardService } from '../../open-board-format/board/board.service';

const initialBoard = { buttons: [], grid: { columns: 0, rows: 0 } };

function useBoardState() {
  const boardRef = useRef({});
  const [board, setBoardState] = useState(initialBoard);

  const boardCtrl = useMemo(() => {
    function setBoard(board) {
      boardRef.current = board;
      setBoardState(board);
    }

    function resetBoard() {
      setBoard(initialBoard);
    }

    function setName(name) {
      const newBoard = { ...boardRef.current, name };
      setBoard(newBoard);

      return newBoard;
    }

    function addButton(button) {
      const newBoard = boardService.addButton(button, boardRef.current);
      setBoard(newBoard);

      return newBoard;
    }

    function removeButton(id) {
      const newBoard = boardService.removeButton(id, boardRef.current);
      setBoard(newBoard);

      return newBoard;
    }

    function updateButton(button) {
      const newBoard = boardService.updateButton(button, boardRef.current);
      setBoard(newBoard);

      return newBoard;
    }

    function setButtonColor(ids, color) {
      const buttons = boardRef.current.buttons.map((b) =>
        ids.includes(b.id)
          ? {
              ...b,
              backgroundColor: color.backgroundColor,
              borderColor: color.borderColor,
            }
          : b
      );

      const newBoard = { ...boardRef.current, buttons };
      setBoard(newBoard);

      return newBoard;
    }

    function setColumns(columns) {
      const newBoard = boardService.setColumns(columns, boardRef.current);
      setBoard(newBoard);

      return newBoard;
    }

    function setRows(rows) {
      const newBoard = boardService.setRows(rows, boardRef.current);
      setBoard(newBoard);

      return newBoard;
    }

    function setButtonPosition(id, position) {
      const newBoard = boardService.setButtonPosition(
        id,
        position,
        boardRef.current
      );

      setBoard(newBoard);

      return newBoard;
    }

    function removeButtonPosition(id) {
      const newBoard = boardService.removeButtonPosition(id, boardRef.current);
      setBoard(newBoard);

      return newBoard;
    }

    function moveButtonPosition(from, to) {
      const newBoard = boardService.moveButtonPosition(
        from,
        to,
        boardRef.current
      );

      setBoard(newBoard);

      return newBoard;
    }

    function buttonExists(id) {
      return Boolean(boardRef.current.buttons.find((b) => b.id === id));
    }

    return {
      buttonExists,
      setName,
      setBoard,
      setButtonColor,
      setButtonPosition,
      setColumns,
      setRows,
      moveButtonPosition,
      removeButtonPosition,
      removeButton,
      resetBoard,
      addButton,
      updateButton,
    };
  }, []);

  return [board, boardCtrl];
}

export default useBoardState;
