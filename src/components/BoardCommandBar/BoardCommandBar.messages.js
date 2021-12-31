/*
 * BoardCommandBar Messages
 *
 * This contains all the text for the BoardCommandBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardCommandBar';

export default defineMessages({
  details: {
    id: `${scope}.details`,
    defaultMessage: 'Details',
  },
  print: {
    id: `${scope}.print`,
    defaultMessage: 'Print',
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'Share',
  },
  newBoard: {
    id: `${scope}.newBoard`,
    defaultMessage: 'New board',
  },
  newTile: {
    id: `${scope}.newTile`,
    defaultMessage: 'New tile',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  importFile: {
    id: `${scope}.importFile`,
    defaultMessage: 'Import file',
  },
  exportFile: {
    id: `${scope}.exportFile`,
    defaultMessage: 'Export file',
  },
  showBoardsPanel: {
    id: `${scope}.showBoardsPanel`,
    defaultMessage: 'Show boards panel',
  },
  hideBoardsPanel: {
    id: `${scope}.hideBoardsPanel`,
    defaultMessage: 'Hide boards panel',
  },
});
