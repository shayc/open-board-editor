import BoardViewer from '../../features/BoardViewer';
import styles from './BoardViewerPage.module.css';

function BoardViewerPage(props) {
  return (
    <div className={styles.root}>
      <BoardViewer />
    </div>
  );
}

BoardViewerPage.propTypes = {};

export default BoardViewerPage;
