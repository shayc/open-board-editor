/*
 * BoardCommandBar Messages
 *
 * This contains all the text for the BoardCommandBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardCommandBar';

export default defineMessages({
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
  openFile: {
    id: `${scope}.openFile`,
    defaultMessage: 'Open file',
  },
  downloadFile: {
    id: `${scope}.downloadFile`,
    defaultMessage: 'Download file',
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
