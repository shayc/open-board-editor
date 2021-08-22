import { Suspense, lazy, useEffect, useState } from 'react';
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { IconButton, DefaultButton } from '@fluentui/react';

import { useSpeech } from './features/speech';
import { useLocale } from './features/locale';
import { AppSettingsPanel, DelayedRender, SpinnerProgress } from './components';
import messages from './App.messages';
import styles from './App.module.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const BoardViewerPage = lazy(() => import('./pages/BoardViewerPage'));
const BoardEditorPage = lazy(() => import('./pages/BoardEditorPage'));

function App() {
  const history = useHistory();
  const { locale } = useLocale();
  const intl = useIntl();
  const speech = useSpeech();
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

  const editMatch = useRouteMatch('/edit/board/:boardId?');
  const viewMatch = useRouteMatch('/board/:boardId?');

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
              actions={
                <>
                  <IconButton
                    styles={{ root: { color: 'inherit' } }}
                    iconProps={{
                      iconName: 'Settings',
                    }}
                    ariaLabel={intl.formatMessage(messages.settings)}
                    title={intl.formatMessage(messages.settings)}
                    onClick={toggleSettingsPanel}
                  />

                  <DefaultButton
                    styles={{
                      root: {
                        background: 'transparent',
                      },
                    }}
                    className={styles.editToggle}
                    iconProps={{ iconName: 'View' }}
                    onClick={() => {
                      history.push(`/board/${editMatch.params.boardId || ''}`);
                    }}
                  >
                    {intl.formatMessage(messages.view)}
                  </DefaultButton>
                </>
              }
            />
          </Route>

          <Route path="/board/:boardId?">
            <BoardViewerPage
              actions={
                <DefaultButton
                  styles={{
                    root: {
                      background: 'transparent',
                    },
                  }}
                  className={styles.editToggle}
                  iconProps={{ iconName: 'Edit' }}
                  title={intl.formatMessage(messages.clickToEdit)}
                  onClick={() => {
                    history.push(
                      `/edit/board/${viewMatch.params.boardId || ''}`
                    );
                  }}
                >
                  {intl.formatMessage(messages.edit)}
                </DefaultButton>
              }
            />
          </Route>
        </Switch>
      </Suspense>

      <AppSettingsPanel
        open={isSettingsPanelOpen}
        onDismiss={toggleSettingsPanel}
      />
    </div>
  );
}

export default App;
