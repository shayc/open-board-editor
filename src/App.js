import { Suspense, lazy, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useSpeech } from './features/speech';
import { useLocale } from './features/locale';
import {
  AppSettingsPanel,
  DelayedRender,
  SettingsButton,
  SpinnerProgress,
} from './components';
import styles from './App.module.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const BoardViewerPage = lazy(() => import('./pages/BoardViewerPage'));
const BoardEditorPage = lazy(() => import('./pages/BoardEditorPage'));

function App() {
  const { locale } = useLocale();
  const speech = useSpeech();
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  function toggleSettingsPanel() {
    setIsSettingsPanelOpen((isOpen) => !isOpen);
  }

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
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/edit/board/:boardId?">
            <BoardEditorPage
              actions={<SettingsButton onClick={toggleSettingsPanel} />}
            />

            <AppSettingsPanel
              open={isSettingsPanelOpen}
              onDismiss={toggleSettingsPanel}
            />
          </Route>

          <Route path="/board/:boardId?">
            <BoardViewerPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
