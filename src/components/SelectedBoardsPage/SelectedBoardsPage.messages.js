/*
 * SelectedBoardsPage Messages
 *
 * This contains all the text for the SelectedBoardsPage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SelectedBoardsPage';

export default defineMessages({
  selectAllBoards: {
    id: `${scope}.selectAllBoards`,
    defaultMessage: 'Select all boards in set',
  },
  allBoardsSelected: {
    id: `${scope}.allBoardsSelected`,
    defaultMessage: 'All boards selected',
  },
  boardsSelected: {
    id: `${scope}.boardsSelected`,
    defaultMessage: '{ count } boards selected',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
});
