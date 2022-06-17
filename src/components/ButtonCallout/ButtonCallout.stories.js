import ButtonCallout from './ButtonCallout';

const story = {
  title: 'App/Components/ButtonCallout',
  component: ButtonCallout,
};

export default story;

const Template = (args) => <ButtonCallout {...args} />;

export const Default = Template.bind({});

Default.args = {
  button: {
    id: 'btn-1',
    label: 'Chat',
  },
  colors: [
    { id: '1', color: '#ff0000' },
    { id: '2', color: 'rgba(0, 0, 255, .7)' },
  ],
  images: [
    {
      id: '1',
      url: 'https://s3.amazonaws.com/opensymbols/libraries/arasaac/talk.png',
      text: 'Talk',
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
