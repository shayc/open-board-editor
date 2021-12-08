import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import BoardViewer from '../../features/BoardViewer';
import { EditButton } from '../../components';

import styles from './BoardViewerPage.module.css';

function BoardViewerPage() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();

  const boardUrl = searchParams.get('boardUrl');

  const actions = (
    <EditButton
      onClick={() => {
        navigate(`/edit/boards/${boardId}`);
      }}
    />
  );

  return (
    <div className={styles.root}>
      <BoardViewer
        actions={actions}
        navigate={navigate}
        boardId={boardId}
        boardUrl={boardUrl}
      />
    </div>
  );
}

export default BoardViewerPage;
