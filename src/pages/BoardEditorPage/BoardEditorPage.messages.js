/*
 * BoardEditorPage Messages
 *
 * This contains all the text for the BoardEditorPage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.pages.BoardEditorPage';

export default defineMessages({
  showBoardsPanel: {
    id: `${scope}.showBoardsPanel`,
    defaultMessage: 'Show boards panel',
  },
  hideBoardsPanel: {
    id: `${scope}.hideBoardsPanel`,
    defaultMessage: 'Hide boards panel',
  },
  newBoard: {
    id: `${scope}.newBoard`,
    defaultMessage: 'New board',
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
  selected: {
    id: `${scope}.selected`,
    defaultMessage: '{number} selected',
  },
  color: {
    id: `${scope}.color`,
    defaultMessage: 'Color',
  },
  view: {
    id: `${scope}.view`,
    defaultMessage: 'View',
  },
  viewBoard: {
    id: `${scope}.viewBoard`,
    defaultMessage: 'View board',
  },
});
