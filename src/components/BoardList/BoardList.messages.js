/*
 * BoardList Messages
 *
 * This contains all the text for the BoardList component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardList';

export default defineMessages({
  selectAllBoards: {
    id: `${scope}.selectAllBoards`,
    defaultMessage: 'Select all boards',
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filter',
  },
  results: {
    id: `${scope}.results`,
    defaultMessage: 'Results',
  },
  boards: {
    id: `${scope}.boards`,
    defaultMessage: 'Boards',
  },
  didntFindAnything: {
    id: `${scope}.didntFindAnything`,
    defaultMessage: "Didn't find anything.",
  },
  deleteSelectedBoards: {
    id: `${scope}.deleteSelectedBoards`,
    defaultMessage: 'Delete selected boards',
  },
  newBoard: {
    id: `${scope}.newBoard`,
    defaultMessage: 'New board',
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
