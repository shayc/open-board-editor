import EditToggleButton from './EditToggleButton';

const story = {
  title: 'Web App/Components/EditToggleButton',
  component: EditToggleButton,
};

export default story;

const Template = (args) => <EditToggleButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  checked: false,
};
