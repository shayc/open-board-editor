import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSettings } from './contexts/settings';
import { useSpeech } from './contexts/speech';
import { useLocale } from './contexts/locale';
import {
  DelayedRender,
  SpinnerProgress,
  AppBar,
  SettingsButton,
  EditToggleButton,
} from './components';
import { AppSettingsPanel } from './features';
import { APP_NAME } from './constants';
import styles from './App.module.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const BoardViewerPage = lazy(() => import('./pages/BoardViewerPage'));
const BoardEditorPage = lazy(() => import('./pages/BoardEditorPage'));

function App() {
  const { isSettingsOpen, toggleSettings } = useSettings();
  const { locale } = useLocale();
  const speech = useSpeech();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const isView = pathname.includes('view/boards');
  const isEdit = pathname.includes('edit/boards');

  useEffect(() => {
    speech.setLang(locale);
  }, [locale, speech]);

  function toggleViewer() {
    navigate(pathname.replace('edit', 'view'));
  }

  return (
    <div className={styles.root}>
      <Helmet>
        <html lang={locale} />
      </Helmet>

      {isEdit && (
        <AppBar
          title={APP_NAME}
          actions={
            <>
              <SettingsButton onClick={toggleSettings} />
              <EditToggleButton checked={true} onClick={toggleViewer} />
            </>
          }
        />
      )}

      <Suspense
        fallback={
          <DelayedRender delay={300}>
            <SpinnerProgress />
          </DelayedRender>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="edit/boards" element={<BoardEditorPage />}>
            <Route path=":boardId" element={<BoardEditorPage />} />
          </Route>

          <Route path="view/boards" element={<BoardViewerPage />}>
            <Route path=":boardId" element={<BoardViewerPage />} />
          </Route>
        </Routes>
      </Suspense>

      <AppSettingsPanel open={isSettingsOpen} onDismiss={toggleSettings} />
    </div>
  );
}

export default App;
