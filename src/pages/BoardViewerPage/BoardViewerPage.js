import { useParams } from 'react-router-dom';
import { DefaultButton } from '@fluentui/react';
import { useIntl } from 'react-intl';

import { Seo } from '../../components';
import BoardViewer from '../../features/BoardViewer';
import useBoardViewer from '../../features/BoardViewer/useBoardViewer';
import styles from './BoardViewerPage.module.css';
import messages from './BoardViewerPage.messages';

function BoardViewerPage(props) {
  const { onEditClick } = props;

  const intl = useIntl();
  const { boardId } = useParams();
  const { board } = useBoardViewer({ boardId });

  return (
    <div className={styles.root}>
      <Seo title={board?.name} />

      <BoardViewer
        barEnd={
          <DefaultButton
            className={styles.editButton}
            iconProps={{ iconName: 'Edit' }}
            title={intl.formatMessage(messages.editBoard)}
            text={intl.formatMessage(messages.edit)}
            onClick={onEditClick}
          />
        }
      />
    </div>
  );
}

export default BoardViewerPage;
