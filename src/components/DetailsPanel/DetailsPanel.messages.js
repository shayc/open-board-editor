/*
 * DetailsPanel Messages
 *
 * This contains all the text for the DetailsPanel component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.DetailsPanel';

export default defineMessages({
  info: {
    id: `${scope}.info`,
    defaultMessage: 'Info',
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
