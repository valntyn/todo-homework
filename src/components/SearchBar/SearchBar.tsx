import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ReactComponent as Cross } from '../../assets/cross.svg';
import { ReactComponent as Search } from '../../assets/search.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import './SearchBar.scss';
import { actions as searchActions } from '../../store/actions/searchAction';

import classNames from 'classnames';

export const SearchBar = () => {
  const { search } = useAppSelector((state) => state.search);
  const [visualQuery, setVisualQuery] = useState(search);
  const dispatch = useAppDispatch();

  const debouncedOnChange = useDebouncedCallback((e) => {
    dispatch(searchActions.setSearch(e.target.value.trim()));
  }, 500);

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setVisualQuery(e.target.value);
    debouncedOnChange(e);
  };

  const handleClear = () => {
    setVisualQuery('');
    dispatch(searchActions.setSearch(''));
  };

  return (
    <label className="searchBar" htmlFor="search">
      <Search className="searchBar__img" />
      <input
        id="search"
        type="text"
        value={visualQuery}
        onChange={handleQuery}
        placeholder="Search here..."
        className="searchBar__input"
        autoComplete="off"
      />
      <button
        type="button"
        disabled={!visualQuery}
        className="searchBar__button"
        onClick={handleClear}
      >
        <Cross className="searchBar__img" />
      </button>
    </label>
  );
};
