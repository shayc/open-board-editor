import { boardMap } from '../../open-board-format/board/board.map';
import board from '../../open-board-format/examples/project-core.json';
import BoardViewer from './BoardViewer';

const story = {
  title: 'Web App/Features/BoardViewer',
  component: BoardViewer,
};
export default story;

const Template = (args) => <BoardViewer {...args} />;

export const Default = Template.bind({});

Default.args = {
  board: boardMap.toDTO(board),
  onHomeClick: null,
  onBackClick: null,
  onForwardClick: null,
  style: { height: '768px' },
};
