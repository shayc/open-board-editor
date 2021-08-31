import SettingsButton from './SettingsButton';

const story = {
  title: 'Example/SettingsButton',
  component: SettingsButton,
};

export default story;

const Template = (args) => <SettingsButton {...args} />;

export const Default = Template.bind({});
