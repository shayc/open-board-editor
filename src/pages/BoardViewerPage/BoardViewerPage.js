import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import BoardViewer from '../../features/BoardViewer';

import styles from './BoardViewerPage.module.css';

function BoardViewerPage() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();

  const boardUrl = searchParams.get('boardUrl');

  return (
    <div className={styles.root}>
      <BoardViewer navigate={navigate} boardId={boardId} boardUrl={boardUrl} />
    </div>
  );
}

export default BoardViewerPage;
