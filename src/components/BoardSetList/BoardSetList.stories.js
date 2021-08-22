import BoardSetList from './BoardSetList';

const story = {
  title: 'Example/BoardSetList',
  component: BoardSetList,
};

export default story;

const Template = (args) => <BoardSetList {...args} />;

export const Default = Template.bind({});

Default.args = {
  items: [
    { name: 'Blank', image: '', onClick: () => {} },
    { name: 'Four Grid Starting Communication', image: '' },
    {
      name: 'Core 24',
      image: '',
      author: 'Example',
      authorUrl: 'http://example.com',
    },
  ],
};
