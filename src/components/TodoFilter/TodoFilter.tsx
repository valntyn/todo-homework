import { useMemo } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as todoActions } from '../../store/actions/todosActions';
import { FilterBlock } from '../FilterBlock';

import './TodoFilter.scss';

type PropTypes = {
  setNotification: (notification: string) => void
};

export const TodoFilter: React.FC<PropTypes> = ({ setNotification }) => {
  const { todos } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const activeCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  const completedCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  const handleDeleteCompleted = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        dispatch(todoActions.deleteTodo(todo.id));
      }
    });

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
