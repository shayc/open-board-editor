import BoardEditor from './BoardEditor';
import { Selection } from '@fluentui/react';

import { boardMap } from '../../open-board-format/board/board.map';
import projectCore from '../../open-board-format/examples/project-core.json';

const board = boardMap.toDTO(projectCore);

const story = {
  title: 'App/Features/BoardEditor',
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
