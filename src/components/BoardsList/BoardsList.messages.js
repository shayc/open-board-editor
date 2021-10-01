/*
 * BoardsList Messages
 *
 * This contains all the text for the BoardsList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardsList';

export default defineMessages({
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filter',
  },
  didntFindAnything: {
    id: `${scope}.didntFindAnything`,
    defaultMessage: "Didn't find anything.",
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
