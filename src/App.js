import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useSpeech } from './contexts/speech';
import { useLocale } from './contexts/locale';
import { AppSettingsPanel, DelayedRender, SpinnerProgress } from './components';
import styles from './App.module.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const BoardViewerPage = lazy(() => import('./pages/BoardViewerPage'));
const BoardEditorPage = lazy(() => import('./pages/BoardEditorPage'));

function App() {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const speech = useSpeech();
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  function toggleSettingsPanel() {
    setIsSettingsPanelOpen((isOpen) => !isOpen);
  }

  function viewBoard(id) {
    navigate(`view/boards/${id}`);
  }

  function editBoard(id) {
    navigate(`edit/boards/${id}`);
  }

  useEffect(() => {
    speech.setLang(locale);
  }, [locale, speech]);

  return (
    <div className={styles.root}>
      <Helmet>
        <html lang={locale} />
      </Helmet>

      <AppSettingsPanel
        open={isSettingsPanelOpen}
        onDismiss={toggleSettingsPanel}
      />

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
