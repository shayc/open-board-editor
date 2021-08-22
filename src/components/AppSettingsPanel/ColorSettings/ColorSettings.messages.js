/*
 * ColorSettings Messages
 *
 * This contains all the text for the ColorSettings component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ColorSettings';

export default defineMessages({
  colors: {
    id: `${scope}.colors`,
    defaultMessage: 'Colors',
  },
  darkMode: {
    id: `${scope}.darkMode`,
    defaultMessage: 'Dark mode',
  },
  on: {
    id: `${scope}.on`,
    defaultMessage: 'On',
  },
  off: {
    id: `${scope}.off`,
    defaultMessage: 'Off',
  },
});
