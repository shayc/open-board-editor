import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

function useFuse(items, options) {
  const [searchText, setSearchText] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(items, options);
  }, [items, options]);

  const matchedItems = useMemo(() => {
    function matchItems(text) {
      const results = fuse.search(text);
      const matches = results.map((res) => res.matches).flat();
      const items = results.map((res) => res.item);

      const searchWords = matches
        .map((match) => {
          return match.indices.map(([start, end]) => {
            return match.value.slice(start, end + 1);
          });
        })
        .flat();

      return { items, searchWords };
    }

    return matchItems(searchText);
  }, [fuse, searchText]);

  function onSearchChange(event, text) {
    setSearchText(text || '');
  }

  return { matchedItems, onSearchChange, searchText };
}

export default useFuse;
