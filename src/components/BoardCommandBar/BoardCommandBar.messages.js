/*
 * BoardCommandBar Messages
 *
 * This contains all the text for the BoardCommandBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BoardCommandBar';

export default defineMessages({
  grid: {
    id: `${scope}.grid`,
    defaultMessage: 'Grid',
  },
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
  details: {
    id: `${scope}.details`,
    defaultMessage: 'Details',
  },
  print: {
    id: `${scope}.print`,
    defaultMessage: 'Print',
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'Share',
  },
  new: {
    id: `${scope}.new`,
    defaultMessage: 'New',
  },
  newTile: {
    id: `${scope}.newTile`,
    defaultMessage: 'New tile',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  importFile: {
    id: `${scope}.importFile`,
    defaultMessage: 'Import file',
  },
  exportFile: {
    id: `${scope}.exportFile`,
    defaultMessage: 'Export file',
  },
  tile: {
    id: `${scope}.tile`,
    defaultMessage: 'Tile',
  },
  board: {
    id: `${scope}.board`,
    defaultMessage: 'Board',
  },
});
