import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as FilterActions } from '../../store/actions/filterAction';
import { actions as todoActions } from '../../store/actions/todosActions';
import { selectCompletedCount } from '../../store/selectors/selectTodosCount';
import { Filter } from '../../types/Filter';
import { FilterBlock } from '../FilterBlock';
import './TodoFilter.scss';
import { SearchBar } from '../SearchBar';

type PropTypes = {
  setNotification: (notification: string) => void;
};

export const TodoFilter: React.FC<PropTypes> = ({ setNotification }) => {
  const { todos } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const completedTodosCount = useSelector(selectCompletedCount);

  const handleDeleteCompleted = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        dispatch(todoActions.deleteTodo(todo.id));
      }
    });

    dispatch(FilterActions.setFilter(Filter.ALL));
    setNotification('Completed todo/s was/were deleted');
  };

  return (
    <div className="filter">
      <SearchBar />
      <div className="filter__block">
        <FilterBlock />
        <button
          onClick={handleDeleteCompleted}
          type="button"
          className="filter__completed"
          disabled={!completedTodosCount}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};
