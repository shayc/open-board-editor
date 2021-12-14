import NavBar from './NavBar';

const story = {
  title: 'Web App/Components/NavBar',
  component: NavBar,
};

export default story;

const Template = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
