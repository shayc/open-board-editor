/*
 * BoardList Messages
 *
 * This contains all the text for the BoardList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardList';

export default defineMessages({
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filter',
  },
  didntFindAnything: {
    id: `${scope}.didntFindAnything`,
    defaultMessage: "Didn't find anything.",
  },
  deleteBoard: {
    id: `${scope}.deleteBoard`,
    defaultMessage: 'Delete board',
  },
  moreActions: {
    id: `${scope}.moreActions`,
    defaultMessage: 'More actions',
  },
  boardInfo: {
    id: `${scope}.boardInfo`,
    defaultMessage: 'Board info',
  },
  setAsHomeBoard: {
    id: `${scope}.setAsHomeBoard`,
    defaultMessage: 'Set as home board',
  },
});
