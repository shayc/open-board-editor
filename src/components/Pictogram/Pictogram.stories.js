import Pictogram from './Pictogram';

const story = {
  title: 'Core/Pictogram',
  component: Pictogram,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '150px',
          height: '150px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default story;

const Template = (args) => <Pictogram {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'play',
  src: 'https://s3.amazonaws.com/opensymbols/libraries/arasaac/to play volleyball.png',
};
