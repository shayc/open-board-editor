import NavText from './NavText';

const story = {
  title: 'Example/NavText',
  component: NavText,
};

export default story;

const Template = (args) => <NavText {...args} />;

export const Default = Template.bind({});
