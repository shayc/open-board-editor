import SpinnerProgress from './SpinnerProgress';

const story = {
  title: 'Example/SpinnerProgress',
  component: SpinnerProgress,
};
export default story;

const Template = (args) => <SpinnerProgress {...args} />;

export const Default = Template.bind({});

Default.args = {};
