/*
 * App Messages
 *
 * This contains all the text for the App component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.App';

export default defineMessages({
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  view: {
    id: `${scope}.view`,
    defaultMessage: 'View',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
  clickToEdit: {
    id: `${scope}.clickToEdit`,
    defaultMessage: 'Click to edit',
  },
});
