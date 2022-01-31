import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Selection, DefaultButton, IconButton } from '@fluentui/react';
import { useForceUpdate } from '@fluentui/react-hooks';
import { useHotkeys } from 'react-hotkeys-hook';

import { debounce, playAudio } from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useSettings } from '../../contexts/settings';
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

function BoardEditorPage() {
  const intl = useIntl();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { speak } = useSpeech();
  const { isSmallScreen } = useMediaQuery();
  const [isPanelOpen, setIsPanelOpen] = useState(!isSmallScreen);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [detailsBoard, setDetailsBoard] = useState({});

  const { board: boardSettings } = useSettings();

  const boardDB = useBoardDB();
  const boardNavigation = useBoardNavigation({
    navigate,
    history: [{ id: boardId }],
    index: 0,
  });

  const forceUpdate = useForceUpdate();

  const goToBoard = useCallback(
    function goToBoard(id) {
      boardNavigation.push({ id });
    },
    [boardNavigation]
  );

  const { board, boardCtrl } = useBoard({
    requestBoard: goToBoard,
    playAudio,
    speak,
  });

  const boardSelectionRef = useRef();

  let grid = { ...board?.grid };

  if (isSmallScreen) {
    const MAX_GRID_COLUMNS = 4;
    const MAX_GRID_ROWS = 4;

    grid.rows = Math.min(grid.rows, MAX_GRID_ROWS);
    grid.columns = Math.min(grid.columns, MAX_GRID_COLUMNS);
  }
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

  // const navigateToNextBoard = useCallback(
  //   function navigateToNextBoard(boardId, boardsList) {
  //     const boardIndex = boardsList.findIndex((board) => board.id === boardId);
  //     const nextBoard =
  //       boardsList[boardIndex + 1] || boardsList[boardsList.length - 2];

  //     goToBoard(nextBoard?.id);
  //   },
  //   [goToBoard]
  // );

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

  function handleChangeBoardRequest(id) {
    boardNavigation.push({ id });
  }

  // function handleButtonColorChange(ids, color) {
  //   const board = boardCtrl.setButtonColor(ids, color);
  //   boardDB.update(board);
  // }

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

  const handleRootIdChange = useCallback(
    function handleRootIdChange(id) {
      boardDB.setRootId(id);
    },
    [boardDB]
  );

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

  const renderBoardActions = useCallback(
    function renderBoardActions(board) {
      const items = [
        {
          key: 'info',
          text: intl.formatMessage(messages.info),
          iconProps: { iconName: 'Info' },
          onClick: () => {
            handleBoardDetails(board.id);
          },
        },
        {
          key: 'setAsHomeBoard',
          text: intl.formatMessage(messages.setAsHomeBoard),
          iconProps: { iconName: 'Home' },
          onClick: () => {
            handleRootIdChange(board.id);
          },
        },
        {
          key: 'delete',
          text: intl.formatMessage(messages.delete),
          iconProps: { iconName: 'Delete' },
          onClick: () => {
            boardDB.remove(board.id);
          },
        },
      ];

      if (board.id === boardDB.rootId) {
        items[1].disabled = true;
        items[2].disabled = true;
      }

      function handleFocus(event) {
        event.stopPropagation();
      }

      return (
        <div className={styles.rowActions}>
          <IconButton
            iconProps={{ iconName: 'MoreVertical' }}
            menuIconProps={{ style: { display: 'none' } }}
            menuProps={{ items }}
            ariaLabel={intl.formatMessage(messages.moreActions)}
            title={intl.formatMessage(messages.moreActions)}
            onFocus={handleFocus}
          />
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boardDB.rootId]
  );

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

  function goBack() {
    boardNavigation.goBack();
  }

  function goForward() {
    boardNavigation.goForward();
  }

  function goHome() {
    boardNavigation.reset({ id: boardDB.rootId });
  }

  function viewBoard() {
    navigate(pathname.replace('edit', 'view'));
  }

  const boardCommandContext =
    (isButtonSelected && 'button-selected') ||
    (isBoardSelected && 'board-selected') ||
    (board?.id && 'board-active');

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <div className={styles.commandBar}>
        <PanelToggle checked={isPanelOpen} onClick={togglePanel} />

        <BoardCommandBar
          commandContext={boardCommandContext}
          isSmallScreen={isSmallScreen}
          onNewBoardClick={handleNewBoard}
          onImportFileClick={handleImportFile}
          onDetailsClick={handleBoardDetails}
          onExportFileClick={handleExportFile}
          onPrintClick={print}
          onShareClick={share}
          onColorClick={() => {
            alert('color');
          }}
          onClearSelectionClick={() => {
            buttonsSelection.setAllSelected(false);
          }}
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
                items={boardDB.boardsList}
                onActiveIdChange={goToBoard}
                onSelectionChange={handleBoardSelectionChange}
                renderItemActions={renderBoardActions}
              />
            </div>
          )}

          <div className={styles.main}>
            {board?.id && selectedBoards.length < 2 && (
              <BoardEditor
                barStart={
                  !isButtonSelected && (
                    <NavButtons
                      backDisabled={boardNavigation.backDisabled}
                      forwardDisabled={boardNavigation.forwardDisabled}
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
                      onClick={viewBoard}
                      title={intl.formatMessage(messages.viewBoard)}
                      text={intl.formatMessage(messages.view)}
                    />
                  )
                }
                board={{ ...board, grid }}
                linkableBoards={linkableBoards}
                draggable={!isSmallScreen}
                scrollSnap={true}
                scrollDirection="vertical"
                selection={buttonsSelection}
                selectionEnabled={isButtonSelected}
                buttonLabelPosition={boardSettings.labelPosition}
                buttonLabelHidden={boardSettings.isLabelHidden}
                buttonColors={defaultColors}
                buttonImages={images}
                onImagesRequested={handleImagesRequest}
                onChangeBoardRequested={handleChangeBoardRequest}
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
