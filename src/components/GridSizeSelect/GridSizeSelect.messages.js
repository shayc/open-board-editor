/*
 * GridSizeSelect Messages
 *
 * This contains all the text for the GridSizeSelect component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.GridSizeSelect';

export default defineMessages({
  changeGridSize: {
    id: `${scope}.changeGridSize`,
    defaultMessage: 'Change grid size',
  },
  small: {
    id: `${scope}.small`,
    defaultMessage: 'Small',
  },
  medium: {
    id: `${scope}.medium`,
    defaultMessage: 'Medium',
  },
  large: {
    id: `${scope}.large`,
    defaultMessage: 'Large',
  },
  extraLarge: {
    id: `${scope}.extraLarge`,
    defaultMessage: 'Extra large',
  },
});
