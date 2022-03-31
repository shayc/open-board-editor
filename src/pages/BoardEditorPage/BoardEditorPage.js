import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { DefaultButton } from '@fluentui/react';
import { useForceUpdate } from '@fluentui/react-hooks';

import { useSearchParams } from 'react-router-dom';

import * as OBF from '../../open-board-format';
import { boardRepo } from '../../open-board-format/board/board.repo';
import { debounce, playAudio } from '../../utils';
import { useSpeech } from '../../contexts/speech';
import { useLocale } from '../../contexts/locale';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useBoard, useBoardDB, useBoardNavigation } from '../../hooks/board';

import {
  Seo,
  SpinnerProgress,
  BoardsList,
  DetailsPanel,
  DelayedRender,
  BoardCommandBar,
  SelectedBoardsPage,
} from '../../components';

import { defaultColors } from '../../open-board-format/color-codes';
import globalSymbols from '../../api/pictograms/global-symbols';
import { BoardEditor } from '../../features';
import PanelToggle from './PanelToggle';
import { openFileDialog } from './utils';
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
  const boardNav = useBoardNavigation();

  const boardSelectionRef = useRef();

  const [selectedBoards, setSelectedBoards] = useState([]);

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
        <BoardCommandBar />
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
            <BoardEditor
              barEnd={
                <DefaultButton
                  style={{ margin: 'auto 8px' }}
                  iconProps={{ iconName: 'View' }}
                  onClick={onViewClick}
                  title={intl.formatMessage(messages.viewBoard)}
                  text={intl.formatMessage(messages.view)}
                />
              }
            />

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

export default BoardEditorPage;
