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

const Template = (args) => <Tile {...args} />;

export const Default = Template.bind({});
export const Color = Template.bind({});
export const WithPictogram = Template.bind({});
export const FolderVariant = Template.bind({});
export const Disabled = Template.bind({});
export const AsDiv = Template.bind({});

Default.args = {};

Color.args = {
  ...Default.args,
  backgroundColor: `rgb(204, 255, 170)`,
  borderColor: `rgb(102, 221, 0)`,
};

WithPictogram.args = {
  ...Default.args,
  ...Color.args,
  children: (
    <Pictogram
      label="Drink"
      src="https://s3.amazonaws.com/opensymbols/libraries/arasaac/to drink.png"
    />
  ),
};

Disabled.args = {
  ...Default.args,
  ...WithPictogram.args,
  disabled: true,
};

AsDiv.args = {
  ...Default.args,
  ...WithPictogram.args,
  component: 'div',
};

FolderVariant.args = {
  ...Default.args,
  ...WithPictogram.args,
  variant: 'folder',
};
