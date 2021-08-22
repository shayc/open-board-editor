/*
 * NavButtons Messages
 *
 * This contains all the text for the NavButtons component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavButtons';

export default defineMessages({
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back',
  },
  forward: {
    id: `${scope}.forward`,
    defaultMessage: 'Forward',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  goBack: {
    id: `${scope}.goBack`,
    defaultMessage: 'Go back',
  },
  goForward: {
    id: `${scope}.goForward`,
    defaultMessage: 'Go forward',
  },
  goHome: {
    id: `${scope}.goHome`,
    defaultMessage: 'Go home',
  },
});
