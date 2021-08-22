/*
 * BoardSettings Messages
 *
 * This contains all the text for the BoardSettings component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardSettings';

export default defineMessages({
  board: {
    id: `${scope}.board`,
    defaultMessage: 'Board',
  },
  tileLabel: {
    id: `${scope}.tileLabel`,
    defaultMessage: 'Tile label',
  },
  showAboveImage: {
    id: `${scope}.showAboveImage`,
    defaultMessage: 'Show above image',
  },
  showBelowImage: {
    id: `${scope}.showBelowImage`,
    defaultMessage: 'Show below image',
  },
  hide: {
    id: `${scope}.hide`,
    defaultMessage: 'Hide',
  },
});
