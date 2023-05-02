import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as FilterActions } from '../../store/actions/filterAction';
import { actions as todoActions } from '../../store/actions/todosActions';
import {
  selectActiveCount, selectCompletedCount,
} from '../../store/selectors/selectTodosCount';
import { Filter } from '../../types/Filter';
import { FilterBlock } from '../FilterBlock';

import './TodoFilter.scss';

type PropTypes = {
  setNotification: (notification: string) => void
};

export const TodoFilter: React.FC<PropTypes> = ({ setNotification }) => {
  const { todos } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const completedCount = useSelector(selectCompletedCount);
  const activeCount = useSelector(selectActiveCount);

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
      <span className="filter__todo-count">
        {`In progress: ${activeCount} todos`}
      </span>

      <FilterBlock />

      <button
        onClick={handleDeleteCompleted}
        type="button"
        className="filter__completed"
        disabled={!completedCount}
      >
        Clear completed
      </button>
    </div>
  );
};
