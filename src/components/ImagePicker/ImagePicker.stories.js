import ImagePicker from './ImagePicker';

const story = {
  title: 'Web App/Components/ImagePicker',
  component: ImagePicker,
};

export default story;

const Template = (args) => <ImagePicker {...args} />;

export const Default = Template.bind({});

Default.args = {
  images: [],
};
