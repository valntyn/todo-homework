import classNames from 'classnames';
import { memo } from 'react';

import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as FilterActions } from '../../store/actions/filterAction';
import { Filter } from '../../types/Filter';

import './FilterBlock.scss';

export const FilterBlock = memo(() => {
  const dispatch = useAppDispatch();

  const { filter } = useAppSelector((state) => state.filter);
  const { isDark } = useTheme();

  const handleClick = (type: Filter) => () => {
    dispatch(FilterActions.setFilter(type));
  };

  return (
    <nav className="filter-block">
      {Object.values(Filter).map((filterBy) => (
        <button
          key={filterBy}
          type="button"
          className={classNames('filter-block__button', {
            selected: filterBy === filter,
            'filter-block__button--dark': isDark,
          })}
          onClick={handleClick(filterBy)}
        >
          {filterBy}
        </button>
      ))}
    </nav>
  );
});
