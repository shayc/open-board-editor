import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Selection, CommandBarButton } from '@fluentui/react';
import { useForceUpdate } from '@fluentui/react-hooks';
import { useHotkeys } from 'react-hotkeys-hook';
import { debounce, playAudio } from '../../utils';
import { gridService } from '../../open-board-format/board/grid/grid.service';
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
  NavBar,
  NavText,
  AppBar,
  BoardCommandBar,
  GridSizeSelect,
  SelectedBoardsPage,
  ViewButton,
} from '../../components';

import globalSymbols from '../../api/pictograms/global-symbols';
import { openFileDialog, share, print } from './utils';
import messages from './BoardEditorPage.messages';
import styles from './BoardEditorPage.module.css';

const defaultColors = [
  {
    id: 'PMxkUnkBqx9ZhEq06sAiC',
    backgroundColor: 'rgb(255, 204, 170)',
    borderColor: 'rgb(255, 112, 17)',
  },
  {
    id: 'KuA7Ww1Di9QepHRS9S3ni',
    backgroundColor: 'rgb(255, 170, 204)',
    borderColor: 'rgb(255, 17, 112)',
  },
  {
    id: 'Jr89fddSpDYrdHS45BINC',
    backgroundColor: 'rgb(170, 204, 255)',
    borderColor: 'rgb(17, 112, 255)',
  },
  {
    id: 'qRlY_5kBfmuM9NwhFJyLg',
    backgroundColor: 'rgb(255, 255, 170)',
    borderColor: 'rgb(221, 221, 0)',
  },
];

function BoardEditorPage(props) {
  const { actions } = props;
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
  const [selectedCount, setSelectedCount] = useState(0);

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
    const sortedButtons = board.buttons.length
      ? gridService
          .sortItems(board.buttons, {
            columns: board.grid.columns,
            rows: board.grid.rows,
            order: board.grid.order,
          })
          .flat()
          .filter((item) => item)
      : board.buttons;

    return new Selection({
      onSelectionChanged: forceUpdate,
      items: sortedButtons,
    });
  }, [board, forceUpdate]);

  const boardsSelection = useRef(
    new Selection({
      onSelectionChanged: () => {
        const selectedCount = boardsSelection.getSelectedCount();
        setSelectedCount(selectedCount);
      },
      items: boardDB.boardsList,
    })
  ).current;

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
  const debouncedNavGoTo = useCallback(
    debounce((id) => {
      nav.goTo(id);
    }, 300),
    []
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

      const initialBoardIndex = boardDB.boardsList.findIndex(
        (item) => item.id === board.id
      );
      const filteredList = boardDB.boardsList.filter(
        (item) => !ids.includes(item.id)
      );
      const boardIndex = filteredList.findIndex((item) => item.id === board.id);
      const nextBoardIndex =
        boardIndex !== -1
          ? boardIndex
          : filteredList[initialBoardIndex] ||
            filteredList[filteredList.length - 1];

      boardDB.remove(ids);

      nav.goTo(nextBoardIndex?.id || '/edit/board/');
    },
    [boardDB, nav, board.id]
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

  async function handleButtonChangeSave(button, position) {
    const { image } = button;

    const noImageData = !image?.data && image?.url;
    let newBoard = { ...board };

    if (noImageData) {
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

  const handleSetBoardAsHome = useCallback(
    function handleSetBoardAsHome(id) {
      boardDB.setRootId(id);
    },
    [boardDB]
  );

  function handleGridSizeChange({ columns, rows }) {
    boardCtrl.setColumns(columns);
    const board = boardCtrl.setRows(rows);
    boardDB.update(board);
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
            {actions}
            <ViewButton
              onClick={() => {
                history.push(`/board/${board?.id || ''}`);
              }}
            />
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
                selectedCount={selectedCount}
                selection={boardsSelection}
                onActiveIdChange={(id) => {
                  debouncedNavGoTo(id);
                }}
                onDeleteClick={handleBoardDelete}
                onDetailsClick={handleBoardDetails}
                onSetAsHomeClick={handleSetBoardAsHome}
              />
            </div>
          )}

          <div className={styles.main}>
            {board?.id && boardsSelection.getSelectedCount() < 2 && (
              <>
                {isSmallScreen ? (
                  <NavText>{board?.name}</NavText>
                ) : (
                  <NavBar
                    backDisabled={nav.backDisabled}
                    forwardDisabled={nav.forwardDisabled}
                    onBackClick={nav.goBack}
                    onForwardClick={nav.goForward}
                    onHomeClick={nav.goToRoot}
                    forwardHidden={isButtonsSelected}
                    backHidden={isButtonsSelected}
                    homeHidden={isButtonsSelected}
                    text={board?.name}
                  >
                    {!isButtonsSelected && (
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
                    )}
                  </NavBar>
                )}

                <BoardEditor
                  board={{ ...board, grid }}
                  boards={boardDB.boardsList.map((b) => ({
                    key: b.id,
                    text: b.name,
                  }))}
                  draggable={!isSmallScreen}
                  selection={buttonsSelection}
                  selectionEnabled={isButtonsSelected}
                  labelPosition={boardSettings.labelPosition}
                  labelHidden={boardSettings.isLabelHidden}
                  colors={[...boardDB.boardsColors, ...defaultColors]}
                  images={images}
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
              <div className={styles.bottomNavBar}>
                <NavBar
                  backDisabled={nav.backDisabled}
                  forwardDisabled={nav.forwardDisabled}
                  onBackClick={nav.goBack}
                  onForwardClick={nav.goForward}
                  onHomeClick={nav.goToRoot}
                  forwardHidden={isButtonsSelected}
                  backHidden={isButtonsSelected}
                  homeHidden={isButtonsSelected}
                >
                  {!isButtonsSelected && (
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
                  )}
                </NavBar>
              </div>
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

export default BoardEditorPage;
