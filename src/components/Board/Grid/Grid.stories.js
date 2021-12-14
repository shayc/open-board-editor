import Tile from '../../Tile';
import Grid from './Grid';

const story = {
  title: 'Board/Components/Grid',
  component: Grid,
};

export default story;

const Template = (args) => <Grid {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: {
    height: `300px`,
  },
  columns: 3,
  rows: 2,
  gap: '6px',
  items: [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
    { id: '4', label: 'Item 4' },
    { id: '5', label: 'Item 5' },
    { id: '6', label: 'Item 6' },
    { id: '7', label: 'Item 7' },
    { id: '8', label: 'Item 8' },
    { id: '9', label: 'Item 9' },
    { id: '10', label: 'Item 10' },
    { id: '11', label: 'Item 11' },
  ],
  order: [
    [null, null, null],
    [null, null, null],
  ],
  scrollDirection: 'vertical',
  scrollSnap: true,
  renderItem: (item) => <Tile backgroundColor="#eee">{item.label}</Tile>,
  renderPlaceholder: () => <Tile backgroundColor="#eee">{'Loading...'}</Tile>,
  draggable: true,
};
