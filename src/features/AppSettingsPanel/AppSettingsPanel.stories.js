import AppSettingsPanel from './AppSettingsPanel';

const story = {
  title: 'Web App/Features/AppSettingsPanel',
  component: AppSettingsPanel,
};

export default story;

const Template = (args) => <AppSettingsPanel {...args} />;

export const Default = Template.bind({});

Default.args = {
  open: true,
};
