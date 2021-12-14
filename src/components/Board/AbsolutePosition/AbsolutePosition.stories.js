import Pictogram from '../../Pictogram';
import Tile from '../../Tile';
import AbsolutePosition from './AbsolutePosition';

const story = {
  title: 'Board/Components/AbsolutePosition',
  component: AbsolutePosition,
};

export default story;

const Template = (args) => <AbsolutePosition {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { height: '300px' },
  items: [
    {
      id: '1',
      label: 'speak',
      image: 'https://s3.amazonaws.com/opensymbols/libraries/arasaac/talk.png',
      border_color: 'rgb(102, 221, 0)',
      background_color: 'rgb(204, 255, 170)',
      left: 0.102,
      top: 0.4345,
      width: 0.48,
      height: 0.41,
    },
    {
      id: '2',
      label: 'with everyone',
      border_color: 'rgb(221, 221, 0)',
      background_color: 'rgb(255, 255, 170)',
      image:
        'https://s3.amazonaws.com/opensymbols/libraries/arasaac/group of people.png',
      left: 0.452,
      top: 0.2345,
      width: 0.18,
      height: 0.31,
    },
    {
      id: '3',
      label: 'with everyone',
      image:
        'https://s3.amazonaws.com/opensymbols/libraries/arasaac/group of people.png',
      left: 0.652,
      top: 0.1345,
      width: 0.2,
      height: 0.71,
    },
  ],
  renderItem(button) {
    const { load_board, background_color, border_color, label, image } = button;

    const variant = load_board ? 'folder' : 'button';

    return (
      <Tile
        backgroundColor={background_color}
        borderColor={border_color}
        variant={variant}
      >
        <Pictogram label={label} src={image} />
      </Tile>
    );
  },
};
