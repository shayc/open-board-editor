/*
 * PanelToggle Messages
 *
 * This contains all the text for the PanelToggle component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.pages.PanelToggle';

export default defineMessages({
  showBoardsPanel: {
    id: `${scope}.showBoardsPanel`,
    defaultMessage: 'Show boards panel',
  },
  hideBoardsPanel: {
    id: `${scope}.hideBoardsPanel`,
    defaultMessage: 'Hide boards panel',
  },
});
