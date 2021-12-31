import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSettings } from './contexts/settings';
import { useSpeech } from './contexts/speech';
import { useLocale } from './contexts/locale';
import {
  DelayedRender,
  SpinnerProgress,
  AppBar,
  SettingsButton,
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

  useEffect(() => {
    speech.setLang(locale);
  }, [locale, speech]);

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
                  name={APP_NAME}
                  actions={<SettingsButton onClick={toggleSettings} />}
                />
                <BoardEditorPage />
              </>
            }
          >
            <Route path=":boardId" />
          </Route>

          <Route path="view/boards" element={<BoardViewerPage />}>
            <Route path=":boardId" />
          </Route>
        </Routes>
      </Suspense>

      <AppSettingsPanel open={isSettingsOpen} onDismiss={toggleSettings} />
    </div>
  );
}

export default App;
