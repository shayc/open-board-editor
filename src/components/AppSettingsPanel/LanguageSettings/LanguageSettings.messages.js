/*
 * LanguageSettings Messages
 *
 * This contains all the text for the LanguageSettings component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LanguageSettings';

export default defineMessages({
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  displayLanguage: {
    id: `${scope}.displayLanguage`,
    defaultMessage: 'Display language',
  },
});
