// import boardSet from '../../open-board-format/data/core-24.json';
import BoardEditor from './BoardEditor';
import { Selection } from '@fluentui/react';

const board = {
  id: 'board',
  name: 'shay',
  buttons: [
    { id: '1', label: 'hi', backgroundColor: 'green' },
    { id: '2', label: 'bye', backgroundColor: 'red' },
  ],
  grid: {
    columns: 4,
    rows: 3,
    order: [[], [], []],
  },
};

const story = {
  title: 'Web App/Features/BoardEditor',
  component: BoardEditor,
};
export default story;

const Template = (args) => <BoardEditor {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { height: '600px' },
  board,
  linkableBoards: [],
  buttonColors: [{ backgroundColor: 'green' }, { backgroundColor: 'red' }],
  buttonImages: [],
  selection: new Selection(),
  selectionEnabled: false,
  onButtonChange: (button, position) => {},
  onButtonChangeDiscard: () => {},
  onButtonChangeSave: (button, position) => {},
  onButtonClick: (button) => {},
  onButtonPositionChange: (from, to) => {},
  onDragEnd: () => {},
  onDragStart: () => {},
  onImagesRequested: (text) => {},
};
