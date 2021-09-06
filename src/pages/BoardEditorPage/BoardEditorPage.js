import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Selection, CommandBarButton } from '@fluentui/react';
import { useForceUpdate } from '@fluentui/react-hooks';
import { useHotkeys } from 'react-hotkeys-hook';

import { debounce, playAudio } from '../../utils';
import {
  useBoard,
  useBoardDB,
  useNavigation,
} from '../../features/board/hooks';
import { useSpeech } from '../../features/speech';
import { useMediaQuery } from '../../features/media-query';
import { useUserSettings } from '../../features/user-settings';

import {
  Seo,
  SpinnerProgress,
  BoardEditor,
  BoardList,
  DetailsPanel,
  DelayedRender,
  Bar,
  NavButtons,
  NavText,
  AppBar,
  BoardCommandBar,
  GridSizeSelect,
  SelectedBoardsPage,
  ViewButton,
  SettingsButton,
} from '../../components';

import globalSymbols from '../../api/pictograms/global-symbols';
import { openFileDialog, share, print } from './utils';
import { defaultColors } from './colors';
import messages from './BoardEditorPage.messages';
import styles from './BoardEditorPage.module.css';

function BoardEditorPage(props) {
  const { onViewClick, onSettingsClick } = props;
  const intl = useIntl();
  const { boardId } = useParams();
  const history = useHistory();
  const { speak } = useSpeech();
  const { isSmallScreen } = useMediaQuery();
  const [isBoardsPanelOpen, setIsBoardsPanelOpen] = useState(!isSmallScreen);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [detailsBoard, setDetailsBoard] = useState({});

  const { board: boardSettings } = useUserSettings();

  const boardDB = useBoardDB();
  const nav = useNavigation({ history, rootState: { id: boardDB.rootId } });

  const forceUpdate = useForceUpdate();

  const { board, boardCtrl } = useBoard({
    changeBoard: nav.goTo,
    playAudio,
    speak,
  });

  let grid = { ...board?.grid };

  if (isSmallScreen) {
    const MAX_GRID_COLUMNS = 4;
    const MAX_GRID_ROWS = 4;

    grid.rows = Math.min(grid.rows, MAX_GRID_ROWS);
    grid.columns = Math.min(grid.columns, MAX_GRID_COLUMNS);
  }

  const buttonsSelection = useMemo(() => {
    return new Selection({
      onSelectionChanged: forceUpdate,
      items: board.buttons,
    });
  }, [board, forceUpdate]);

  const boardsSelection = useRef(
    new Selection({
      onSelectionChanged: forceUpdate,
      items: boardDB.boardsList,
    })
  ).current;

  const linkableBoards = boardDB.boardsList.filter((b) => b.id !== board.id);
  const isButtonsSelected = Boolean(buttonsSelection.getSelectedCount());
  const isBoardsSelected = Boolean(boardsSelection.getSelectedCount());

  useHotkeys(
    'del',
    () => {
      handleButtonDelete();
    },
    [buttonsSelection]
  );

  // eslint-disable-next-line
  const handleActiveBoardIdChange = useCallback(
    debounce((id) => {
      nav.goTo(id);
    }, 300),
    [nav]
  );

  const handleImagesRequested = useMemo(
    () =>
      debounce(async (value) => {
        const images = await globalSymbols.searchImages(value);
        setImages(images);
      }, 1000),
    []
  );

  function toggleBoardsPanel() {
    setIsBoardsPanelOpen((isOpen) => !isOpen);
  }

  function toggleDetailsPanel() {
    setIsDetailsPanelOpen((isOpen) => !isOpen);
  }

  const navigateToNextBoard = useCallback(
    function navigateToNextBoard(boardId, boardsList) {
      const boardIndex = boardsList.findIndex((board) => board.id === boardId);
      const nextBoard =
        boardsList[boardIndex + 1] || boardsList[boardsList.length - 2];

      nav.goTo(nextBoard?.id || '/edit/board/');
    },
    [nav]
  );

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

    nav.goTo(rootId);
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
    nav.goTo(id);
  }

  const handleBoardDelete = useCallback(
    function handleBoardDelete(id) {
      const ids = Array.isArray(id) ? id : [id];
      boardDB.remove(ids);

      navigateToNextBoard(board.id, boardDB.boardsList);
    },
    [boardDB, board.id, navigateToNextBoard]
  );

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

  function handleViewClick() {
    onViewClick(boardId);
  }

  function handleSettingsClick() {
    onSettingsClick();
  }

  useEffect(() => {
    const getBoard = async (id) => {
      const board = await boardDB.getById(id);

      if (board) {
        boardCtrl.setBoard(board);
      } else {
        history.push('/edit/board/');
      }
    };

    if (boardId) {
      getBoard(boardId);
    } else {
      boardCtrl.setBoard({ buttons: [], grid: {} });
    }
  }, [boardCtrl, boardDB, history, boardId]);

  useEffect(() => {
    if (isSmallScreen) {
      setIsBoardsPanelOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <AppBar
        actions={
          <>
            <SettingsButton onClick={handleSettingsClick} />
            <ViewButton onClick={handleViewClick} />
          </>
        }
      />

      <BoardCommandBar
        menuType={
          (isButtonsSelected && 'selected-button') ||
          (isBoardsSelected && 'selected-board') ||
          (!board?.id && 'no-board-selected')
        }
        isPanelOpen={isBoardsPanelOpen}
        selectedCount={buttonsSelection.getSelectedCount()}
        onPanelToggleClick={toggleBoardsPanel}
        onNewBoardClick={handleNewBoard}
        onOpenFileClick={handleImportFile}
        onDownloadFileClick={handleExportFile}
        onPrintClick={print}
        onShareClick={share}
        onClearSelectionClick={() => {
          buttonsSelection.setAllSelected(false);
        }}
        onDeleteButtonClick={handleButtonDelete}
        onDeleteBoardClick={() => {
          const selectedIds = boardsSelection
            .getSelection()
            .map((item) => item.id);

          handleBoardDelete(selectedIds);
        }}
      />

      {isLoading ? (
        <DelayedRender delay={300}>
          <SpinnerProgress />
        </DelayedRender>
      ) : (
        <div className={styles.container}>
          {isBoardsPanelOpen && (
            <div className={styles.panel}>
              <BoardList
                activeId={boardId}
                rootId={boardDB.rootId}
                items={boardDB.boardsList}
                selection={boardsSelection}
                onActiveIdChange={handleActiveBoardIdChange}
                onDeleteClick={handleBoardDelete}
                onDetailsClick={handleBoardDetails}
                onRootIdChange={handleRootIdChange}
              />
            </div>
          )}

          <div className={styles.main}>
            {board?.id && boardsSelection.getSelectedCount() < 2 && (
              <>
                <Bar
                  startGroup={
                    !isSmallScreen &&
                    !isButtonsSelected && (
                      <NavButtons
                        backDisabled={nav.backDisabled}
                        forwardDisabled={nav.forwardDisabled}
                        onBackClick={nav.goBack}
                        onForwardClick={nav.goForward}
                        onHomeClick={nav.goToRoot}
                      />
                    )
                  }
                  middleGroup={<NavText>{board?.name}</NavText>}
                  endGroup={
                    !isSmallScreen &&
                    !isButtonsSelected && (
                      <div>
                        <GridSizeSelect onChange={handleGridSizeChange} />
                        <CommandBarButton
                          title={intl.formatMessage(
                            messages.viewBoardInformation
                          )}
                          iconProps={{ iconName: 'Info' }}
                          onClick={handleBoardDetails}
                        />
                      </div>
                    )
                  }
                />

                <BoardEditor
                  board={{ ...board, grid }}
                  linkableBoards={linkableBoards}
                  draggable={!isSmallScreen}
                  selection={buttonsSelection}
                  selectionEnabled={isButtonsSelected}
                  buttonLabelPosition={boardSettings.labelPosition}
                  buttonLabelHidden={boardSettings.isLabelHidden}
                  buttonColors={[...boardDB.boardsColors, ...defaultColors]}
                  buttonImages={images}
                  onImagesRequested={handleImagesRequested}
                  onButtonClick={boardCtrl.activateButton}
                  onButtonChange={handleButtonChange}
                  onButtonChangeDiscard={handleButtonChangeDiscard}
                  onButtonChangeSave={handleButtonChangeSave}
                  onButtonPositionChange={handleButtonPositionChange}
                />
              </>
            )}

            {isSmallScreen && (
              <Bar
                className={styles.bottomNavBar}
                startGroup={
                  !isButtonsSelected && (
                    <NavButtons
                      backDisabled={nav.backDisabled}
                      forwardDisabled={nav.forwardDisabled}
                      onBackClick={nav.goBack}
                      onForwardClick={nav.goForward}
                      onHomeClick={nav.goToRoot}
                    />
                  )
                }
                endGroup={
                  !isButtonsSelected && (
                    <>
                      <GridSizeSelect onChange={handleGridSizeChange} />
                      <CommandBarButton
                        title={intl.formatMessage(
                          messages.viewBoardInformation
                        )}
                        iconProps={{ iconName: 'Info' }}
                        onClick={handleBoardDetails}
                      />
                    </>
                  )
                }
              />
            )}

            {boardsSelection.getSelectedCount() > 1 && (
              <SelectedBoardsPage
                selectedCount={boardsSelection.getSelectedCount()}
                onDeleteClick={() => {
                  const selectedIds = boardsSelection
                    .getSelection()
                    .map(({ id }) => id);

                  handleBoardDelete(selectedIds);
                }}
                onCancelClick={() => {
                  boardsSelection.setAllSelected(false);
                }}
                onSelectAllClick={() => {
                  boardsSelection.setAllSelected(true);
                }}
                allSelected={boardsSelection.isAllSelected()}
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

BoardEditor.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
};

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
