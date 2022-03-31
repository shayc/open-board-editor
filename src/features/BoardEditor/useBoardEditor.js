import { useEffect, useMemo, useState } from 'react';
import { useForceUpdate } from '@fluentui/react-hooks';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { boardMap } from '../../open-board-format/board/board.map';
import { boardService } from '../../open-board-format/board/board.service';
import useBoardViewer from '../../features/BoardViewer/useBoardViewer';
import useSelection from './useSelection';
import { useBoardEditorHotKeys } from './useBoardEditorHotKeys';

function useBoardEditor({ actionHandlers, locale } = {}) {
  useBoardEditorHotKeys();

  const { board, setBoard, navigation, output, onButtonClick } = useBoardViewer(
    {
      actionHandlers,
      locale,
    }
  );

  const selection = useSelection({ items: board.buttons });

  function deleteSelectedButtons() {
    const ids = selection
      .getSelection()
      .filter((id) => id)
      .map((item) => item.id);

    const board = boardService.removeButton(ids);
    boardRepo.update(board);
    setBoard(board);
  }

  function colorSelectedButtons(color) {
    const ids = selection.getSelection().map((b) => b.id);
    const board = boardService.setButtonColor(ids, { backgroundColor: color });
    boardRepo.update(board);
    setBoard(board);
  }

  function onButtonChange(button, position) {
    if (boardService.buttonExists(button.id, board)) {
      const b = boardService.updateButton(button, board);
      setBoard(b);
    } else {
      const b = boardService.addButton(button, board);
      const c = boardService.setButtonPosition(button.id, position, b);
      setBoard(c);
    }
  }

  async function onButtonChangeDiscard() {
    const b = await boardRepo.getById(board.id);

    if (b) {
      setBoard(b);
    }

    // setImages([]);
  }

  async function onButtonChangeSave(button, position) {
    const { image } = button;

    const shouldFetchImage = !image?.data && image?.url;
    let newBoard = { ...board };

    const boardFromDB = await boardRepo.getById(newBoard.id);
    const buttonFromDB = boardFromDB.buttons.find((b) => b.id === button.id);
    if (newBoard.locale !== locale) {
      const key = buttonFromDB.label;
      newBoard = boardService.setLocaleString(locale, key, button.label, board);
      newBoard = boardService.updateButton({
        ...button,
        label: buttonFromDB.label,
      });
    }

    if (shouldFetchImage) {
      try {
        const { file, path } = await fetchImageData({
          contentType: image.content_type,
          fileName: image.ext_text,
          url: image.url,
        });

        newBoard = boardService.updateButton(
          {
            ...button,
            image: { ...image, path },
          },
          board
        );
        boardRepo.addFile(file, path);
      } catch (error) {
        console.log('failed to fetch image');
      }
    }

    boardRepo.update(newBoard);
    // setImages([]);
  }

  function onButtonPositionChange(from, to) {
    const b = boardService.moveButtonPosition(from, to, board);
    boardRepo.update(b);
  }

  useEffect(() => {
    async function getBoard(id) {
      const board = await boardRepo.getById(id);

      if (board) {
        const localizedBoard = boardService.localizeBoard(locale, board);
        const boardDTO = boardMap.toDTO(localizedBoard);
        setBoard(boardDTO);
      }
    }

    if (navigation.activeState.id) {
      getBoard(navigation.activeState.id);
    }
  }, [navigation.activeState.id, locale, setBoard]);

  return {
    board,
    navigation,
    output,
    selection,
    deleteSelectedButtons,
    colorSelectedButtons,
    onButtonClick,
    onButtonChange,
    onButtonChangeDiscard,
    onButtonChangeSave,
    onButtonPositionChange,
  };
}

async function fetchImageData({ contentType, fileName, url }) {
  const fileExtension = contentType?.split('/')[1];
  const isSVG = fileExtension?.toLowerCase() === 'svg';

  const file = {
    type: `${contentType}${isSVG ? '+xml' : ''}`,
    data: await (await fetch(url)).arrayBuffer(),
  };

  const path = `images/${fileName}.${fileExtension}`;

  return { file, path };
}

export default useBoardEditor;
