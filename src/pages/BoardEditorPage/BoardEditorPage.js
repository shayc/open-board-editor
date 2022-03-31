import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { DefaultButton } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import { Seo, SpinnerProgress, DelayedRender } from '../../components';

import BoardCommandBar from '../../features/BoardCommandBar';
import BoardsList from '../../features/BoardsList';
import BoardEditor from '../../features/BoardEditor';
import useBoardEditor from '../../features/BoardEditor/useBoardEditor';
import PanelToggle from './PanelToggle';
import messages from './BoardEditorPage.messages';
import styles from './BoardEditorPage.module.css';

function BoardEditorPage(props) {
  const { onViewClick } = props;

  const intl = useIntl();
  const { isSmallScreen } = useMediaQuery();
  const { board } = useBoardEditor();

  const [isBoardsPanelOpen, { toggle: toggleBoardsPanel }] = useBoolean(
    !isSmallScreen
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSmallScreen) {
      toggleBoardsPanel(false);
    }
  }, [isSmallScreen, toggleBoardsPanel]);

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <div className={styles.commandBar}>
        <PanelToggle checked={isBoardsPanelOpen} onClick={toggleBoardsPanel} />
        {/* <BoardCommandBar /> */}
      </div>

      {isLoading ? (
        <DelayedRender delay={300}>
          <SpinnerProgress />
        </DelayedRender>
      ) : (
        <div className={styles.container}>
          {isBoardsPanelOpen && (
            <div className={styles.panel}>{/* <BoardsList /> */}</div>
          )}

          <div className={styles.main}>
            <BoardEditor
              barEnd={
                <DefaultButton
                  iconProps={{ iconName: 'View' }}
                  onClick={onViewClick}
                  title={intl.formatMessage(messages.viewBoard)}
                  text={intl.formatMessage(messages.view)}
                />
              }
            />

            {/* {selectedBoards.length > 1 && (
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
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardEditorPage;
