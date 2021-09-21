/*
 * BoardEditorPage Messages
 *
 * This contains all the text for the BoardEditorPage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.pages.BoardEditorPage';

export default defineMessages({
  newBoard: {
    id: `${scope}.newBoard`,
    defaultMessage: 'New board',
  },
  viewBoardInformation: {
    id: `${scope}.viewBoardInformation`,
    defaultMessage: 'View board information',
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
