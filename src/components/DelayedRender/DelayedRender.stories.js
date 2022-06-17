import DelayedRender from './DelayedRender';

const story = {
  title: 'App/Components/DelayedRender',
  component: DelayedRender,
};

export default story;

const Template = (args) => (
  <DelayedRender {...args}>Delayed render example {args.delay}ms</DelayedRender>
);

export const Default = Template.bind({});

Default.args = {
  delay: 1000,
};
