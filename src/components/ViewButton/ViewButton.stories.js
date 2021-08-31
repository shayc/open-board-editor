import ViewButton from './ViewButton';

const story = {
  title: 'Example/ViewButton',
  component: ViewButton,
};

export default story;

const Template = (args) => <ViewButton {...args} />;

export const Default = Template.bind({});
