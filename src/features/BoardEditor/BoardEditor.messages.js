/*
 * BoardEditor Messages
 *
 * This contains all the text for the BoardEditor component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.pages.BoardEditor';

export default defineMessages({
  itemsSelected: {
    id: `${scope}.itemsSelected`,
    defaultMessage: '{number} items selected',
  },
});
