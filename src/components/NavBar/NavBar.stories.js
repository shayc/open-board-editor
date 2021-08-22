import NavBar from './NavBar';

const story = {
  title: 'Example/NavBar',
  component: NavBar,
};

export default story;

const Template = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
