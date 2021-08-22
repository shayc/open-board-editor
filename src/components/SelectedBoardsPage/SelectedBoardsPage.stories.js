import SelectedBoardsPage from './SelectedBoardsPage';

const story = {
  title: 'Example/SelectedBoardsPage',
  component: SelectedBoardsPage,
};

export default story;

const Template = (args) => <SelectedBoardsPage {...args} />;

export const Default = Template.bind({});
