import ButtonCallout from './ButtonCallout';

const story = {
  title: 'Web App/Components/ButtonCallout',
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
    { id: '1', backgroundColor: '#ff0000', borderColor: 'green' },
    { id: '2', backgroundColor: 'rgba(0, 0, 255, .7)' },
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
