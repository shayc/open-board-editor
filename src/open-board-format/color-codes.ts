const palette = {
  blue: '#0078d4',
  brown: '#986f0b',
  white: '#fff',
  grey: '#a0aeb2',
  red: '#d13438',
  orange: '#ffaa44',
  purple: '#c239b3',
  pink: '#e3008c',
  yellow: '#fce100',
  green: '#8cbd18',
};

type Palette = {
  blue: string;
  brown: string;
  white: string;
  grey: string;
  red: string;
  orange: string;
  purple: string;
  pink: string;
  yellow: string;
  green: string;
};

const modifiedFitzgeraldKey: ModifiedFitzgeraldKey = {
  adjectives: 'blue',
  adverbs: 'brown',
  conjunctions: 'white',
  determiners: 'grey',
  emergency: 'red',
  negation: 'red',
  nouns: 'orange',
  places: 'purple',
  prepositions: 'pink',
  pronouns: 'yellow',
  questions: 'purple',
  social: 'pink',
  verbs: 'green',
};

type ModifiedFitzgeraldKey = {
  adjectives: 'blue';
  adverbs: 'brown';
  conjunctions: 'white';
  determiners: 'grey';
  emergency: 'red';
  negation: 'red';
  nouns: 'orange';
  places: 'purple';
  prepositions: 'pink';
  pronouns: 'yellow';
  questions: 'purple';
  social: 'pink';
  verbs: 'green';
};

export const goossensCrainAndElder = {
  /**
   * words which tells action: open, come
   */
  verbs: 'pink',
  /**
   * adjectives and adverbs: pretty, slow
   */
  descriptors: 'blue',
  /**
   * position words: in, off
   */
  prepositions: 'green',
  /**
   * person, place or thing: car, string, Mary
   */
  nouns: 'yellow',
  /**
   * who, what, how
   */
  questions: 'orange',
  /**
   * no, don't
   */
  negation: 'orange',
  /**
   * personal, possessive: I, you
   */
  pronouns: 'orange',
  interjections: 'orange',
};

function mapColors(colorCode: ModifiedFitzgeraldKey, palette: Palette) {
  const colors = Array.from(
    new Set(Object.values(colorCode).map((color) => palette[color]))
  );

  return colors;
}

export const defaultColors = mapColors(modifiedFitzgeraldKey, palette).map(
  (color) => ({
    color,
    id: color,
  })
);
