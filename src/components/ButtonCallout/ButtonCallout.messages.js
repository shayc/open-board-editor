/*
 * ButtonCallout Messages
 *
 * This contains all the text for the ButtonCallout component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ButtonCallout';

export default defineMessages({
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  discard: {
    id: `${scope}.discard`,
    defaultMessage: 'Discard',
  },
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Label',
  },
  color: {
    id: `${scope}.color`,
    defaultMessage: 'Color',
  },
  image: {
    id: `${scope}.image`,
    defaultMessage: 'Image',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  linkTo: {
    id: `${scope}.linkTo`,
    defaultMessage: 'Link to',
  },
  selectABoard: {
    id: `${scope}.selectABoard`,
    defaultMessage: 'Select a board',
  },
});
