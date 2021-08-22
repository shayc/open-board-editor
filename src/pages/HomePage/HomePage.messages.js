/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.pages.HomePage';

export default defineMessages({
  startNewBoardSet: {
    id: `${scope}.startNewBoardSet`,
    defaultMessage: 'Start a New Board Set',
  },
  blank: {
    id: `${scope}.blank`,
    defaultMessage: 'Blank',
  },
  recentlyViewedBoardSets: {
    id: `${scope}.recentlyViewedBoardSets`,
    defaultMessage: 'Recently Viewed Board Sets',
  },
});
