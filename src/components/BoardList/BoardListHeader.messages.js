/*
 * BoardListHeader Messages
 *
 * This contains all the text for the BoardListHeader component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardListHeader';

export default defineMessages({
  selectAllBoards: {
    id: `${scope}.selectAllBoards`,
    defaultMessage: 'Select all boards',
  },
  results: {
    id: `${scope}.results`,
    defaultMessage: 'Results',
  },
  boards: {
    id: `${scope}.boards`,
    defaultMessage: 'Boards',
  },
});
