import Pictogram from '../Pictogram';
import Tile from './Tile';

const story = {
  title: 'Board/Components/Tile',
  component: Tile,
  argTypes: {
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
  },
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

const Template = (args) => (
  <Tile {...args}>
    <Pictogram
      label="drink"
      src="https://s3.amazonaws.com/opensymbols/libraries/arasaac/to drink.png"
    />
  </Tile>
);

export const Default = Template.bind({});
export const WithColor = Template.bind({});

Default.args = {};

WithColor.args = {
  ...Default.args,
  backgroundColor: `rgb(204, 255, 170)`,
  borderColor: `rgb(102, 221, 0)`,
};
