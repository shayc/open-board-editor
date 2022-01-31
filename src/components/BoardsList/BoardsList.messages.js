/*
 * BoardsList Messages
 *
 * This contains all the text for the BoardsList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardsList';

export default defineMessages({
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
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  moreActions: {
    id: `${scope}.moreActions`,
    defaultMessage: 'More actions',
  },
  info: {
    id: `${scope}.info`,
    defaultMessage: 'Info',
  },
  setAsHomeBoard: {
    id: `${scope}.setAsHomeBoard`,
    defaultMessage: 'Set as home board',
  },
});
