import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

function useFuzzySearch(items, options) {
  const [value, setValue] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(items, options);
  }, [items, options]);

  const { matchedItems, matchedWords } = useMemo(() => {
    function matchItems(text) {
      const results = fuse.search(text);
      const matches = results.map((res) => res.matches).flat();
      const matchedItems = results.map((res) => res.item);

      const matchedWords = matches
        .map((match) => {
          return match.indices.map(([start, end]) => {
            return match.value.slice(start, end + 1);
          });
        })
        .flat();

      return { matchedItems, matchedWords };
    }

    return matchItems(value);
  }, [fuse, value]);

  function onChange(text) {
    setValue(text || '');
  }

  return { matchedItems, matchedWords, onChange, value };
}

export default useFuzzySearch;
