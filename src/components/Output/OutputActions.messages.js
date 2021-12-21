/*
 * OutputActions Messages
 *
 * This contains all the text for the OutputActions component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OutputActions';

export default defineMessages({
  clear: {
    id: `${scope}.clear`,
    defaultMessage: 'Clear',
  },
  backspace: {
    id: `${scope}.backspace`,
    defaultMessage: 'Backspace',
  },
});
