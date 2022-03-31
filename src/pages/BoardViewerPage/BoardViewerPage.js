import { DefaultButton } from '@fluentui/react';
import { useIntl } from 'react-intl';

import { useLocale } from '../../contexts/locale';
import { Seo } from '../../components';
import BoardViewer from '../../features/BoardViewer';
import useBoardViewer from '../../features/BoardViewer/useBoardViewer';
import styles from './BoardViewerPage.module.css';
import messages from './BoardViewerPage.messages';

function BoardViewerPage(props) {
  const { onEditClick } = props;

  const intl = useIntl();
  const { board } = useBoardViewer();

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
