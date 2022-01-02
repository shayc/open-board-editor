import { boardMap } from '../../open-board-format/board/board.map';
import projectCore from '../../open-board-format/examples/project-core.json';
import BoardViewer from './BoardViewer';

const board = boardMap.toDTO(projectCore);

const story = {
  title: 'Web App/Features/BoardViewer',
  component: BoardViewer,
};
export default story;

const Template = (args) => <BoardViewer {...args} />;

export const Default = Template.bind({});

Default.args = {
  board,
  onHomeClick: null,
  onBackClick: null,
  onForwardClick: null,
  style: { height: '768px' },
};
