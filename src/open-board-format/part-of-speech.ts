import nlp from 'compromise';

export const POSTags = {
  Adjective: 'Adjective',
  Adverb: 'Adverb',
  Conjunction: 'Conjunction',
  Determiner: 'Determiner',
  Negative: 'Negative',
  Noun: 'Noun',
  Place: 'Place',
  Preposition: 'Preposition',
  Pronoun: 'Pronoun',
  QuestionWord: 'QuestionWord',
  Verb: 'Verb',
};

export function getPartOfSpeech(text: string) {
  const doc = nlp(text);

  const partOfSpeech =
    [
      doc.has(`#${POSTags.Adjective}`) && POSTags.Adjective,
      doc.has(`#${POSTags.Adverb}`) && POSTags.Adverb,
      doc.has(`#${POSTags.Conjunction}`) && POSTags.Conjunction,
      doc.has(`#${POSTags.Determiner}`) && POSTags.Determiner,
      doc.has(`#${POSTags.Negative}`) && POSTags.Negative,
      doc.has(`#${POSTags.Noun}`) && POSTags.Noun,
      doc.has(`#${POSTags.Place}`) && POSTags.Place,
      doc.has(`#${POSTags.Preposition}`) && POSTags.Preposition,
      doc.has(`#${POSTags.Pronoun}`) && POSTags.Pronoun,
      doc.has(`#${POSTags.QuestionWord}`) && POSTags.QuestionWord,
      doc.has(`#${POSTags.Verb}`) && POSTags.Verb,
    ].filter(Boolean)[0] || '';

  return partOfSpeech;
}
