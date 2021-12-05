import { useNavigate } from 'react-router-dom';
import BoardViewer from '../../features/BoardViewer';
import styles from './BoardViewerPage.module.css';

function BoardViewerPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <BoardViewer
        onEditClick={(boardId) => {
          navigate(`/edit/boards/${boardId}`);
        }}
      />
    </div>
  );
}

export default BoardViewerPage;
