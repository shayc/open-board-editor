import ImagePicker from './ImagePicker';

const story = {
  title: 'Example/ImagePicker',
  component: ImagePicker,
};

export default story;

const Template = (args) => <ImagePicker {...args} />;

export const Default = Template.bind({});

Default.args = {
  images: [],
};
