import ButtonCallout from './ButtonCallout';

const story = {
  title: 'Example/ButtonCallout',
  component: ButtonCallout,
};

export default story;

const Template = (args) => <ButtonCallout {...args} />;

export const Default = Template.bind({});

Default.args = {
  button: {
    id: 'btn-1',
    label: 'Chat',
    image: 'https://s3.amazonaws.com/opensymbols/libraries/arasaac/talk.png',
  },
  colors: [
    { id: '1', backgroundColor: '#ff0000', borderColor: 'green' },
    { id: '2', backgroundColor: 'rgba(0, 0, 255, .7)' },
  ],
  images: [
    {
      id: '1',
      src: '',
      alt: '',
    },
  ],
  onChange: (button) => {
    console.log('button :>> ', button);
  },
  onSave: (button) => {
    alert('save clicked!');
  },
  onDiscard: (button) => {
    alert('discard clicked!');
  },
};
