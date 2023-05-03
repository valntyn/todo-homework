import classNames from 'classnames';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as FilterActions } from '../../store/actions/filterAction';
import { Filter } from '../../types/Filter';

import './FilterBlock.scss';

export const FilterBlock = () => {
  const dispatch = useAppDispatch();

  const { filter } = useAppSelector(state => state.filter);

  const handleClick = (type: Filter) => () => {
    dispatch(FilterActions.setFilter(type));
  };

  return (
    <nav className="filter-block">
      <button
        type="button"
        className={classNames('filter-block__button', {
          selected: Filter.ALL === filter,
        })}
        onClick={handleClick(Filter.ALL)}
      >
        All
      </button>

      <button
        type="button"
        className={classNames('filter-block__button', {
          selected: Filter.ACTIVE === filter,
        })}
        onClick={handleClick(Filter.ACTIVE)}
      >
        Active
      </button>

      <button
        type="button"
        className={classNames('filter-block__button', {
          selected: Filter.COMPLETED === filter,
        })}
        onClick={handleClick(Filter.COMPLETED)}
      >
        Completed
      </button>
    </nav>
  );
};
