import BoardCommandBar from './BoardCommandBar';

const story = {
  title: 'Web App/Components/BoardCommandBar',
  component: BoardCommandBar,
};

export default story;

const Template = (args) => <BoardCommandBar {...args} />;

export const Default = Template.bind({});
