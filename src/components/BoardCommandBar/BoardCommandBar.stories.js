import BoardCommandBar from './BoardCommandBar';

const story = {
  title: 'Example/BoardCommandBar',
  component: BoardCommandBar,
};

export default story;

const Template = (args) => <BoardCommandBar {...args} />;

export const Default = Template.bind({});
