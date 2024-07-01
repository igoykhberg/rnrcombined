import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import * as types from '../utils/types';
const options = {
  keys: ['name.first', 'name.last'],
  includeMatches: true,
};
export const useFuseSearch = (
  items: types.TRandomPerson[],
  searchTerm: string
) => {
  const [filteredItems, setFilteredItems] = useState<any>([]);
  const fuse = new Fuse(items, options);

  useEffect(() => {
    const resultNew = fuse.search(searchTerm);
    setFilteredItems(resultNew);
  }, [items, searchTerm]);

  return filteredItems;
};
