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
  viewBoardDetails: {
    id: `${scope}.viewBoardDetails`,
    defaultMessage: 'View board details',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  moreActions: {
    id: `${scope}.moreActions`,
    defaultMessage: 'More actions',
  },
  details: {
    id: `${scope}.details`,
    defaultMessage: 'Details',
  },
  setAsHome: {
    id: `${scope}.setAsHome`,
    defaultMessage: 'Set as home',
  },
  selected: {
    id: `${scope}.selected`,
    defaultMessage: '{number} selected',
  },
  color: {
    id: `${scope}.color`,
    defaultMessage: 'Color',
  },
});
