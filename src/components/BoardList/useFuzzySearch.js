import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

function useFuzzySearch(items, options) {
  const [searchText, setSearchText] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(items, options);
  }, [items, options]);

  const { matchedItems, searchWords } = useMemo(() => {
    function matchItems(text) {
      const results = fuse.search(text);
      const matches = results.map((res) => res.matches).flat();
      const matchedItems = results.map((res) => res.item);

      const searchWords = matches
        .map((match) => {
          return match.indices.map(([start, end]) => {
            return match.value.slice(start, end + 1);
          });
        })
        .flat();

      return { matchedItems, searchWords };
    }

    return matchItems(searchText);
  }, [fuse, searchText]);

  function onSearchChange(text) {
    setSearchText(text || '');
  }

  return { matchedItems, searchWords, onSearchChange, searchText };
}

export default useFuzzySearch;
