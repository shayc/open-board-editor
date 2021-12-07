// import boardSet from '../../open-board-format/data/core-24.json';
import BoardEditor from './BoardEditor';
import { Selection } from '@fluentui/react';

const boardSet = {
  boards: {
    'path/board': {
      id: 'board',
      name: 'shay',
      buttons: [
        { label: 'hi', backgroundColor: 'green' },
        { label: 'bye', backgroundColor: 'red' },
      ],
      grid: {
        columns: 4,
        rows: 3,
        order: [],
      },
    },
  },
  manifest: { root: 'path/board' },
};
const board = boardSet.boards[boardSet.manifest.root];

const story = {
  title: 'Example/BoardEditor',
  component: BoardEditor,
};
export default story;

const Template = (args) => <BoardEditor {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { height: '600px' },
  board,
  boards: [],
  colors: [],
  images: [],
  selection: new Selection(),
  selectionEnabled: true,
  onButtonChange: (button, position) => {},
  onButtonChangeDiscard: () => {},
  onButtonChangeSave: (button, position) => {},
  onButtonClick: (button) => {},
  onButtonPositionChange: (from, to) => {},
  onDragEnd: () => {},
  onDragStart: () => {},
  onImagesRequested: (text) => {},
};
