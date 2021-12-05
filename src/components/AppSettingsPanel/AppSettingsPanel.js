import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Panel, PanelType } from '@fluentui/react';

import { useUserSettings } from '../../contexts/user-settings';
import ColorSettings from './ColorSettings';
import LanguageSettings from './LanguageSettings';
import SpeechSettings from './SpeechSettings';
import BoardSettings from './BoardSettings';
import About from './About';
import messages from './AppSettingsPanel.messages';

function AppSettingsPanel(props) {
  const { onDismiss, open, ...other } = props;

  const intl = useIntl();
  const userSettings = useUserSettings();

  return (
    <Panel
      {...other}
      isLightDismiss
      isOpen={open}
      onDismiss={onDismiss}
      type={PanelType.smallFixedFar}
      closeButtonAriaLabel={intl.formatMessage(messages.close)}
      headerText={<FormattedMessage {...messages.settings} />}
    >
      <ColorSettings />
      <LanguageSettings />
      <SpeechSettings />
      <BoardSettings settings={userSettings.board} />
      <About />
    </Panel>
  );
}

AppSettingsPanel.propTypes = {
  /**
   * Callback, fired when clicking the panel's dismiss button
   */
  onDismiss: PropTypes.func.isRequired,
  /**
   * If `true`, panel is open
   */
  open: PropTypes.bool.isRequired,
};

export default AppSettingsPanel;
