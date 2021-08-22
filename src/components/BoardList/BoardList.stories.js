import BoardList from './BoardList';

const story = {
  title: 'Example/BoardList',
  component: BoardList,
};
export default story;

const Template = (args) => <BoardList {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { width: '340px' },
  items: [
    { id: 'a', name: 'Board 1' },
    { id: 'b', name: 'Board 2' },
    { id: 'c', name: 'Board 3' },
  ],
  rootId: 'a',
  onActiveIdChange: () => {},
  onRootIdChange: () => {},
  onDeleteClick: () => {},
};
