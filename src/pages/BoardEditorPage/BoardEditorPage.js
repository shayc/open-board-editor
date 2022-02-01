import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Selection, DefaultButton } from '@fluentui/react';
import { useForceUpdate } from '@fluentui/react-hooks';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSearchParams } from 'react-router-dom';

import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { debounce, playAudio } from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useBoard, useBoardDB, useBoardNavigation } from '../../hooks/board';

import {
  Seo,
  SpinnerProgress,
  BoardsList,
  DetailsPanel,
  DelayedRender,
  NavButtons,
  BoardCommandBar,
  SelectedBoardsPage,
} from '../../components';

import { defaultColors } from '../../open-board-format/color-codes';
import globalSymbols from '../../api/pictograms/global-symbols';
import { BoardEditor } from '../../features';
import PanelToggle from './PanelToggle';
import { openFileDialog, share, print } from './utils';
import messages from './BoardEditorPage.messages';
import styles from './BoardEditorPage.module.css';

function BoardEditorPage(props) {
  const { onViewClick } = props;

  const intl = useIntl();
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();
  const { speak } = useSpeech();
  const { isSmallScreen } = useMediaQuery();
  const [isPanelOpen, setIsPanelOpen] = useState(!isSmallScreen);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [detailsBoard, setDetailsBoard] = useState({});

  const boardSetUrl = searchParams.get('boardSetUrl');

  const boardDB = useBoardDB();
  const boardNav = useBoardNavigation({
    navigate: useNavigate(),
  });

  const forceUpdate = useForceUpdate();

  const goToBoard = useCallback(
    function goToBoard(id) {
      boardNav.push({ id });
    },
    [boardNav]
  );

  const { board, boardCtrl } = useBoard({
    requestBoard: goToBoard,
    playAudio,
    speak,
  });

  const boardSelectionRef = useRef();

  const [selectedBoards, setSelectedBoards] = useState([]);

  const buttonsSelection = useMemo(() => {
    return new Selection({
      onSelectionChanged: forceUpdate,
      items: board.buttons,
    });
  }, [board, forceUpdate]);

  const linkableBoards = boardDB.boardsList.filter((b) => b.id !== board.id);
  const isButtonSelected = Boolean(buttonsSelection.getSelectedCount());
  const isBoardSelected = Boolean(selectedBoards?.length);

  const boardCommandContext =
    (isButtonSelected && 'button-selected') ||
    (isBoardSelected && 'board-selected') ||
    (board?.id && 'board-active');

  useHotkeys(
    'del',
    () => {
      handleButtonDelete();
    },
    [buttonsSelection]
  );

  const handleImagesRequest = useMemo(
    () =>
      debounce(async (value) => {
        const images = await globalSymbols.searchImages(value);
        setImages(images);
      }, 1000),
    []
  );

  function togglePanel() {
    setIsPanelOpen((isOpen) => !isOpen);
  }

  function toggleDetailsPanel() {
    setIsDetailsPanelOpen((isOpen) => !isOpen);
  }

  function handleChangeRequested(board) {
    boardNav.push(board);
  }

  function handleButtonColorChange(color) {
    const ids = buttonsSelection.getSelection().map((b) => b.id);
    const board = boardCtrl.setButtonColor(ids, { backgroundColor: color });
    boardDB.update(board);
  }

  async function handleImportFile() {
    const files = await openFileDialog({ accept: '.obz, .obf' });

    setIsLoading(true);
    boardCtrl.resetBoard();
    const rootId = await boardDB.importFile(files[0]);
    setIsLoading(false);

    goToBoard(rootId);
  }

  async function handleExportFile() {
    boardDB.exportFile();
  }

  async function handleNewBoard() {
    const name = intl.formatMessage(messages.newBoard);
    const id = await boardDB.add({
      name,
      grid: { columns: board.grid.columns, rows: board.grid.rows },
    });

    if (!boardDB.boardsList.length) {
      boardDB.setRootId(id);
    }

    goToBoard(id);
  }

  function deleteSelectedBoards() {
    const ids = selectedBoards.map((item) => item.id);
    boardDB.remove(ids);
  }

  function deleteBoard(id) {
    boardDB.remove(id);
  }

  function setRootId(id) {
    boardDB.setRootId(id);
  }

  function handleButtonDelete() {
    const ids = buttonsSelection
      .getSelection()
      .filter((id) => id)
      .map((item) => item.id);

    const board = boardCtrl.removeButton(ids);
    boardDB.update(board);
  }

  const handleBoardDetails = useCallback(
    async function handleBoardDetails(id) {
      if (typeof id !== 'string') {
        setDetailsBoard(board);
        setIsDetailsPanelOpen((prevState) => !prevState);
        return;
      }

      const b = await boardDB.getById(id);

      if (b) {
        setDetailsBoard(b);
        setIsDetailsPanelOpen((prevState) => !prevState);
      }
    },
    [board, boardDB]
  );

  function handleButtonChange(button, position) {
    if (boardCtrl.buttonExists(button.id)) {
      boardCtrl.updateButton(button);
    } else {
      boardCtrl.addButton(button);
      boardCtrl.setButtonPosition(button.id, position);
    }
  }

  async function handleButtonChangeDiscard() {
    const b = await boardDB.getById(board.id);

    if (b) {
      boardCtrl.setBoard(b);
    }

    setImages([]);
  }

  async function handleButtonChangeSave(button, position) {
    const { image } = button;

    const shouldFetchImage = !image?.data && image?.url;
    let newBoard = { ...board };

    if (shouldFetchImage) {
      try {
        const { file, path } = await fetchImageData({
          contentType: image.content_type,
          fileName: image.ext_text,
          url: image.url,
        });

        newBoard = boardCtrl.updateButton({
          ...button,
          image: { ...image, path },
        });
        boardDB.addFile(file, path);
      } catch (error) {
        console.log('failed to fetch image');
      }
    }

    boardDB.update(newBoard);
    setImages([]);
  }

  function handleButtonPositionChange(from, to) {
    const board = boardCtrl.moveButtonPosition(from, to);
    boardDB.update(board);
  }

  function handleGridSizeChange({ columns, rows }) {
    boardCtrl.setColumns(columns);
    const board = boardCtrl.setRows(rows);
    boardDB.update(board);
  }

  function handleBoardSelectionChange(selection) {
    boardSelectionRef.current = selection;
    const boardSelection = selection.getSelection();
    setSelectedBoards(boardSelection);
  }

  function goBack() {
    boardNav.goBack();
  }

  function goForward() {
    boardNav.goForward();
  }

  function goHome() {
    boardNav.reset({ id: boardDB.rootId });
  }

  useEffect(() => {
    const getBoard = async (id) => {
      const board = await boardDB.getById(id);

      if (board) {
        boardCtrl.setBoard(board);
      }
    };

    if (boardId) {
      getBoard(boardId);
    } else {
      boardCtrl.setBoard({ buttons: [], grid: {} });
    }
  }, [boardCtrl, boardDB, boardId]);

  useEffect(() => {
    if (isSmallScreen) {
      setIsPanelOpen(false);
    }
  }, [isSmallScreen, setIsPanelOpen]);

  useEffect(() => {
    async function importBoardSet(url) {
      const boardSet = await OBF.fetchBoardSet(url);
      await boardRepo.importBoardSet(boardSet);

      const rootBoard = await boardRepo.getRoot();
      boardNav.reset({ id: rootBoard.id, name: rootBoard.name });
    }

    if (boardSetUrl) {
      importBoardSet(boardSetUrl);
    }
  }, [boardSetUrl, boardNav]);

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <div className={styles.commandBar}>
        <PanelToggle checked={isPanelOpen} onClick={togglePanel} />

        <BoardCommandBar
          commandContext={boardCommandContext}
          colors={defaultColors}
          onNewBoardClick={handleNewBoard}
          onDetailsClick={handleBoardDetails}
          onImportFileClick={handleImportFile}
          onExportFileClick={handleExportFile}
          onPrintClick={print}
          onShareClick={share}
          onColorClick={handleButtonColorChange}
          onDeleteButtonClick={handleButtonDelete}
          onDeleteBoardClick={deleteSelectedBoards}
          onGridSizeChange={handleGridSizeChange}
        />
      </div>

      {isLoading ? (
        <DelayedRender delay={300}>
          <SpinnerProgress />
        </DelayedRender>
      ) : (
        <div className={styles.container}>
          {isPanelOpen && (
            <div className={styles.panel}>
              <BoardsList
                activeId={boardId}
                rootId={boardDB.rootId}
                boards={boardDB.boardsList}
                onActiveIdChange={goToBoard}
                onRootIdChange={setRootId}
                onDeleteClick={deleteBoard}
                onInfoClick={handleBoardDetails}
                onSelectionChange={handleBoardSelectionChange}
              />
            </div>
          )}

          <div className={styles.main}>
            {board?.id && selectedBoards.length < 2 && (
              <BoardEditor
                barStart={
                  !isButtonSelected && (
                    <NavButtons
                      backDisabled={boardNav.backDisabled}
                      forwardDisabled={boardNav.forwardDisabled}
                      onBackClick={goBack}
                      onForwardClick={goForward}
                      onHomeClick={goHome}
                    />
                  )
                }
                barEnd={
                  !isButtonSelected && (
                    <DefaultButton
                      style={{ margin: 'auto 8px' }}
                      iconProps={{ iconName: 'View' }}
                      onClick={onViewClick}
                      title={intl.formatMessage(messages.viewBoard)}
                      text={intl.formatMessage(messages.view)}
                    />
                  )
                }
                board={board}
                linkableBoards={linkableBoards}
                draggable={!isSmallScreen}
                scrollSnap={true}
                scrollDirection="vertical"
                selection={buttonsSelection}
                selectionEnabled={isButtonSelected}
                buttonColors={defaultColors}
                buttonImages={images}
                onImagesRequested={handleImagesRequest}
                onChangeRequested={handleChangeRequested}
                onButtonClick={boardCtrl.handleButtonClick}
                onButtonChange={handleButtonChange}
                onButtonChangeDiscard={handleButtonChangeDiscard}
                onButtonChangeSave={handleButtonChangeSave}
                onButtonPositionChange={handleButtonPositionChange}
              />
            )}

            {selectedBoards.length > 1 && (
              <SelectedBoardsPage
                selectedCount={selectedBoards.length}
                onDeleteClick={deleteSelectedBoards}
                onCancelClick={() => {
                  boardSelectionRef.current.setAllSelected(false);
                }}
                onSelectAllClick={() => {
                  boardSelectionRef.current.setAllSelected(true);
                }}
                allSelected={
                  selectedBoards.length === boardDB.boardsList.length
                }
              />
            )}
          </div>

          <DetailsPanel
            open={isDetailsPanelOpen}
            name={detailsBoard.name}
            description={detailsBoard.descriptionHtml}
            license={detailsBoard.license}
            onDismiss={toggleDetailsPanel}
          />
        </div>
      )}
    </div>
  );
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

export default BoardEditorPage;
