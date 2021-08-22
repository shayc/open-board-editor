import Output from './Output';

const story = {
  title: 'Core/Output',
  component: Output,
};
export default story;

const Template = (args) => <Output {...args} />;

export const Default = Template.bind({});

Default.args = {
  values: ['Hello', 'world'],
  renderValue: (value) => value,
};
