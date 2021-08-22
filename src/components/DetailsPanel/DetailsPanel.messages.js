/*
 * DetailsPanel Messages
 *
 * This contains all the text for the DetailsPanel component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.DetailsPanel';

export default defineMessages({
  details: {
    id: `${scope}.details`,
    defaultMessage: 'Details',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close',
  },
  author: {
    id: `${scope}.author`,
    defaultMessage: 'Author',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  license: {
    id: `${scope}.license`,
    defaultMessage: 'License',
  },
});
