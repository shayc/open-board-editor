import { POSTags, getPartOfSpeech } from './part-of-speech';

const palette: Palette = {
  blue: '#0078d4',
  brown: '#986f0b',
  white: '#ffffff',
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
  [key: string]: string;
};

export const modifiedFitzgeraldKey: any = {
  [POSTags.Adjective]: 'blue',
  [POSTags.Adverb]: 'brown',
  [POSTags.Conjunction]: 'white',
  [POSTags.Determiner]: 'grey',
  [POSTags.Negative]: 'red',
  [POSTags.Noun]: 'orange',
  [POSTags.Place]: 'purple',
  [POSTags.Preposition]: 'pink',
  [POSTags.Pronoun]: 'yellow',
  [POSTags.QuestionWord]: 'purple',
  [POSTags.Verb]: 'green',
};

export const goossensCrainAndElder = {
  [POSTags.Verb]: 'pink',
  [POSTags.Adjective]: 'blue',
  [POSTags.Adverb]: 'blue',
  [POSTags.Preposition]: 'green',
  [POSTags.Noun]: 'yellow',
  [POSTags.QuestionWord]: 'orange',
  [POSTags.Negative]: 'orange',
  [POSTags.Pronoun]: 'orange',
};

function mapColors(colorCode: any, palette: Palette) {
  const colors = Array.from(
    new Set(Object.values(colorCode).map((color: any) => palette[color]))
  );

  return colors;
}

export const defaultColors = mapColors(goossensCrainAndElder, palette).map(
  (color) => ({
    color,
    id: color,
  })
);

export function getSemanticColor(value: string) {
  const pos = getPartOfSpeech(value);
  const color = goossensCrainAndElder[pos];

  return palette[color];
}
