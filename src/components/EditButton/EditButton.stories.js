import EditButton from './EditButton';

const story = {
  title: 'Example/EditButton',
  component: EditButton,
};

export default story;

const Template = (args) => <EditButton {...args} />;

export const Default = Template.bind({});
