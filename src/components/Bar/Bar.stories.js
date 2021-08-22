import Bar from './Bar';

const story = {
  title: 'Example/Bar',
  component: Bar,
};

export default story;

const Template = (args) => <Bar {...args} />;

export const Default = Template.bind({});

Default.args = {
  startGroup: <button>Click</button>,
  middleGroup: <div>Home board</div>,
  endGroup: <button>Click</button>,
};
