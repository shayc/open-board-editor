/*
 * AppSettingsPanel Messages
 *
 * This contains all the text for the AppSettingsPanel component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AppSettingsPanel';

export default defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close',
  },
});
