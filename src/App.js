import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { APP_NAME } from './constants';
import { useLocale } from './contexts/locale';
import { useSettings } from './contexts/settings';
import { AppSettingsPanel } from './features';
import {
  DelayedRender,
  SpinnerProgress,
  AppBar,
  SettingsButton,
} from './components';
import styles from './App.module.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const BoardViewerPage = lazy(() => import('./pages/BoardViewerPage'));
const BoardEditorPage = lazy(() => import('./pages/BoardEditorPage'));

function App() {
  const { locale } = useLocale();
  const { isSettingsOpen, toggleSettings } = useSettings();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function editBoard() {
    navigate(pathname.replace('view', 'edit'));
  }

  function viewBoard() {
    navigate(pathname.replace('edit', 'view'));
  }

  return (
    <div className={styles.root}>
      <Helmet>
        <html lang={locale} />
      </Helmet>

      <Suspense
        fallback={
          <DelayedRender delay={300}>
            <SpinnerProgress />
          </DelayedRender>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="edit/boards"
            element={
              <>
                <AppBar
                  className={styles.appBar}
                  name={APP_NAME}
                  actions={<SettingsButton onClick={toggleSettings} />}
                />
                <BoardEditorPage onViewClick={viewBoard} />
              </>
            }
          >
            <Route path=":boardId" element={null} />
          </Route>

          <Route
            path="view/boards"
            element={<BoardViewerPage onEditClick={editBoard} />}
          >
            <Route path=":boardId" element={null} />
          </Route>
        </Routes>
      </Suspense>

      <AppSettingsPanel open={isSettingsOpen} onDismiss={toggleSettings} />
    </div>
  );
}

export default App;
