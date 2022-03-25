/*
 * OutputButtons Messages
 *
 * This contains all the text for the OutputButtons component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OutputButtons';

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
