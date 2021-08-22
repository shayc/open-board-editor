import AppBar from './AppBar';

const story = {
  title: 'Example/AppBar',
  component: AppBar,
};

export default story;

const Template = (args) => <AppBar {...args} />;

export const Default = Template.bind({});
Default.args = {};
