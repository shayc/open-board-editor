import { useState, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import sanitize from 'sanitize-filename';

import * as OBF from '../../../open-board-format';
import { boardMap } from '../../../open-board-format/board/board.map';
import { boardRepo } from '../../../open-board-format/board/board.repo';
import { getAvailableName } from './utils';

export function useBoardDB() {
  const [boardsList, setBoardsList] = useState([]);
  const [boardsColors, setBoardsColors] = useState([]);
  const [rootId, setRootId] = useState('');

  async function getBoardsColors() {
    const boards = await boardRepo.getAll();
    const colors = OBF.getBoardsColors(boards);

    if (colors) {
      const mappedColors = colors.map((c) => {
        const { background_color: backgroundColor, border_color: borderColor } =
          c;
        return { id: nanoid(), backgroundColor, borderColor };
      });

      setBoardsColors(mappedColors);
    }
  }

  async function getBoardsList() {
    const boards = await boardRepo.getAll();

    if (boards) {
      const list = boards.map((b) => ({ id: b.id, name: b.name }));
      const sortedList = list.sort((a, b) => a.name.localeCompare(b.name));

      setBoardsList(sortedList);
    }
  }

  async function getRootId() {
    const id = await boardRepo.getRootId();

    if (id) {
      setRootId(id);
    }
  }

  useEffect(() => {
    getBoardsColors();
    getBoardsList();
    getRootId();
  }, []);

  const boardDB = useMemo(() => {
    async function add(board = {}) {
      const boardNames = boardsList.map((b) => b.name);
      const name = getAvailableName(board.name, boardNames);

      const newBoard = OBF.createBoard({
        name,
        grid: {
          rows: board.grid.rows || 3,
          columns: board.grid.columns || 3,
        },
      });

      const boardId = await boardRepo.add(newBoard);

      getBoardsList();

      return boardId;
    }

    async function addFile(file, path) {
      await boardRepo.addFile(file, path);
    }

    async function importFile(file) {
      const [boardSet] = await OBF.readFiles([file]);

      await boardRepo.reset();
      await boardRepo.importBoardSet(boardSet);

      getBoardsList();
      getRootId();
      getBoardsColors();

      const rootId = boardSet.boards[boardSet.manifest.root]?.id;

      return rootId;
    }

    async function exportFile(name) {
      const boardSet = await boardRepo.exportBoardSet();
      const rootBoard = await boardRepo.getById(rootId);
      const filename =
        name || (rootBoard.name && sanitize(rootBoard.name)) || 'board-set';

      OBF.saveAsOBZFile(boardSet, filename);
    }

    async function getById(id) {
      const board = await boardRepo.getById(id);
      const dto = board && boardMap.toDTO(board);

      return dto;
    }

    function remove(id) {
      boardRepo.remove(id);
      getBoardsColors();
      getBoardsList();
    }

    function update(board) {
      const images = [];
      const sounds = [];

      board.buttons.forEach((button) => {
        const { sound, image } = button;

        if (sound) {
          sounds.push(sound);
        }
        if (image) {
          images.push(image);
        }
      });

      const buttons = board.buttons.map((button) => {
        const {
          image,
          sound,
          loadBoard: load_board,
          borderColor: border_color,
          backgroundColor: background_color,
          ...other
        } = button;

        return {
          ...other,
          image_id: image?.id,
          sound_id: sound?.id,
          load_board,
          border_color,
          background_color,
        };
      });

      const domainBoard = { ...board, buttons, images, sounds };

      boardRepo.update(domainBoard);
    }

    async function _setRootId(id) {
      await boardRepo.setRootId(id);
      setRootId(id);
    }

    return {
      add,
      addFile,
      boardsList,
      boardsColors,
      remove,
      getById,
      update,
      importFile,
      exportFile,
      setRootId: _setRootId,
      rootId,
    };
  }, [boardsColors, boardsList, rootId]);

  return boardDB;
}
