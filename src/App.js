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
  EditToggleButton,
  SettingsButton,
} from './components';
import { AppSettingsPanel } from './features';
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

  const isView = pathname.includes('view/boards');
  const isEdit = pathname.includes('edit/boards');

  useEffect(() => {
    speech.setLang(locale);
  }, [locale, speech]);

  function toggleEdit() {
    navigate(
      pathname.replace(
        (isEdit && 'edit/') || (isView && 'view/'),
        (isEdit && 'view/') || (isView && 'edit/')
      )
    );
  }

  return (
    <div className={styles.root}>
      <Helmet>
        <html lang={locale} />
      </Helmet>

      <AppBar
        actions={
          <>
            {!isView && <SettingsButton onClick={toggleSettings} />}
            {(isEdit || isView) && (
              <EditToggleButton checked={isEdit} onClick={toggleEdit} />
            )}
          </>
        }
      />

      <AppSettingsPanel open={isSettingsOpen} onDismiss={toggleSettings} />

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
    </div>
  );
}

export default App;
