import ColorPicker from './ColorPicker';

const story = {
  title: 'Example/ColorPicker',
  component: ColorPicker,
};

export default story;

const Template = (args) => <ColorPicker {...args} />;

export const Default = Template.bind({});

Default.args = {
  colors: [
    { id: '1', backgroundColor: 'red', borderColor: 'green' },
    { id: '2', backgroundColor: 'blue' },
    { id: '3', borderColor: 'gray' },
  ],
  onChange: (color) => {
    console.log('color :>> ', color);
  },
};
